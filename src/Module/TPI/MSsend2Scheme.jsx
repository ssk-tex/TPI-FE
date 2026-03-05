import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
// import { fetchMSDetails, msDetailsSend } from "../../services/nrlmService";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchMSDetails, fetchOmmasMSDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";
import { getFY } from "../../helper/finYear";

export function MSsend2Scheme() {
    const { slsCode, cssCode } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);
    const [finYear, setFinYear] = useState('');

    const columns = [
        { key: 'motherSanctionNo', header: 'Mother Sanction No' },
        { key: 'motherSanctionDate', header: 'Mother Sanction Date' },
        { key: 'totalAmount', header: 'Total Amount' },
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
                        data = await fetchMSDetails({ slsCode: slsCode, finYear: FY });
                        setFinYear(data.finYear);
                        data.data.forEach((item, i) => {
                            const row = {
                                motherSanctionNo: item.motherSanctionNo,
                                motherSanctionDate: DateTimeFormatter(item.motherSanctionDate),
                                totalAmount: item.totalAmount,
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
                        data = await fetchOmmasMSDetails({ slsCode: slsCode, finYear: FY });
                        setFinYear(data.finYear);
                        data.data.forEach((item, i) => {
                            const row = {
                                motherSanctionNo: item.motherSancOrderNumber,
                                motherSanctionDate: item.motherSanctionDate.split("-").reverse().join("-"),
                                totalAmount: item.stateSancOrderAmt,
                                SentTimestamp: (item.omamsSentTimestamp !== null) ? DateTimeFormatter(item.omamsSentTimestamp) : "-",
                                status: (item.ommasSentStatus === '1') ? "Failed" : item.ommasSentStatusDescription,
                            };
                            if (item.ommasSentStatus === "2") {
                                tableDataSend.push(row);
                            } else {
                                tableDataYet2Send.push(row);
                                // setSendBtn(true);
                            }
                        });
                        break;
                    default:
                        data = { data: [] };
                        break;
                }
                setSendList(tableDataSend);
                setYet2SendList(tableDataYet2Send);
                if (yet2SendList.length > 0) {setSendBtn(true);}
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
        const [{ motherSanctionNo }] = yet2SendList;

        const payLoad = {
            motherSanctionNo: motherSanctionNo, slsCode: slsData.slsCode, finYear: finYear
        }

        try {
            const resp = await slsData.msFn(payLoad);
            Swal.fire({
                title: '✅ Success!',
                text: `Response: Mother Sanction Details Send Successfully`,
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
                            label={loading ? "Sending..." : "Sent Mother Sanction Data"}
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