import React, { useEffect, useState } from "react";
import Button from "../../../Component/Button";
import { getOrders } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Routers } from "../../../constants/Routes";
import { Link } from "react-router-dom";
import Pagination from "../../../Component/Pagination";

export default function OrderHistoryReport() {
    const user = useSelector(store => store?.auth);
    const userId = user?.user?._id;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const generateInvoicePath = (id) => Routers.Invoice.replace(':id', id);

    const fetchOrders = async () => {
        try {
            const response = await getOrders(userId);
            setOrders(response?.data.orders || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredData = orders?.filter(order =>
        order?.razorpayOrderId?.toLowerCase().includes(searchInput?.toLowerCase()) ||
        order?.userId?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        order?.createdAt.includes(searchInput)
    );

    const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="p-4 bg-white rounded-xl overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-gray-800 text-lg">Track My Order Status</h2>
                <Button title={'View all'} link={'order-history'} />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm text-left">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">SR No.</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Order ID</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Customer Name</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Order Date</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Total Items</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Amount (Rs)</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Total Amount (Rs)</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Payment Method</th>
                            <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Order Status</th>
                            <th className="border border-gray-300 font-medium p-2">Invoive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: rowsPerPage }).map((_, index) => (
                                <tr key={index}>
                                    {[...Array(8)].map((_, i) => (
                                        <td key={i} className="border border-gray-300 p-2">
                                            <motion.div
                                                className="h-4 bg-gray-200 rounded animate-pulse"
                                                initial={{ opacity: 0.5 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            paginatedData.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{index + 1}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.razorpayOrderId}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.userId?.name}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.items?.length}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.amount}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.totalAmount}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.paymentMethod}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.orderStatuses}</td>
                                    <td className="border border-gray-300 p-2">
                                        <Link to={generateInvoicePath(order?._id)}>
                                            <button className="px-2 py-1 rounded-md text-white bg-bg-color">Invoice</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>

        </div>
    );
}
