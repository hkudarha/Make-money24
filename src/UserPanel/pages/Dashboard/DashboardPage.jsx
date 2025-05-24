import React, { useEffect, useState } from 'react';
import HeaderCard from './HeaderCard';
import Footer1 from '../../../Component/Footer1';
import NewMembers from './NewMembers';
import OrderHistoryReport from './OrderHistoryReport';
import { getDashboradData, getProfile } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';
import PersonalDetails from './PersonalDetails';
import MonthlySaleReport from './MonthlySaleReport';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../Redux/Reducer/authReducer';
import RankProgress from './RankProgress';

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboradData();
      setDashboard(response?.data?.data || {});
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dispatch = useDispatch()
  useEffect(() => {
    const getUserData = async () => {
      const data = await getProfile();
      if (data) {
        dispatch(loginSuccess({
          token: data?.data?.token,
          role: data?.data?.role,
          user: data?.data?.data,
                    cartLength:data?.data?.data?.cartLength || 0

        }));
        setUserData(data?.data?.data)
      }
    }
    getUserData()
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* <PersonalDetails /> */}
        {/* <MonthlySaleReport /> */}
      </div>
      <HeaderCard data={dashboard} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <OrderHistoryReport />
        </div>
        <NewMembers members={dashboard} />
      </div>
      <div>
        <RankProgress data={userdata} />
      </div>

      {loading && (
        <div>
          <PageLoader />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
