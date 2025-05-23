import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../../Component/Pagination";

const ReferralMemberList = ({ referralMember }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const rowsPerPage = 10;
  const referralMembers = referralMember?.partners || [];

 useEffect(() => {
  setTimeout(() => {
    setLoading(false);
    setStatusFilter(location.state || "All");
  }, 2000);
}, []);

  const filteredData = referralMembers.filter((member) => {
    const matchesSearch = member?.name?.toLowerCase().includes(searchInput.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && member?.status === true) ||
      (statusFilter === "Inactive" && member?.status === false);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded-md text-sm w-60"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 text-sm rounded-md"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse whitespace-nowrap border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2">S.No</th>
              <th className="border border-gray-300 font-medium p-2">Distributor ID</th>
              <th className="border border-gray-300 font-medium p-2">Distributor Name</th>
              <th className="border border-gray-300 font-medium p-2">DOJ</th>
              <th className="border border-gray-300 font-medium p-2">Sponser ID</th>
              <th className="border border-gray-300 font-medium p-2">Rank</th>
              <th className="border border-gray-300 font-medium p-2">Promotion Date</th>
              <th className="border border-gray-300 font-medium p-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="border border-gray-300 p-2">{member?.username || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.name || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{new Date(member?.createdAt).toDateString() || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.referrCode || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.selectRank || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{new Date(member?.createdAt).toDateString() || "N/A"}</td>
                  <td className="border border-gray-300 p-2">
                    <span className={`font-semibold ${member?.status ? "text-green-600" : "text-red-600"}`}>
                      {member?.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border border-gray-300 p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    <div className="flex justify-between items-center mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>

    </div>
  );
};

export default ReferralMemberList;
