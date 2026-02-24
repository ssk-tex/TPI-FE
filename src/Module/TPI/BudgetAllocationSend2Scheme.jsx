import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
// import { budgetAllocationSend, fetchBudgetAllocationDetails } from "../../services/nrlmService";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchBudgetAllocationDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";

export function BudgetAllocationSend2Scheme() {
    const { slsCode } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);
    const [ms, setMs] = useState("");
    const [finYear, setFinYear] = useState('');


    const columns = [
        { key: 'nrlmSlsBudgetHeadId', header: 'SLS Budget Head Id' },
        { key: 'pfmsCode', header: 'PFMS Code' },
        { key: 'centerHead', header: 'Center Head' },
        { key: 'stateHead', header: 'State Head' },
        { key: 'createdDate', header: 'Created Date' },
        { key: 'budgetAmt', header: 'Budget Amount' },
        { key: 'status', header: 'NRLM Sent Status' },
        { key: 'nrlmSentTimestamp', header: 'NRLM Sent Timestamp' },
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                let tableDataSend = []
                let tableDataYet2Send = []
                const data = await fetchBudgetAllocationDetails({ slsCode: slsCode, finYear: "2025-2026" });
                setFinYear(data.finYear);
                data.data.forEach((item, i) => {
                    const row = {
                        nrlmSlsBudgetHeadId: item.nrlmSlsBudgetHeadId,
                        pfmsCode: item.pfmsCode,
                        centerHead: item.centerHead,
                        stateHead: item.stateHead,
                        createdDate: DateTimeFormatter(item.createdDate),
                        budgetAmt: item.budgetAmt,
                        nrlmSentTimestamp: (item.nrlmSentTimestamp !== null) ? DateTimeFormatter(item.nrlmSentTimestamp) : "-",
                        status: (item.nrlmSentStatus === '1') ? "Failed" : item.nrlmSentStatusDescription,
                    };

                    if (item.nrlmSentStatus === "2") {
                        tableDataSend.push(row);
                    } else {
                        tableDataYet2Send.push(row);
                        setSendBtn(true);
                        setMs(item.motherSanctionNo);
                    }
                });

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
        // let ms;
        // if (yet2SendList.length > 0) {
        //     yet2SendList.map(item => ms = item.motherSanctionNo)
        // }
        // const payLoad = { "motherSanctionNo": ms, "slsCode": slsCode, "finYear": "2025-2026" }
        // try {
        //     const resp = await budgetAllocationSend(payLoad);
        //     Swal.fire({
        //         title: '✅ Success!',
        //         text: `Response: SLS Budget Allocation Details Send Successfully`,
        //         icon: 'success',
        //     });
        // }
        // catch (error) {
        // const errStr = error.response.data.errors[0].error.substring(error.response.data.errors[0].error.indexOf("{"), error.response.data.errors[0].error.lastIndexOf("}") + 1);
        // const errObj = JSON.parse(errStr);
        // const finalMessage = errObj.message;
        // Swal.fire({
        //     title: '❌ Failed!',
        //     text: finalMessage,
        //     icon: 'error',
        // });
        // }

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
            const resp = await slsData.baFn(payLoad);
            Swal.fire({
                title: '✅ Success!',
                text: `Response: Budget Alloation Details Send Successfully`,
                icon: 'success',
            });
        } catch (error) {
            const errStr = error.response.data.errors[0].error.substring(error.response.data.errors[0].error.indexOf("{"), error.response.data.errors[0].error.lastIndexOf("}") + 1);
            const errObj = JSON.parse(errStr);
            const finalMessage = errObj.message;
            Swal.fire({
                title: '❌ Failed!',
                text: finalMessage,
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
                                label={loading ? "Sending..." : "Sent Budget Allocation Data"}
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

            {sendBtn && (
                <div className='flex justify-center'>
                    <Btn
                        label={loading ? "Sending..." : "Sent SLS Data"}
                        variant="success"
                        size="xxl"
                        disabled={loading}
                        onClick={sendData}
                    />
                </div>
            )}

        </SchemePageLayout>

    </>)
}