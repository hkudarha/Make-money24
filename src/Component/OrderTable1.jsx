import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Routers } from "../constants/Routes";
import Pagination from "./Pagination";

export default function OrderTable1({ data, isLoading }) {
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = data?.filter(order =>
        order?.razorpayOrderId?.toLowerCase().includes(searchInput?.toLowerCase()) ||
        order?.userId?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        order?.userId?.username.toLowerCase().includes(searchInput.toLowerCase())
    ) || [];

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const generateInvoicePath = (id) => Routers.Invoice.replace(':id', id);
    const totalAMSD = paginatedData.reduce((sum, order) => sum + (parseFloat(order?.amount) || 0), 0);

    return (
        <div className="p-4 bg-white rounded-xl overflow-hidden">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID, User Name, or User ID"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm text-left">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 font-medium p-2">SR No.</th>
                            <th className="border border-gray-300 font-medium p-2">User ID</th>
                            <th className="border border-gray-300 font-medium p-2">Order ID</th>
                            <th className="border border-gray-300 font-medium p-2">Customer Name</th>
                            <th className="border border-gray-300 font-medium p-2">Order Date</th>
                            <th className="border border-gray-300 font-medium p-2">AMSD</th>
                            <th className="border border-gray-300 font-medium p-2">GST</th>
                            <th className="border border-gray-300 font-medium p-2">Shipping + GST Amount</th>
                            <th className="border border-gray-300 font-medium p-2">Sponsor Bouns + GST</th>
                            <th className="border border-gray-300 font-medium p-2">Total Amount</th>

                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: paginatedData.length }).map((_, index) => (
                                <tr key={index}>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <td key={i} className="border border-gray-300 p-2">
                                            <motion.div
                                                className="h-4 bg-gray-300 rounded animate-pulse"
                                                initial={{ opacity: 0.5 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            ></motion.div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            paginatedData.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{index + 1}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.userId?.username}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.razorpayOrderId}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.userId?.name}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.amount?.toFixed(2)}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.gstAmount?.toFixed(2)}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.shippingAmount?.toFixed(2)}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.sponsorBonus?.toFixed(2)}</td>
                                    <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{order?.totalAmount?.toFixed(2)}</td>
                                </tr>
                            ))
                        )}

                        <tr className="font-semibold bg-yellow-100">
                            <td colSpan="5" className="p-2 text-right">Total AMSD:</td>
                            <td className=" p-2">{totalAMSD.toFixed(2)}</td>
                            <td className=" p-2"></td>
                            <td className=" p-2"></td>
                            <td className=" p-2"></td>
                            <td className=" p-2"></td>
                        </tr>
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
