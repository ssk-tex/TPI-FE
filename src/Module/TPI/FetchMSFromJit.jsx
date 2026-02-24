import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchJITMSDetails } from "../../services/tpiService";

export function FetchMSFromJit() {
    const {slsCode, schemeName} = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2SendList, setYet2SendList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const columns = [
        { key: 'finYear', header: 'Fin Year' },
        { key: 'motherSanctionId', header: 'MS Id' },
        { key: 'motherSanctionNo', header: 'MS No' },
        { key: 'cssSchemeCode', header: 'CSS' },
        { key: 'motherSanctionDate', header: 'MS Date' },
        { key: 'totalAmount', header: 'Total Amount' },
        { key: 'availableAmt', header: 'Available Amount' },
        { key: 'status', header: 'Status' },
        { key: 'isActive', header: 'Is Active' },
    ];

    const contentsData = [
        { id: 1, title: "Sent", content: <Table tableName='Sent' columns={columns} data={sendList} rowsPerPage={3} /> },
        { id: 2, title: "Yet to Send", content: <Table tableName='Yet to Send' columns={columns} data={yet2SendList} rowsPerPage={3} /> },
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                let tableDataSend = []
                let tableDataYet2Send = []
                const data = await fetchJITMSDetails({data_for:schemeName});
                data.data.forEach((item, i) => {
                    const row = {
                        finYear: item.finYear,
                        motherSanctionId: item.motherSanctionId,
                        motherSanctionNo: item.motherSancNo,
                        cssSchemeCode: item.cssSchemeCode,
                        motherSanctionDate: DateTimeFormatter(item.motherSancDate),
                        totalAmount: item.totalAmt,
                        availableAmt:item.availableAmt,
                        status: item.activeFlag == 0 ? 'Yet to Send (To Scheme Table)' : 'Sent (To Scheme Table)',
                        isActive: item.activeFlag == 1 ? "Active" : "Inactive"
                    };

                    if (item.activeFlag != 0) {
                        tableDataSend.push(row);
                    } else {
                        tableDataYet2Send.push(row);
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
    }, []);

    return (<>
        <SchemePageLayout>
            <div className='min-h/2-screen bg-gradient-to-br from-indigo-100 to-white w-full'>
                <Tabs tab contentsData={contentsData} bodyWidth="185%" />
            </div>
        </SchemePageLayout>
    </>)
}