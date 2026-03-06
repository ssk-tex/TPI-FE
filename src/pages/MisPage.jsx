import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSchemeDetailsStore } from "../store/schemeStore";
import Loader from "../components/Loader";
import SchemePageLayout from "../components/SchemePageLayout";
import { fetchMisReport4Fto } from "../services/tpiService";
import { motion } from "framer-motion";

// TanStack Table v8
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const MisPage = () => {
    const navigate = useNavigate();
    const { cssName, cssCode, slsCode, slsName, deptCode, deptName, centreShare, stateShare, schemeName } = useSchemeDetailsStore();
    const cs = centreShare.split('%')[0];
    const ss = stateShare.split('%')[0];

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [ftoList, setFtoList] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(-1);     // -1 = unknown, will update if API sends total
    const [totalCount, setTotalCount] = useState(null); // optional

    const columns = useMemo(
        () => [
            { accessorKey: "ftoNo", header: "FTO NO" },
            { accessorKey: "ftoType", header: "FTO Type" },
            { accessorKey: "billNo", header: "Bill No" },
            { accessorKey: "voucherNo", header: "Voucher No" },
            {
                accessorKey: "time",
                header: "Received At",
                cell: ({ getValue }) => getValue() || "—",
            },
            { accessorKey: "status", header: "Status" },
            { accessorKey: "txnStatus", header: "Txn Stat" },
            { accessorKey: "ackResponse", header: "Ack Resp" },
            { accessorKey: "ackStatus", header: "Ack Stat" },
            {
                accessorKey: "acktime",
                header: "Ack Sent At",
                cell: ({ getValue }) => getValue() || "—",
            },
        ],
        []
    );

    const table = useReactTable({
        data: ftoList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: pageCount, // → important
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onPaginationChange: (updater) => {
            const newState = typeof updater === "function"
                ? updater({ pageIndex, pageSize })
                : updater;
            setPageIndex(newState.pageIndex);
        },
    });

    const fetchData = async (page = pageIndex) => {
        if (loading) return;
        setLoading(true);

        try {
            const params = {
                slsCode,
                schemeName,
                page,           // 0-based
                size: pageSize,
                ...(fromDate && toDate && { periodFrom: fromDate, periodTo: toDate }),
            };

            const res = await fetchMisReport4Fto(params);

            const newRows = res.data?.map((item) => ({
                ftoNo: item.ftoNo,
                ftoType: item.ftoType,
                billNo: item.billNo,
                voucherNo: item.voucherNo,
                time: item.createDate,
                status: (item.status != null) ? item.status : "Status not checked yet",
                txnStatus: item.transactionStatus,
                ackResponse: (item.ackResponse != null) ? JSON.parse(item.ackResponse).message : "",
                ackStatus: item.ackStatus,
                acktime: item.ackSentDateTime,
            })) || [];

            setFtoList(newRows);

            // If your API returns total count / total pages — use it!
            if (res.totalCount || res.totalRecords) {
                const total = res.totalCount || res.totalRecords;
                setTotalCount(total);
                setPageCount(Math.ceil(total / pageSize));
            }
            // If no total → keep pageCount = -1 (shows "Next" until empty page)

        } catch (err) {
            console.error("MIS fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch when pageIndex or filters change
    useEffect(() => {
        fetchData(pageIndex);
    }, [pageIndex, fromDate, toDate]); // ← re-fetch on date change too

    const handleFilter = (e) => {
        e.preventDefault();
        if (!fromDate || !toDate) {
            alert("Please select both dates");
            return;
        }
        setPageIndex(0); // always reset to first page when filtering
    };

    const handleClear = () => {
        setFromDate("");
        setToDate("");
        setPageIndex(0);
    };

    if (loading && pageIndex === 0 && ftoList.length === 0) {
        return <Loader />;
    }

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

                <main className="flex-1 min-h-screen bg-gradient-to-br from-indigo-100 to-white py-8">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6">
                        {/* Filter Card */}
                        <div className="bg-white/80 backdrop-blur-md border border-indigo-100 shadow-lg rounded-2xl p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Filter MIS List</h2>
                                    <p className="text-sm text-gray-500">Select date range to filter records</p>
                                </div>

                                <form onSubmit={handleFilter} className="flex flex-col sm:flex-row items-end gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-xs font-medium text-gray-500 mb-1">From Date</label>
                                        <input
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-xs font-medium text-gray-500 mb-1">To Date</label>
                                        <input
                                            type="date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                                            disabled={loading}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
                                            disabled={loading}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Table Card */}
                        <div className="bg-white shadow rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => (
                                                    <th
                                                        key={header.id}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {table.getRowModel().rows.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50">
                                                {row.getVisibleCells().map((cell) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        {ftoList.length === 0 && !loading && (
                                            <tr>
                                                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">
                                                    No records found for the selected period.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="px-6 py-4 flex items-center justify-between border-t text-sm">
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage() || loading}
                                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
                                >
                                    Previous
                                </button>

                                <div className="text-gray-700">
                                    Page <strong>{pageIndex + 1}</strong>
                                    {totalCount !== null && (
                                        <>
                                            {" of "}
                                            <strong>{Math.ceil(totalCount / pageSize)}</strong>
                                            {" • "}
                                            {totalCount} records
                                        </>
                                    )}
                                    {loading && <span className="ml-3 text-indigo-600">Loading...</span>}
                                </div>

                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={
                                        loading ||
                                        (pageCount > -1 && pageIndex + 1 >= pageCount) ||
                                        (pageCount === -1 && ftoList.length < pageSize)
                                    }
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

            </main>
        </div>
        <Footer />
    </div>)
};