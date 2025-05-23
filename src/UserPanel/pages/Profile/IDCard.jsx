import React from 'react';
import { useSelector } from 'react-redux';
import defaultProfile from "../../../assets/manageMembers/defaultProfile.png";
import idcardlogo from '../../../assets/images/idcardlogo.png'

const IDCard = () => {

    const user = useSelector((state) => state.auth);
    const userDetails = user?.user
    console.log(userDetails);


    return (
        <div className='flex items-center justify-center w-full'>
            <div className="w-80 mx-auto bg-white shadow-xl rounded-xl flex flex-col gap-1 overflow-hidden border border-gray-200">
                <div className='w-full py-5 bg-bg-color flex flex-col gap-4 items-center justify-center'>
                    <div className='w-20 h-4 rounded-full bg-bg-color1'></div>
                    <div className='w-full flex items-center gap-2 justify-center px-4 text-white'>
                        <div className='bg-bg-color1 p-1 rounded-md'>
                            <img src={idcardlogo} className='h-10 object-contain' alt="" />
                        </div>
                        <h1 className='text-base font-semibold'>Aetheric Dynamics MKT Private Limited,</h1>
                    </div>
                </div>
                <div className='bg-bg-color h-1 w-full'></div>
                <div className="flex flex-col p-3 items-center">
                    <div className="w-32 h-28 rounded-lg overflow-hidden border-2 border-primary-500 mb-3">
                        <img
                            src={userDetails?.generalDetails?.userProfile || defaultProfile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-semibold">{userDetails?.name} <span className='text-xs'>({userDetails?.generalDetails?.profession})</span></h2>
                    
                       
                    
                    <p className="text-sm text-gray-400 mt-1">FCID: {userDetails?.username}</p>
                    <p className="text-sm text-gray-400 mt-1">Gender: {userDetails?.gender}</p>
                    <p className="text-sm text-gray-400 mt-1">DOB: {userDetails?.dob}</p>
                    <p className="text-sm text-gray-400 mt-1">Mobile: {userDetails?.mobile}</p>
                </div>
                <div className='w-full h-10 bg-bg-color text-white text-sm flex items-center justify-center'>
                    <p>https://admfashion.com</p>
                </div>
            </div>
        </div>
    );
};

export default IDCard;
