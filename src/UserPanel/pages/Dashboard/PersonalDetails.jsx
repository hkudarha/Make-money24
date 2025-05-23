import React from 'react';
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
  const user = useSelector((state) => state.auth);
  const userDetails = user?.user;

  const rank = userDetails?.selectRank || "N/A";
  const fcid = userDetails?.username || "N/A";
  const name = userDetails?.name || "N/A";
  const sponsorID = userDetails?.referrCode || "N/A";
  const status = userDetails?.status ? "ACTIVE" : "INACTIVE";

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="font-medium text-gray-800 text-lg mb-4">Personal Info</h1>
      <table className="w-full table-fixed border border-gray-300 text-sm">
        <tbody>
          <tr className="border-gray-300">
            <td className="border font-medium px-4 py-2">RANK</td>
            <td className="border text-green-600 px-4 py-2">{rank}</td>
          </tr>
          <tr className="border-gray-300">
            <td className="border font-medium px-4 py-2">FCID</td>
            <td className="border text-red-600 px-4 py-2">{fcid}</td>
          </tr>
          <tr className="border-gray-300">
            <td className="border font-medium px-4 py-2">Name</td>
            <td className="border text-red-600 px-4 py-2">{name}</td>
          </tr>
          <tr className="border-gray-300">
            <td className="border font-medium px-4 py-2">Sponsor ID</td>
            <td className="border text-blue-600 px-4 py-2">{sponsorID}</td>
          </tr>
          <tr>
            <td className="border font-medium px-4 py-2">Status</td>
            <td className="border text-green-600 px-4 py-2">{status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonalDetails;
