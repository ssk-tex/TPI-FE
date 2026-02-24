import { useLocation } from "react-router-dom";
import Table from "../components/Table";
import { decryptFtoList } from "../services/ommasService";
import { useSchemeDetailsStore } from "../store/schemeStore";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Btn from "../components/Btn";
import Modal from '../components/Modal';
import { decodeFtoList } from "../services/nrlmService";
import { getDecryptColumnSchemewise, xml2jsonConversion } from "../helper/helper";
import SchemePageLayout from "../components/SchemePageLayout";
import NrlmModal from "../Module/NRLM/NrlmModal";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from '../components/Footer';


export function DecryptedFtoList() {
    const location = useLocation();
    const encData = location.state.encryptedData;
    const ftoTxnId = location.state.ftoTxnLogId;
    const ftoId = location.state.ftoId;
    const { schemeName } = useSchemeDetailsStore();
    const [ftoList, setFtoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [xmlData, setXmlData] = useState(null);
    const openModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    const { cssName, cssCode, slsCode, slsName, deptCode, deptName, centreShare, stateShare } = useSchemeDetailsStore();
    const cs = centreShare.split('%')[0];
    const ss = stateShare.split('%')[0];

    const columns = getDecryptColumnSchemewise(schemeName);

    const DecryptFTOByScheme = async (scheme, encData) => {
        switch (scheme) {
            case "NRLM":
                const nrlm = await decodeFtoList(encData);
                setXmlData(nrlm);
                return xml2jsonConversion(nrlm)
            case "OMMAS":
                const ommas = await decryptFtoList(encData);
                return ommas.EXPENDITURE
            case "MNREGA":
            case "AWAS":
            case "JJM":
                return []; // future API calls can be added here
            default:
                return [];
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await DecryptFTOByScheme(schemeName, encData);
                let tableData = [];
                /* ---------------- ommas ------------------------ */
                if (schemeName === 'OMMAS') {
                    tableData = data.map((item, i) => ({
                        id: i + 1,
                        fin_year: item.FIN_YEAR,
                        txn_unique_id: item.TXN_UNIQUE_ID,
                        mother_sanc_order_number: item.MOTHER_SANC_ORDER_NUMBER,
                        state_sanc_order_number: item.STATE_SANC_ORDER_NUMBER,
                        sanction_date: item.SANCTION_DATE,
                        agency_code: item.AGENCY_CODE,
                        ddo_code: item.DDO_CODE,
                        total_gross_amount: item.TOTAL_GROSS_AMOUNT,
                        district_lgd_code: item.DISTRICT_LGD_CODE,
                        batch_id: item.BATCH_ID,
                        file_cr_date: item.FILE_CR_DATE,
                        isAction: (<>
                            <Btn
                                label="View"
                                variant="primary"
                                onClick={() => openModal(item)}
                            />
                        </>),
                    }));
                } else if (schemeName === 'NRLM') {
                    /* ---------------- nrlm ------------------------ */
                    tableData = [data].map((item, i) => ({
                        id: i + 1,
                        fin_year: item.FIN_YEAR,
                        txn_unique_id: item.TXNUNIQUEID,
                        mother_sanc_order_number: item.MOTHERSANCORDERNUMBER,
                        state_sanc_order_number: item.STATESANCORDERNUMBER,
                        sanction_date: item.SANCTION_DATE,
                        agency_code: item.AGENCYID,
                        ddo_code: item.DDOCODE,
                        total_gross_amount: item.TOTALGROSSAMOUNT,
                        total_net_amount: item.TOTALNETAMOUNT,
                        category: item.CATEGORY,
                        file_cr_date: item.FILECRDATE,
                        isAction: (<>
                            <Btn
                                label="View"
                                variant="primary"
                                onClick={() => openModal(item)}
                            />
                        </>),
                    }));
                } else {
                    tableData = [];
                }
                setFtoList(tableData);
            } catch (error) {
                // setError(error.message || "Failed to fetch data");
                console.error('error message', error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])

    function getModalContent(schemeName) {
        let modalContent;
        switch (schemeName) {
            case "OMMAS":
                modalContent = <PaymentDetails4Ommas data={selectedItem} />;
                break;
            case "NRLM":
                modalContent = <NrlmModal data={selectedItem} ftoTxnId={ftoTxnId} ftoId={ftoId} xmlData={xmlData} />;
                break;
            default:
                modalContent = [];
        }
        return modalContent;
    }

    if (loading) return < Loader />
    if (error) return <ErrorMessage message={error} />

    return (<div className="flex flex-col h-screen">
        <Header head={schemeName} />
        <div className="flex">
            <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
                <div className="text-center py-10 bg-gradient-to-b from-indigo-50 via-white to-white rounded-2xl shadow-md">
                    {/* Main Heading */}
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-indigo-800 tracking-wide drop-shadow-md flex justify-center items-center gap-2 font-sans"
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            role="img"
                            aria-label="spark"
                            initial={{ rotate: -20 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            🌟
                        </motion.span>
                        <span className="text-indigo-600">Welcome to</span>
                        <span className="text-indigo-900">{schemeName}</span>
                        <motion.span
                            role="img"
                            aria-label="spark"
                            initial={{ rotate: 20 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            🌟
                        </motion.span>
                    </motion.h1>
                    {/* Left, Progress Bar, Right */}
                    <motion.div
                        className="mt-6 flex flex-col md:flex-row items-center justify-between text-gray-800 font-medium md:px-6 gap-4 md:gap-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Left Side */}
                        <div className="md:w-1/3 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start text-sm md:text-base font-serif">
                            <span className="font-semibold text-indigo-700 mr-1">CSS:</span>
                            <span className="leading-tight text-center"> {cssName}</span>
                        </div>

                        {/* Center Progress Bar */}
                        <div className="w-full md:w-1/3 mx-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs md:text-sm font-semibold text-indigo-700 whitespace-nowrap mr-2">
                                    Central Share
                                </span>
                                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                                    <motion.div
                                        className="bg-indigo-500 h-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${cs}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        title={`${cssName}: ${cs}%`}
                                    ></motion.div>
                                    <motion.div
                                        className="bg-yellow-400 h-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${ss}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        title={`${slsName}: ${ss}%`}
                                    ></motion.div>
                                </div>
                                <span className="text-xs md:text-sm font-semibold text-yellow-600 whitespace-nowrap ml-2">
                                    State Share
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 mt-1 font-sans">
                                {cs}% / {ss}%
                            </div>

                            {/* Department section */}
                            <div className="mt-5 text-sm md:text-base font-serif text-indigo-800">
                                <span className="font-semibold">Department:</span>{" "}
                                <span>{deptName}</span>
                            </div>

                            {/* Divider Line */}
                            <motion.div
                                className="mt-3 h-1 w-100 bg-indigo-500 mx-auto rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                            />
                        </div>

                        {/* Right Side */}
                        <div className="md:w-1/3 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end text-sm md:text-base font-serif">
                            <span className="font-semibold text-yellow-600">SLS:</span>
                            <span className="leading-tight">
                                {slsName}
                            </span>
                        </div>
                    </motion.div>

                </div>

                <main className="flex-1 min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
                    <div style={{ padding: '20px' }} className='min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4'>
                        <Table tableName='FTO List' columns={columns} data={ftoList} rowsPerPage={3} />
                        {modalOpen && (
                            <Modal isOpen={modalOpen} onClose={closeModal} width="70%">
                                {/* <PaymentDetails4Ommas data={selectedItem} /> */}
                                {getModalContent(schemeName)}
                            </Modal>
                        )}
                    </div>
                </main>

            </main>
        </div>
        <Footer />
    </div>)
}