import React, { useEffect, useState } from 'react';
import WalletComponent from './WalletComponent';
import { getDashboradData } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const WalletPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await getDashboradData();
      setDashboard(response?.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <WalletComponent data={dashboard} />
      {isLoading && (
        <div>
          <PageLoader />
        </div>
      )}
    </div>
  );
};

export default WalletPage;
