import { useState } from "react";
import PageLoader from "../../../Component/PageLoader";
import { useSelector } from "react-redux";
import { requestRankUpdate } from "../../../api/user.api";
import Swal from "sweetalert2";

const MQCList = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth);
    const currentRank = user?.user?.selectRank;
    const steps = [
        { id: 1, label: "FC" },
        { id: 2, label: "FR" },
        { id: 3, label: "BD" },
        { id: 4, label: "BR" },
        { id: 5, label: "CT" },
        { id: 6, label: "MQ" },
        { id: 7, label: "DU" },
    ];

    const getNextRank = () => {
        const currentIndex = steps.findIndex((step) => step.label === currentRank);
        return steps[currentIndex + 1]?.label || null;
    };

    const requestRankUpdateAPI = async () => {
        const nextRank = getNextRank();
        if (!nextRank) {
            console.warn("No next rank available.");
            return;
        }

        try {
            setLoading(true);
            const res = await requestRankUpdate({ rank: nextRank });
            console.log("MQ Request response:", res.data);

            if (res.data?.success) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: res.data.message || "Rank updated successfully!",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error in MQ request:", error);

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: error.response?.data?.message || "Something went wrong!",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const dummyData = [
        // Example data
        // {
        //     startDate: "8/6/2024",
        //     endDate: "12/4/2024",
        //     days: "0/120",
        //     totalChallengeAmount: 1550000,
        //     achievedAmount: 9777932.84,
        //     remaining: -8227932.84,
        // },
    ];

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex flex-wrap justify-between gap-5">
                    <h2 className="text-base font-medium text-black/80">MQ Challenge Request</h2>
                    {currentRank === "CT" && (
                        <button
                            onClick={requestRankUpdateAPI}
                            className="px-2 py-1 rounded-lg bg-red-500 text-white"
                        >
                            Request MQ Challenge
                        </button>
                    )}
                </div>

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

            {loading && <PageLoader />}
        </>
    );
};

export default MQCList;
