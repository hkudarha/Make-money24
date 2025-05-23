import React, { useEffect, useState } from 'react';
import { getDownlineMember } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';
import DownlineMemberList from './DownlineMemberList';

const DownlineMembers = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const response = await getDownlineMember();
            console.log(response.data);

            setDashboard(response?.data || {});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title="Total Downline Members" member={dashboard?.data?.downline?.length || "0"} />
                    <Card title="Active Downline Members" member={dashboard?.data?.totalActive || "0"} />
                    <Card title="In Active Downline Members" member={dashboard?.data?.totalInactive || "0"} />
                </div>
            </div>
            <DownlineMemberList referralMember={dashboard} />

            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

const Card = ({ title, member }) => (
    <div className="p-4 bg-white border-2 border-white rounded-lg flex gap-2 flex-col justify-center items-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{member}</p>
    </div>
);

export default DownlineMembers;
