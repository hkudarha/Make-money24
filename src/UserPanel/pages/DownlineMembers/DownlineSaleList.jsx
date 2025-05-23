import React, { useEffect, useState } from 'react';
import { getMyDownlineOrders } from '../../../api/user.api.js';
import { useSelector } from 'react-redux';
import PageLoader from '../../../Component/PageLoader.jsx';
import OrderTable1 from '../../../Component/OrderTable1.jsx';

const DownlineSaleList = () => {
    const user = useSelector(store => store?.auth);
    const userId = user?.user?._id;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await getMyDownlineOrders();
            console.log(response);
            
            setOrders(response?.data?.orders || []);
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
        <div className='flex flex-col gap-5'>
            <h2 className="text-base font-medium text-black/80 ">Downline Sale History</h2>
            
            <OrderTable1 data={orders} isLoading={isLoading} />
            {isLoading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};


export default DownlineSaleList