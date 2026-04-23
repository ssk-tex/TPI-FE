import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
// import { ddoAllocationSend, fetchDdoAllocationDetails } from "../../services/nrlmService";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { ddoAllocationSend2Ommas, fetchDdoAllocationDetails, fetchOmmasDdoAllocationDetails, fetchVBGRAMGDdoAllocationDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";
import { getFY } from "../../helper/finYear";
import { useNavigate } from "react-router-dom";

export function DdoAllocationSend2Scheme() {
    const { slsCode, cssCode } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);
    const [ms, setMs] = useState("");
    const [finYear, setFinYear] = useState('');
    const navigate = useNavigate();

    const columns = [
        { key: 'ddoName', header: 'DDO Name' },
        { key: 'ddoCode', header: 'DDO Code' },
        { key: 'treasName', header: 'Treasury Name' },
        { key: 'treasCode', header: 'Treasury Code' },
        { key: 'limitForAgency', header: 'Limit for Agency' },
        { key: 'status', header: 'Sent Status' },
        { key: 'SentTimestamp', header: 'Sent Timestamp' },
    ];
    const columns4Ommas = [
        { key: 'agencyId', header: 'Agency' },
        { key: 'ddo', header: 'DDO' },
        { key: 'treasury', header: 'Treasury' },
        { key: 'district', header: 'District Code' },
        { key: 'limitForAgency', header: 'Limit for Agency' },
        { key: 'ddoAllotmentAmount', header: 'Ddo Allotment' },
        { key: 'SentTimestamp', header: 'Sent Timestamp' },
        { key: 'status', header: 'Sent Status' },
    ];

    const columns4VBGRAMG = [
        { key: 'ddo', header: 'DDO' },
        { key: 'treasury', header: 'Treasury' },
        { key: 'snaUniqueAgencyCode', header: 'SNA Unique Agency Code' },
        { key: 'agency', header: 'Agency' },
        { key: 'ms', header: 'Mother Sanction' },
        { key: 'ss', header: 'State Sanction' },
        { key: 'ddoAllotment', header: 'Ddo Allotment' }
    ];

    const handleSend = async (item) => {
        try {
            setLoading(true); // loader start

            const payload = {
                slsCode: slsCode,
                stateLgdCode: "19",
                distLgdCode: String(item.distLgdCode)
            }

            const res = await ddoAllocationSend2Ommas(payload); // তোমার API call

            console.log('ommas ddo allocation response', res);

            Swal.fire({
                title: '✅ Success!',
                text: `Response: Ddo Allocation Details Send Successfully for the district ${item.distLgdCode}`,
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(0);
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: '❌ Failed!',
                text: 'Something went wrong while calling API.',
                icon: 'error',
            });
        } finally {
            setLoading(false); // loader stop
        }
    };

    const getOmmasSentStatus = (item) => {
        if (item.ommasSentStatus === '0') return (<button
            onClick={() => handleSend(item)}
            // disabled={loading}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
            Send
        </button>);
        if (item.ommasSentStatus === '1') return "Failed";
        return item.ommasSentStatusDescription;
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const FY = getFY();
                let data;
                let tableDataSend = []
                let tableDataYet2Send = []
                switch (cssCode) {
                    case 9181:
                        data = await fetchDdoAllocationDetails({ slsCode: slsCode, finYear: FY });
                        setFinYear(data.finYear);
                        data.data.forEach((item, i) => {
                            const row = {
                                ddoName: item.ddoName,
                                ddoCode: item.ddoCode,
                                treasName: item.treasName,
                                treasCode: item.treasCode,
                                limitForAgency: item.limitForAgency,
                                SentTimestamp: (item.nrlmSentTimestamp !== null) ? DateTimeFormatter(item.nrlmSentTimestamp) : "-",
                                status: (item.nrlmSentStatus === '1') ? "Failed" : item.nrlmSentStatusDescription,
                            };
                            if (item.nrlmSentStatus === "2") {
                                tableDataSend.push(row);
                            } else {
                                tableDataYet2Send.push(row);
                                setSendBtn(true);
                                setMs(item.motherSanctionNo)
                            }
                        });
                        break;
                    case 9179:
                        data = await fetchOmmasDdoAllocationDetails({ slsCode: slsCode, finYear: FY });
                        setFinYear(data.finYear);
                        data.data.forEach((item, i) => {
                            const row = {
                                agencyId: item.agencyId,
                                ddo: `${item.ddoName}(${item.ddoCode})`,
                                treasury: `${item.treasName}(${item.treasCode})`,
                                district: item.distLgdCode,
                                limitForAgency: item.limitAgency,
                                ddoAllotmentAmount: item.ddoAllotmentAmount,
                                SentTimestamp: (item.ommasSentTimestamp !== null) ? DateTimeFormatter(item.ommasSentTimestamp) : "-",
                                status: getOmmasSentStatus(item)
                            };
                            if (item.ommasSentStatus === "2") {
                                tableDataSend.push(row);
                            } else {
                                tableDataYet2Send.push(row);
                                setSendBtn(true);
                                setMs(item.motherSanctionNo)
                            }
                        });
                        break;
                    case 4497:
                        data = await fetchVBGRAMGDdoAllocationDetails({ slsCode: slsCode });
                        data.data.forEach((item, i) => {
                            const row = {
                                ddo: `${item.ddo_name}(${item.ddo_code})`,
                                treasury: `${item.treasName}(${item.treasCode})`,
                                snaUniqueAgencyCode: item.sna_unique_agency_code,
                                agency: item.agency_code,
                                ms: item.mother_sanction_no,
                                ss: item.state_sanction_no,
                                ddoAllotment: `₹ ${item.total_ddo_allotment_amount}`
                            };
                            tableDataSend.push(row);
                        });
                        break;
                    default:
                        break;
                }
                setSendList(tableDataSend);
                setYet2SendList(tableDataYet2Send);
            } catch (error) {
                console.log('error message', error.message);

                // setError("Failed to fetch data" || error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])

    const sendData = async () => {
        const slsData = sendData2SchemeApi.find(item => item.slsCode === slsCode);
        if (!slsData) {
            Swal.fire({
                title: '⚠ Not Found',
                text: `Invalid SLS Code: ${slsCode}`,
                icon: 'warning',
            });
            return;
        }
        const payLoad = { "motherSanctionNo": ms, "slsCode": slsData.slsCode, "finYear": finYear }
        try {
            const resp = await slsData.daFn(payLoad);
            Swal.fire({
                title: '✅ Success!',
                text: `Response: Ddo Allocation Details Send Successfully`,
                icon: 'success',
            });
        } catch (error) {
            Swal.fire({
                title: '❌ Failed!',
                text: 'Something went wrong while calling API.',
                icon: 'error',
            });
        }
    }

    const contentsData = [
        { id: 1, title: "Sent", content: <Table tableName='Sent' columns={columns} data={sendList} rowsPerPage={3} /> },
        {
            id: 2, title: "Yet to Send", content: <>
                <Table tableName='Yet to Send' columns={columns} data={yet2SendList} rowsPerPage={2} />
                {sendBtn && (
                    <div className='flex justify-center'>
                        <Btn
                            label={loading ? "Sending..." : "Sent DdoAllocation Data"}
                            variant="success"
                            size="xxl"
                            disabled={loading}
                            onClick={sendData}
                        />
                    </div>
                )}
            </>
        }
    ];
    const contentsData4Ommas = [
        { id: 1, title: "Sent", content: <Table tableName='Sent' columns={columns4Ommas} data={sendList} rowsPerPage={3} /> },
        {
            id: 2, title: "Yet to Send", content: <>
                <Table tableName='Yet to Send' columns={columns4Ommas} data={yet2SendList} rowsPerPage={2} />
                {/* {sendBtn && (
                    <div className='flex justify-center'>
                        <Btn
                            label={loading ? "Sending..." : "Sent DdoAllocation Data"}
                            variant="success"
                            size="xxl"
                            disabled={loading}
                            onClick={sendData}
                        />
                    </div>
                )} */}
            </>
        }
    ];
    const contentsData4VBGRAMG = [
        { id: 1, title: "Sent", content: <Table tableName='Sent' columns={columns4VBGRAMG} data={sendList} rowsPerPage={3} /> },
    ];

    return (<>
        <SchemePageLayout>
            <div className='min-h/2-screen bg-gradient-to-br from-indigo-100 to-white w-full'>
                {
                    cssCode === 9181 ?
                        (<Tabs tab contentsData={contentsData} bodyWidth="185%" />)
                        : cssCode === 9179 ?
                            (<Tabs tab contentsData={contentsData4Ommas} bodyWidth="185%" />)
                            : cssCode === 4497 ?
                                (<Tabs tab contentsData={contentsData4VBGRAMG} bodyWidth="185%" />)
                                : null
                }
                {/* <Tabs tab contentsData={(cssCode === 9179) ? contentsData4Ommas : contentsData} bodyWidth="185%" /> */}
            </div>
        </SchemePageLayout>

    </>)
}