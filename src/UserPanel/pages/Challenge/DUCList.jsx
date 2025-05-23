import { useEffect, useState } from "react";
import PageLoader from "../../../Component/PageLoader";

const DUCList = () => {
    const [loading, setLoading] = useState(false);

    const dummyData = [

    ];

    return (
        <>
            <div className="flex flex-col gap-5">
                <h2 className="text-base font-medium text-black/80">DU Challenge Request</h2>

                <div className="bg-white p-3 rounded-lg text-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr>
                                    <th className="p-2 whitespace-nowrap"> UserID</th>
                                    <th className="p-2 whitespace-nowrap">Start Date</th>
                                    <th className="p-2 whitespace-nowrap">End Date</th>
                                    <th className="p-2 whitespace-nowrap">Days</th>
                                    <th className="p-2 whitespace-nowrap">Total Challenge Amount</th>
                                    <th className="p-2 whitespace-nowrap">Achieved Amount</th>
                                    <th className="p-2 whitespace-nowrap">Remaining</th>
                                    <th className="p-2 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2 py-3 whitespace-nowrap">{item.startDate}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.startDate}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.endDate}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.days}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">₹ {item.totalChallengeAmount.toLocaleString()}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">₹ {item.achievedAmount.toLocaleString()}</td>
                                        <td
                                            className={`p-2 py-3 whitespace-nowrap font-semibold ${item.remaining < 0 ? "text-red-500" : "text-green-500"
                                                }`}
                                        >
                                            ₹ {item.remaining.toLocaleString()}
                                        </td>
                                        <td className="p-2 py-3 whitespace-nowrap">₹ {item.achievedAmount.toLocaleString()}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </>
    );
};

export default DUCList