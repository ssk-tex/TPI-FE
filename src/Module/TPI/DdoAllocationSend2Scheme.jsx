import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
// import { ddoAllocationSend, fetchDdoAllocationDetails } from "../../services/nrlmService";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchDdoAllocationDetails, fetchOmmasBudgetAllocationDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";
import { getFY } from "../../helper/finYear";

export function DdoAllocationSend2Scheme() {
    const { slsCode, cssCode } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);
    const [ms, setMs] = useState("");
    const [finYear, setFinYear] = useState('');

    const columns = [
        { key: 'ddoName', header: 'DDO Name' },
        { key: 'ddoCode', header: 'DDO Code' },
        { key: 'treasName', header: 'Treasury Name' },
        { key: 'treasCode', header: 'Treasury Code' },
        { key: 'limitForAgency', header: 'Limit for Agency' },
        { key: 'status', header: 'Sent Status' },
        { key: 'SentTimestamp', header: 'Sent Timestamp' },
    ];

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
                        data = await fetchOmmasBudgetAllocationDetails({ slsCode: slsCode, finYear: FY });
                        setFinYear(data.finYear);
                        data.data.forEach((item, i) => {
                            const row = {
                                ddoName: item.ddoName,
                                ddoCode: item.ddoCode,
                                treasName: item.treasName,
                                treasCode: item.treasCode,
                                limitForAgency: item.limitForAgency,
                                SentTimestamp: (item.ommasSentTimestamp !== null) ? DateTimeFormatter(item.ommasSentTimestamp) : "-",
                                status: (item.ommasSentStatus === '1') ? "Failed" : item.ommasSentStatusDescription,
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

    return (<>
        <SchemePageLayout>
            <div className='min-h/2-screen bg-gradient-to-br from-indigo-100 to-white w-full'>
                <Tabs tab contentsData={contentsData} bodyWidth="185%" />
            </div>
        </SchemePageLayout>

    </>)
}