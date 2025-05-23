import { useEffect, useState } from "react";
import PageLoader from "../../../Component/PageLoader";
import { userenquiryList } from "../../../api/user.api";

const SupportRequestList = () => {
    const [loading, setLoading] = useState(false);
    const [supportData, setSupportData] = useState([]);

    const getEnquiryDate = async () => {
        setLoading(true);
        try {
            const response = await userenquiryList();
            console.log(response);
            setSupportData(response?.data);
        } catch (err) {
            console.error("Failed to fetch support requests:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEnquiryDate();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-5">
                <h2 className="text-base font-medium text-black/80">Support Requests</h2>

                <div className="bg-white p-3 rounded-lg text-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr>
                                    <th className="p-2 whitespace-nowrap">Name</th>
                                    <th className="p-2 whitespace-nowrap">Email</th>
                                    <th className="p-2 whitespace-nowrap">Phone Number</th>
                                    <th className="p-2 whitespace-nowrap">Issue Type</th>
                                    <th className="p-2 whitespace-nowrap">Message</th>
                                    <th className="p-2 whitespace-nowrap">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supportData?.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2 py-3 whitespace-nowrap">{item.name}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.email}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.number}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.issueType}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">{item.message}</td>
                                        <td className="p-2 py-3 whitespace-nowrap">
                                            {new Date(item.createdAt).toDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {supportData?.length === 0 && !loading && (
                            <p className="text-center text-gray-500 py-4">No support requests found.</p>
                        )}
                    </div>
                </div>
            </div>

            {loading && <PageLoader />}
        </>
    );
};

export default SupportRequestList;
