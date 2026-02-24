import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getStatusList, sendAck } from "../../services/nrlmService";
import Swal from "sweetalert2";

export default function AcknowledgementPage({ ftoId, ftoTxnId, refNo, sendData2PaymentPage }) {
    const ackNo = uuidv4();
    const [payeeList, setPayeeList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [successStatus, setSuccessStatus] = useState("");
    const [enableSendBtn, setEnableSendBtn] = useState(false);

    function onBack() {
        sendData2PaymentPage({ isOpenAck: false })
    }

    useEffect(() => {
        let statuslist = [];
        const loadPayeeList = async () => {
            const data = await getStatusList();
            data.data.map(item => {
                statuslist.push({
                    id: item.nrlmFtoAckStatusId,
                    code: item.errorCode,
                    message: item.description
                });
            });
            setStatusList(statuslist);
        };
        loadPayeeList();
    }, []);

    useEffect(() => {
        const rList = refNo.map(item => ({
            referenceNumber: item.refNo,
            payeeAckNo: uuidv4(),
            selected: true,
        }));
        setPayeeList(rList);
    }, [])

    useEffect(() => {
        if (payeeList.length > 0) {
            const formatted = payeeList.map((item, index) => ({
                id: index + 1,
                refNo: item.referenceNumber,
                ackNo: item.payeeAckNo,
                checked: true
            }));
            setData(formatted);
        }
    }, [payeeList]);


    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const toggleSelectAll = (checked) => {
        setData(data.map((row) => ({ ...row, checked })));
    };

    const toggleCheck = (id) => {
        setData(data.map((row) => (row.id === id ? { ...row, checked: !row.checked } : row)));
    };

    const bulkProcess = async () => {
        const selected = data.filter((item) => item.checked);
        const selectedPayee = selected.map(item => ({
            reference_no: item.refNo,
            payee_ack_no: item.ackNo,
            status: item.status
        }));

        let status = statusList.filter(item => item.id == successStatus);

        const payLoad = {
            fto_trans_log: String(ftoTxnId),
            acknowledgement_no: ackNo,
            id: ftoId,
            message: status[0].message,
            status_code: status[0].code,
            payee_references: selectedPayee
        };

        try {
            const res = await sendAck(payLoad);
            Swal.fire({
                title: '✅ Success!',
                text: `${res.data.message}`,
                icon: 'success',
            });
        } catch (error) {
            Swal.fire({
                title: '❌ Failed!',
                text: 'Something went wrong, Try Again',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        const hasSuccessStatus = successStatus && successStatus !== "";
        const hasCheckedRow = data.some(row => row.checked === true);
        const allRowsHaveStatus = data.every(row => row.status && row.status !== "");
        if (hasSuccessStatus && hasCheckedRow && allRowsHaveStatus) {
            setEnableSendBtn(true);
        } else {
            setEnableSendBtn(false);
        }
    }, [data, successStatus]);

    return (
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-300 p-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 space-y-6 relative">

                {/* Back Button */}
                <button
                    onClick={onBack}   // <-- ekhane tumi nijer function dibey
                    className="absolute top-4 left-4 px-4 py-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-700 font-semibold rounded-xl shadow"
                >
                    ← Back
                </button>
                <h2 className="text-3xl font-bold text-indigo-700 text-center">Acknowledgement Details</h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold">Acknowledgement No</label>
                        <input className="w-full p-2 border rounded-xl" placeholder="Enter Acknowledgement No" value={ackNo} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">FTO ID</label>
                        <input className="w-full p-2 border rounded-xl" placeholder="Enter FTO ID" value={ftoId} readOnly />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div>
                        <label className="block text-sm font-semibold">Success Code / Message</label>
                        {/* <input className="w-full p-2 border rounded-xl" placeholder="Success Message" /> */}

                        <select className="w-full p-2 border rounded-xl bg-white" value={successStatus} onChange={(e) => setSuccessStatus(e.target.value)}>
                            <option value="" disabled selected>Select Success Message</option>
                            {statusList.map((item, idx) => (
                                <option key={idx} value={item.id}>
                                    {item.code} - {item.message}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-x-auto p-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-indigo-600 text-white text-left">
                                <th className="p-3"><input type="checkbox" checked={data.every((row) => row.checked)} onChange={(e) => toggleSelectAll(e.target.checked)} /></th>
                                <th className="p-3">Reference No</th>
                                <th className="p-3">Payee Ack No</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row) => (
                                <tr key={row.id} className="border-b">
                                    <td className="p-3"><input type="checkbox" checked={row.checked} onChange={() => toggleCheck(row.id)} /></td>
                                    <td className="p-3">{row.refNo}</td>
                                    <td className="p-3">{row.ackNo}</td>

                                    <td className="p-3">
                                        <select
                                            value={row.status}
                                            onChange={(e) =>
                                                setData(
                                                    data.map((item) =>
                                                        item.id === row.id ? { ...item, status: e.target.value } : item
                                                    )
                                                )
                                            }
                                            className="border p-3 rounded-xl"
                                        >
                                            <option value="">Status</option>
                                            {statusList.map((item) => (
                                                <option key={item.id} value={item.code}>
                                                    {item.code}
                                                </option>
                                            ))}

                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bulk Action */}
                <div className="flex justify-center">
                    <button
                        onClick={bulkProcess}
                        disabled={!enableSendBtn}
                        className={`px-6.5 py-2 font-semibold rounded-xl shadow
        ${enableSendBtn ? "bg-green-600 text-white" : "bg-gray-400 text-white cursor-not-allowed"}
    `}
                    >
                        Send
                    </button>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-xl disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="font-semibold">Page {currentPage} of {totalPages}</span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-xl disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
