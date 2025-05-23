import React, { useEffect, useState } from 'react'
import TopCard from './TopCard'
import TableComponent from '../../../Component/TableComponent'
import { licUserList } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const LicActivatation = () => {
  const headers = ['#', 'FCID', 'Name', 'DOJ', 'Rank','Mobile'];
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const getLicUserData = async () => {
    setLoading(true)
      try {
        const response = await licUserList();
          console.log(response?.data);
          setUser(response?.data)
      } catch (err) {
        console.error("Failed to fetch updated user profile", err);
      }finally{
        setLoading(false)
      }
    };
  
    useEffect(() => {
      getLicUserData();
    }, []);

  return (
    <div className='flex flex-col gap-5'>
      <TopCard />
      <TableComponent
        title={"License Activation"}
        headers={headers}
        data={user}
        searchKey="Name"
        searchKeys={["name",]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{index + 1}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.username}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.name}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{new Date(item?.createdAt).toDateString()}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.selectRank}</td>
            <td className="border-r border-b border-text-white/40 p-2 md:p-3">{item?.mobile}</td>
          </>
        )}
      />

      {loading && (
        <div>
          <PageLoader/>
        </div>
      )}
    </div>
  )
}

export default LicActivatation