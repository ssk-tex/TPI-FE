import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchSlsDetails } from "../../services/tpiService";
import { sendData2SchemeApi } from "../../config/config";

export function ComponentSend2Scheme() {
    const { slsCode, schemeName } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(false);


    const columns = [
        // { key: 'id', header: '#' },
        { key: 'snaAgencyName', header: 'Agency Name' },
        { key: 'snaUniqueAgencyCode', header: 'Agency Code' },
        { key: 'centreBudgetHead', header: 'Centre Budget Head' },
        { key: 'stateBudgetHead', header: 'State Budget Head' },
        { key: 'districtName', header: 'District Name' },
        { key: 'districtCode', header: 'District Code' },
        { key: 'nrlmSentTimestamp', header: 'Sent At' },
        { key: 'status', header: 'Status' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                let tableDataSend = []
                let tableDataYet2Send = []
                const data = await fetchSlsDetails(slsCode);

                data.data.forEach((item, i) => {
                    const row = {
                        snaAgencyName: item.snaAgencyName,
                        snaUniqueAgencyCode: item.snaUniqueAgencyCode,
                        centreBudgetHead: item.centreBudgetHead,
                        stateBudgetHead: item.stateBudgetHead,
                        districtName: item.districtName,
                        districtCode: item.districtCode,
                        nrlmSentTimestamp: (item.nrlmSentTimestamp !== null) ? DateTimeFormatter(item.nrlmSentTimestamp) : "-",
                        status: (item.nrlmSentStatus === '1') ? "Failed" : item.nrlmSentStatusDescription,
                    };
                    if (item.nrlmSentStatus === "2") {
                        tableDataSend.push(row);
                    } else {
                        tableDataYet2Send.push(row);
                        setSendBtn(true);
                    }
                });

                setSendList(tableDataSend);
                setYet2SendList(tableDataYet2Send);

                if (data.data.length > 0) {
                    Swal.fire({
                        title: '✅ Success!',
                        text: `${data.message}`,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            } catch (error) {
                console.log('error message', error.message);

                Swal.fire({
                    title: '❌ Failed!',
                    text: `${error.message}`,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });

                // setError("Failed to fetch data" || error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

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
        const payload = (schemeName === 'NRLM')
            ? { "slsCode": slsData.slsCode }
            : { "slsCode": slsData.slsCode, stateLgdCode: "19" }
        try {
            const resp = await slsData.slsFn(payload);
            Swal.fire({
                title: '✅ Success!',
                text: `Response: SLS Details Send Successfully`,
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
                            label={loading ? "Sending..." : "Sent SLS Data"}
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