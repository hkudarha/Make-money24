import React from 'react';
import { Routers } from '../../../constants/Routes';
import { Link, useNavigate } from 'react-router-dom';

const HeaderCard = ({ data }) => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "My Downline",
      value: data?.totalUsers ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400",
      route: Routers.Member,
      pathstate: "All",
    },
    {
      title: "Team Downline",
      value: data?.totalDownline ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400",
      route: Routers.Downline,
    },
    {
      title: "Total Active User",
      value: data?.activeUsers ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      color: "bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300",
      route: Routers.Member,
      pathstate: "Active",
    },
    {
      title: "Total De-Active User",
      value: data?.inactiveUsers ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/money-bag.png",
      color: "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400",
      route: Routers.Member,
      pathstate: "Inactive",
    },
    {
      title: "Current Month GPG",
      value: data?.todayTotalSales > 0 ? "Paid" : "UnPaid",
      img: "https://img.icons8.com/3d-fluency/94/coin-wallet.png",
      color: "bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300",
    },
    {
      title: "My Total Sale",
      value: `₹ ${data?.totalSales?.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/cash-in-hand.png",
      color: "bg-gradient-to-r from-green-400 via-blue-400 to-black",
    },
    {
      title: "Total Today Sale",
      value: `₹ ${data?.todaySales?.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/cash-in-hand.png",
      color: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
    },
    // {
    //   title: "Cancelled Sales",
    //   value: `₹ ${data?.cancelledSales?.toFixed(2) ?? "0.00"}`,
    //   img: "https://img.icons8.com/3d-fluency/94/delete-sign.png",
    //   color: "bg-gradient-to-r from-red-500 via-rose-400 to-pink-300",
    // },
    {
      title: "Total Wallet Balance",
      value: `₹ ${data?.walletBalance?.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
      color: "bg-gradient-to-r from-pink-400 via-rose-400 to-red-300",
    },
    // {
    //   title: "Requested Wallet Balance",
    //   value: `₹ ${data?.todayWalletBalance?.toFixed(2) ?? "0.00"}`,
    //   img: "https://img.icons8.com/3d-fluency/94/money.png",
    //   color: "bg-gradient-to-r from-teal-400 via-emerald-400 to-green-300",
    // },
    {
      title: "Cancelled Wallet Balance",
      value: `₹ ${data?.cancelledWalletBalance?.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/cancel.png",
      color: "bg-gradient-to-r from-red-400 via-yellow-300 to-orange-400",
    },

    // my added
    {
      title: "My refferal code",
      value: `₹ ${data?.cancelledWalletBalance?.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/cancel.png",
      color: "bg-gradient-to-r from-red-400 via-yellow-300 to-orange-400",
    },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((stat, index) => (
        <div
          onClick={() => stat.route && navigate(stat.route, { state: stat.pathstate })}
          key={index}
          className={`px-4 py-3 relative cursor-pointer overflow-hidden text-white ${stat.color} border-2 border-white rounded-xl flex gap-2 justify-between items-center`}
        >
          <div className="space-y-2">
            <h4 className="text-lg font-bold">
              {stat.title}
            </h4>
            <h3 className="text-xl font-light">
              {stat.value}
            </h3>
          </div>
          <div>
            <div>
              <img src={stat.img} alt={stat.title} className="w-20 h-20" />
            </div>
          </div>

          <div className='w-32 h-32 bg-white/10 rounded-full absolute top-10 left-5 '></div>
          <div className='w-32 h-32 bg-white/10 rounded-full absolute bottom-10 right-5 '></div>
        </div>
      ))}
    </div>
  );
};

export default HeaderCard;