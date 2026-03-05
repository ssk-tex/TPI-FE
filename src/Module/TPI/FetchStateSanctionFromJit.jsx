import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Btn from "../../components/Btn";
import Tabs from "../../components/Tabs";
import Swal from "sweetalert2";
import SchemePageLayout from "../../components/SchemePageLayout";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { DateTimeFormatter } from "../../helper/dateTime";
import { fetchJITSanctionDetails, generateWalletSanction, sentSanction } from "../../services/tpiService";
import { fetchWalletDetails } from "../../services/schemeService";
import { useNavigate } from "react-router-dom";

export function FetchStateSanctionFromJit() {
    const navigate = useNavigate();
    const { slsCode, schemeName } = useSchemeDetailsStore();
    const [sendList, setSendList] = useState([]);
    const [yet2GenList, setYet2GenList] = useState([]);
    const [error, setError] = useState(null);
    const [sendBtn, setSendBtn] = useState(true);
    const [genBtn, setGenBtn] = useState(false);
    const [wallet, setWallet] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const columns = [
        { key: 'finYear', header: 'Fin Year' },
        { key: 'stateAllocationId', header: 'State Allocation Id' },
        { key: 'slsCode', header: 'Sls' },
        { key: 'cssSchemeCode', header: 'CSS' },
        { key: 'motherSanctionId', header: 'MS Id' },
        { key: 'motherSancNo', header: 'Mother Sanction No' },
        { key: 'stateSanctionId', header: 'State Sanction Id' },
        { key: 'sanctionNo', header: 'Sanction No' },
        { key: 'sanctionDate', header: 'Sanction Date' },
        { key: 'centralHead', header: 'Central Head' },
        { key: 'stateHead', header: 'State Head' },
        { key: 'ddo', header: 'DDO' },
        { key: 'limitCode', header: 'Limit Code' },
        { key: 'agency', header: 'Agency' },
        { key: 'treasury', header: 'Treasury' },
        { key: 'limitForAgency', header: 'Limit for Agency' },
        { key: 'totalAllocationAmt', header: 'Total Allocation Amount' },
        { key: 'districtLgdCode', header: 'District LGD Code' },
        { key: 'status', header: 'Status' },
    ];
    const WalletColumns = [
        { key: 'hoa', header: 'HOA' },
        { key: 'css', header: 'CSS' },
        { key: 'sls', header: 'SLS' },
        { key: 'agency_id', header: 'Agency' },
        { key: 'wallet_san_no', header: 'WS No' },
        { key: 'amount', header: 'Amount' },
        { key: 'ms_no', header: 'MS NO' },
        { key: 'ss_no', header: 'SS No' },
        { key: 'ss_date', header: 'SS Date' },
        { key: 'sequence_no', header: 'Sequence' },
        { key: 'finYear', header: 'Fin year' }
    ];

    const loadData = async () => {
        try {
            let tableDataSend = []
            let tableDataYet2Send = []
            const data = await fetchJITSanctionDetails({ sls_code: slsCode, data_for: schemeName });
            data.data.forEach((item) => {
                const row = {
                    finYear: item.finYear,
                    stateAllocationId: item.stateAllocationId,
                    slsCode: item.slsCode,
                    cssSchemeCode: item.cssSchemeCode,
                    motherSanctionId: item.motherSanctionId,
                    motherSancNo: item.motherSancNo,
                    stateSanctionId: item.stateSanctionId,
                    sanctionNo: item.sanctionNo,
                    sanctionDate: DateTimeFormatter(item.sanctionDate),
                    centralHead: item.centralHead,
                    stateHead: item.stateHead,
                    ddo: `${item.ddoName}(${item.ddoCode})`,
                    limitCode: item.limitCode,
                    agency: `${item.agencyName}(${item.agencyCode})`,
                    treasury: `${item.treasuryName}(${item.treasuryCode})`,
                    limitForAgency: item.limitForAgency,
                    totalAllocationAmt: item.totalAllocationAmt,
                    districtLgdCode: item.districtLgdCode,
                    status: item.activeFlagStatus
                };

                if (item.activeFlag === 2) {
                    tableDataSend.push(row);
                    if (genBtn) { setGenBtn(false); }
                    // setSendBtn(false);
                } else if (item.activeFlag === 0) {
                    tableDataYet2Send.push(row);
                    if (!genBtn) { setGenBtn(true); }

                    // setSendBtn(false);
                } else {
                    // setGenBtn(false);
                    // setSendBtn(true);
                }
            });
            setSendList(tableDataSend);
            setYet2GenList(tableDataYet2Send);
        } catch (error) {
            console.log('error message', error.message);

            // setError("Failed to fetch data" || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    /*-------------------------------------
         🟦 Common Mapping Function 
       -------------------------------------*/
    const mapTableRows = (data) => {
        return data.map((item, i) => ({
            hoa: `${item.hoa}(${item.hoa_id})`,
            css: item.css,
            sls: item.sls,
            agency_id: item.agency_id,
            wallet_san_no: item.wallet_san_no,
            amount: item.amount,
            ms_no: item.ms_no,
            ss_no: item.ss_no,
            ss_date: DateTimeFormatter(item.ss_date),
            sequence_no: item.sequence_no,
            finYear: item.fin_year
        }));
    };

    /*-------------------------------------
      🟦 Default Lazy Load API Call
    -------------------------------------*/
    const loadDefaultWallet = async () => {
        try {
            setLoading(true);
            const res = await fetchWalletDetails({
                SchemeName: schemeName,
                page,
                size: 5,
            });
            if (!res.data || res.data.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            setWallet(prev => [...prev, ...mapTableRows(res.data)]);
            setPage(prev => prev + 1);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /*-------------------------------------
      🟦 Master Lazy Loading UseEffect
    -------------------------------------*/
    useEffect(() => {
        if (!hasMore) return;
        loadDefaultWallet();
        // loadData()
    }, [page]);

    const sendData = async (id) => {
        if (id === 1) {
            let ws = [];
            yet2GenList.forEach(item => {
                const exist = ws.some(x => x.motherSancNo === item.motherSancNo);
                if (!exist) {
                    ws.push({
                        finYear: item.finYear,
                        slsCode: item.slsCode,
                        cssCode: item.cssSchemeCode,
                        motherSancNo: item.motherSancNo,
                        schemeName: schemeName
                    })
                }
            });
            const payload = { sanctions: ws }
            try {
                const resp = await generateWalletSanction(payload);
                const response = resp.details.map(item => ({ motherSancNo: item.motherSancNo, message: item.message, status: item.success }));
                const allTrue = response.every(item => item.status === true);
                const allFalse = response.every(item => item.status === false);
                if (allTrue) {
                    Swal.fire({
                        title: '✅ Success!',
                        text: `Wallet generated successfully`,
                        icon: 'success',
                    });
                } else if (allFalse) {
                    const failedList = response.filter(item => item.status === false);
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        html: `
                        <div style="text-align:left;">
                            <b>The following mother sanction(s) failed:</b><br><br>
                            ${failedList
                                .map(x => `• <b>${x.motherSancNo}</b> — ${x.message}`)
                                .join("<br>")}
                            </div>
                        `,
                        confirmButtonText: "OK",
                    });
                } else {
                    const failedList = response.filter(item => item.status === false);
                    Swal.fire({
                        icon: "warning",
                        title: "Warning",
                        html: `
                        <div style="text-align:left;">
                            <b>The following mother sanction(s) failed:</b><br><br>
                            ${failedList
                                .map(x => `• <b>${x.motherSancNo}</b> — ${x.message}`)
                                .join("<br>")}
                            </div>
                        `,
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: '❌ Failed!',
                    text: 'Something went wrong while calling API.',
                    icon: 'error',
                });
            }
            // navigate(0);
        } else {
            let ws = [];
            wallet.forEach(item => {
                const exist = ws.some(x => x.motherSancNo === item.ms_no);
                if (!exist) {
                    ws.push({
                        finYear: item.finYear,
                        slsCode: item.sls,
                        cssCode: item.css,
                        motherSancNo: item.ms_no,
                        schemeName: schemeName
                    })
                }
            });
            const payload = { sanctions: ws }
            try {
                const resp = await sentSanction(payload);
                const response = resp.details.map(item => ({ motherSancNo: item.motherSancNo, message: item.message, status: item.success }));
                const allTrue = response.every(item => item.status === true);
                const allFalse = response.every(item => item.status === false);
                if (allTrue) {
                    Swal.fire({
                        title: '✅ Success!',
                        text: `All sanctions sent to scheme successfully`,
                        icon: 'success',
                    });
                } else if (allFalse) {
                    const failedList = response.filter(item => item.status === false);
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        html: `
                                <div style="text-align:left;">
                                    <b>The following mother sanction(s) failed:</b><br><br>
                                    ${failedList
                                .map(x => `• <b>${x.motherSancNo}</b> — ${x.message}`)
                                .join("<br>")}
                                    </div>
                                            `,
                        confirmButtonText: "OK",
                    });
                } else {
                    const failedList = response.filter(item => item.status === false);
                    Swal.fire({
                        icon: "warning",
                        title: "Warning",
                        html: `
                                            <div style="text-align:left;">
                                                <b>The following mother sanction(s) failed:</b><br><br>
                                                ${failedList
                                .map(x => `• <b>${x.motherSancNo}</b> — ${x.message}`)
                                .join("<br>")}
                                                </div>
                                            `,
                        confirmButtonText: "OK",
                    });
                }
                setTimeout(() => {
                    navigate(0);
                }, 2000)
            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: '❌ Failed!',
                    text: 'Something went wrong while calling API.',
                    icon: 'error',
                });
            }
        }
    }

    const contentsData = [
        {
            id: 1, title: "Yet to Generate Wallet", content: <>
                <Table tableName='Yet to Generate Wallet' columns={columns} data={yet2GenList} rowsPerPage={2} />
                {genBtn && (
                    <div className='flex justify-center'>
                        <Btn
                            label={loading ? "Sending..." : "Generate Wallet Sanction"}
                            variant="success"
                            size="xxl"
                            disabled={loading}
                            onClick={() => sendData(1)}
                        />
                    </div>
                )}
            </>
        },
        {
            id: 2, title: "Yet to Send Data into Scheme", content: <>
                <Table tableName='Wallet' columns={WalletColumns} data={wallet} rowsPerPage={2} />
                {sendBtn && (
                    <div className='flex justify-center'>
                        <Btn
                            label={loading ? "Fetching..." : "Send Data to Scheme"}
                            variant="success"
                            size="xxl"
                            disabled={loading}
                            onClick={() => sendData(2)}
                        />
                    </div>
                )}
            </>
        },
        { id: 3, title: "Sent", content: <Table tableName='Sent' columns={columns} data={sendList} rowsPerPage={3} /> },

    ];


    return (<>
        <SchemePageLayout>
            <div className='min-h/2-screen bg-gradient-to-br from-indigo-100 to-white w-full'>
                <Tabs tab contentsData={contentsData} bodyWidth="185%" />
            </div>
        </SchemePageLayout>
    </>)
}