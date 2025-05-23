import React, { useEffect, useState } from 'react';
import { getMyDownlineTotalMonthAmount } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const MonthlySaleReport = () => {
    const [totalAmount, setTotalMonthAmount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await getMyDownlineTotalMonthAmount();
            setTotalMonthAmount(response?.data?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div className="p-4 bg-white rounded-lg">
                <h2 className="font-medium text-gray-800 text-lg mb-4">Monthly Sale Report</h2>

                {(
                    <table className="border border-gray-300 w-full text-sm">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Month</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalAmount.length > 0 ? (
                                totalAmount.map(({ month, totalMonthlyOrderAmount }) => (
                                    <tr key={month}>
                                        <td className="border border-gray-300 px-4 py-2">{month}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {totalMonthlyOrderAmount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center border border-gray-300 px-4 py-2 text-gray-500">
                                        Data not found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {isLoading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </>
    );
};

export default MonthlySaleReport;
