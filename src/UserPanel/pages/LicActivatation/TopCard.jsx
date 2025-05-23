import React from 'react';
import { useSelector } from 'react-redux';

const TopCard = () => {
  const user = useSelector((state) => state.auth);
  const FCID = user?.user?.username;
  const name = user?.user?.name;
  const licenseCount = user?.user?.licenseCount

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div
        className={`px-4 py-3  relative cursor-pointer overflow-hidden text-white bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 border-2 border-white rounded-xl flex gap-2 justify-between items-center`}
      >
        <div className="space-y-2">
          <h4 className="text-lg font-bold">
            FCID -  {FCID}
          </h4>
          <h3 className="text-xl font-light">
            {name}
          </h3>
        </div>
        <div>
          <div>
            <img src={'https://img.icons8.com/3d-fluency/94/guest-male--v4.png'} alt={''} className="w-20 h-20" />
          </div>
        </div>
        <div className='w-32 h-32 bg-white/10 rounded-full absolute top-10 left-5 '></div>
        <div className='w-32 h-32 bg-white/10 rounded-full absolute bottom-10 right-5 '></div>
      </div>
      <div
        className={`px-4 py-3 relative cursor-pointer overflow-hidden text-white bg-gradient-to-r from-pink-400 via-rose-400 to-red-300 border-2 border-white rounded-xl flex gap-2 justify-between items-center`}
      >
        <div className="space-y-2">
          <p>Total License </p>
          <h4 className="text-lg font-medium">
            FI - {licenseCount?.FI || 0} License
          </h4>
          <h4 className="text-lg font-medium">
            FR - {licenseCount?.FR || 0} License
          </h4>
        </div>
        <div>
          <div>
            <img src={'https://img.icons8.com/3d-fluency/94/key-exchange.png'} alt={''} className="w-20 h-20" />
          </div>
        </div>

        <div className='w-32 h-32 bg-white/10 rounded-full absolute top-10 left-5 '></div>
        <div className='w-32 h-32 bg-white/10 rounded-full absolute bottom-10 right-5 '></div>
      </div>

    </div>
  );
};

export default TopCard;