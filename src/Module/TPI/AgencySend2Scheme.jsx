import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
// import { agencyDetailsSend, fetchAgencyDetails } from "../../services/nrlmService";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchAgencyDetails, fetchOmmasAgencyDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";

export function AgencySend2Scheme() {
    const { slsCode, cssCode } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);

    const columns = [
        { key: 'parentAgencyCode', header: 'Parent Agency Code' },
        { key: 'agencyCode', header: 'Agency Code' },
        { key: 'agencyName', header: 'Agency Name' },
        { key: 'ddoCode', header: 'DDO Code' },
        { key: 'ddoName', header: 'DDO Name' },
        { key: 'treasCode', header: 'Treasury Code' },
        { key: 'treasName', header: 'Treasury Name' },
        { key: 'status', header: 'NRLM Sent Status' },
        { key: 'SentTimestamp', header: 'NRLM Sent Timestamp' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                let data;
                let tableDataSend = []
                let tableDataYet2Send = []
                switch (cssCode) {
                    case 9181:
                        data = await fetchAgencyDetails({ slsCode: slsCode });
                        data.data.forEach((item, i) => {
                            const row = {
                                // id: i + 1,
                                parentAgencyCode: item.parentAgencyCode,
                                agencyCode: item.agencyCode,
                                agencyName: item.agencyName,
                                ddoCode: item.ddoCode,
                                ddoName: item.ddoName,
                                treasCode: item.treasCode,
                                treasName: item.treasName,
                                SentTimestamp: (item.nrlmSentTimestamp !== null) ? DateTimeFormatter(item.nrlmSentTimestamp) : "-",
                                status: (item.nrlmSentStatus === '1') ? "Failed" : item.nrlmSentStatusDescription,
                            };

                            if (item.nrlmSentStatus === "2") {
                                tableDataSend.push(row);
                            } else {
                                tableDataYet2Send.push(row);
                                setSendBtn(true);
                            }
                        });
                        break;
                    case 9179:
                        data = await fetchOmmasAgencyDetails({ slsCode: slsCode });
                        data.data.forEach((item, i) => {
                            const row = {
                                // id: i + 1,
                                parentAgencyCode: item.parentAgencyCode,
                                agencyCode: item.childAgencyCode,
                                agencyName: item.childAgencyName,
                                ddoCode: item.ddoCode,
                                ddoName: item.ddoName,
                                treasCode: item.treasCode,
                                treasName: item.treasName,
                                SentTimestamp: (item.ommasSentTimestamp !== null) ? DateTimeFormatter(item.ommasSentTimestamp) : "-",
                                status: (item.ommasSentStatus === '1') ? "Failed" : item.ommasSentStatusDescription,
                            };

                            if (item.ommasSentStatus === "2") {
                                tableDataSend.push(row);
                            } else {
                                tableDataYet2Send.push(row);
                                setSendBtn(true);
                            }
                        });
                        break;
                    default:
                        data = { data: [] };
                        break;
                }
                // const data = await fetchAgencyDetails({ slsCode: slsCode });


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
        try {
            const resp = await slsData.agencyFn({ "slsCode": slsData.slsCode });
            Swal.fire({
                title: '✅ Success!',
                text: `Response: Agency Details Send Successfully`,
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
                            label={loading ? "Sending..." : "Sent Agency Data"}
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