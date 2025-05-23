import React, { useEffect, useState } from "react";
import Pagination from "../../../Component/Pagination";

const DownlineMemberList = ({ referralMember }) => {
  const [loading, setLoading] = useState(true);
  const referralMembers = referralMember?.data

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log(referralMembers);


  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = referralMembers?.downline?.filter(
    (member) =>
      member?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">S.No</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Distributor ID</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Distributor Name</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">DOJ</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Sponser ID</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Rank</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Promotion Date</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Status</th>
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
            ) : Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              paginatedData.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{member?.username || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{member?.name || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{new Date(member?.createdAt).toDateString()}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{member?.referrCode || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{member?.selectRank || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">{new Date(member?.createdAt).toDateString()}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap font-light">
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

export default DownlineMemberList;
