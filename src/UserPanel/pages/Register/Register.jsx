import React, { useState } from 'react';
import loginbg from '../../../assets/images/bg.png';
import { MainContent } from '../../../constants/mainContent';
import Button from '../../../Component/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from '../../../Component/InputField';
import Swal from 'sweetalert2';
// import { userRegister, verifyOtp } from '../../../api/user.api';
import { loginSuccess } from '../../../Redux/Reducer/authReducer';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [validationError, setValidationError] = useState({});
    const [otp, setOtp] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);

    const [payload, setPayload] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        referral: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
        setValidationError((prev) => ({ ...prev, [name]: '' }));
    };

    const handleRegister = async () => {
        const errors = {};
        if (!payload.username) errors.username = 'Please enter a username.';
        if (!payload.email) errors.email = 'Please enter your email.';
        if (!payload.password) errors.password = 'Please enter your password.';

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        try {
            setSubmitting(true);
            const res = await userRegister(payload); // ✅ should trigger OTP sending
            if (res.success) {
                Swal.fire('OTP Sent', 'Please check your email for the OTP.', 'info');
                setShowOtpModal(true);
            } else {
                Swal.fire('Error', res.message || 'Registration failed', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setValidationError((prev) => ({ ...prev, otp: 'Please enter the OTP.' }));
            return;
        }

        try {
            const result = await verifyOtp(payload.email, otp);
            if (result.success) {
                dispatch(loginSuccess({
                    token: result.token,
                    role: result.role,
                    user: result.data,
                }));
                Swal.fire('Success', 'OTP verified successfully!', 'success');
                navigate('/user');
            } else {
                Swal.fire('Invalid OTP', result.message || 'OTP verification failed', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong while verifying OTP', 'error');
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            className='w-full h-screen bg-bg-color1'
        >
            <div className='w-full h-full flex items-center justify-center p-4'>
                <div className='max-w-xl p-5 flex flex-col rounded-xl border bg-[#ffffff6e] backdrop-blur-md'>
                    <div className='flex items-center justify-center'>
                        <img src={MainContent.logo1} className='h-20 object-contain mx-[8rem]' alt='Logo' />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <InputField name='username' label='Username' value={payload.username} onChange={handleChange} />
                        {validationError.username && <p className='text-red-500 text-sm'>{validationError.username}</p>}

                        <InputField name='email' label='Email' value={payload.email} onChange={handleChange} />
                        {validationError.email && <p className='text-red-500 text-sm'>{validationError.email}</p>}

                        <InputField name='phone' label='Phone (Optional)' value={payload.phone} onChange={handleChange} />

                        <InputField name='password' type='password' label='Password' value={payload.password} onChange={handleChange} />
                        {validationError.password && <p className='text-red-500 text-sm'>{validationError.password}</p>}

                        <InputField name='referral' label='Referral Code (Optional)' value={payload.referral} onChange={handleChange} />

                        <Button
                            title={submitting ? 'Registering...' : 'Register'}
                            className='bg-bg-color px-4 py-3 text-sm rounded-md text-white w-full text-center disabled:opacity-50'
                            onClick={handleRegister}
                            disabled={submitting}
                        />

                        <Link to='/login' className='text-sm underline text-blue-500'>Already have an account? Login</Link>
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4 text-center">Enter OTP</h2>
                        <InputField
                            name='otp'
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {validationError.otp && <p className='text-red-500 text-sm'>{validationError.otp}</p>}

                        <div className="flex justify-between mt-4">
                            <Button
                                title="Verify OTP"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                onClick={handleVerifyOtp}
                                disabled={submitting || !otp}
                            />
                            <Button
                                title="Cancel"
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setShowOtpModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
