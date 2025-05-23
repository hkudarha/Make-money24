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
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState('');
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

    const handleVerifyOtp = async () => {
        if (!otp) {
            setValidationError((prev) => ({ ...prev, otp: 'Please enter the OTP.' }));
            return;
        }

        try {
            const result = await verifyOtp(payload.email, otp); // ✅ Verifying with email instead
            if (result.success) {
                setOtpVerified(true);
                Swal.fire('Verified', 'OTP verified successfully', 'success');
            } else {
                Swal.fire('Invalid OTP', result.message || 'OTP verification failed', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong while verifying OTP', 'error');
        }
    };

    const handleRegister = async () => {
        const errors = {};
        if (!payload.username) errors.username = 'Please enter a username.';
        if (!payload.email) errors.email = 'Please enter your email.';
        if (!payload.password) errors.password = 'Please enter your password.';
        if (!otp) errors.otp = 'Please enter the OTP.';

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        if (!otpVerified) {
            Swal.fire('Error', 'Please verify OTP before registering.', 'error');
            return;
        }

        try {
            setSubmitting(true);
            const res = await userRegister(payload);
            if (res.success) {
                dispatch(loginSuccess({
                    token: res.token,
                    role: res.role,
                    user: res.data,
                }));
                Swal.fire('Registered', res.message || 'Registration successful', 'success');
                navigate('/user');
            } else {
                Swal.fire('Error', res.message || 'Registration failed', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            className='w-full h-screen bg-bg-color1'
        >
            <div className='w-full h-full flex items-center justify-center p-4'>
                <div className='max-w-xl p-5 flex flex-col gap-5 rounded-xl border bg-[#ffffff6e] backdrop-blur-md'>
                    <div className='flex items-center justify-center'>
                        <img src={MainContent.logo1} className='h-20 object-contain mx-[8rem]' alt='Logo' />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <InputField name='username' label='Username' value={payload.username} onChange={handleChange} />
                        {validationError.username && <p className='text-red-500 text-sm'>{validationError.username}</p>}

                        <InputField name='email' label='Email' value={payload.email} onChange={handleChange} />
                        {validationError.email && <p className='text-red-500 text-sm'>{validationError.email}</p>}

                        <InputField name='phone' label='Phone (Optional)' value={payload.phone} onChange={handleChange} />

                        <div className='flex flex-row items-center justify-center gap-2'>
                            <InputField
                                name='otp'
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button
                                title='Verify OTP'
                                className='bg-green-600 text-white px-3 p-2 rounded'
                                onClick={handleVerifyOtp}
                                disabled={submitting || !otp}
                            />
                        </div>
                        {validationError.otp && <p className='text-red-500 text-sm'>{validationError.otp}</p>}

                        <InputField name='password' type='password' label='Password' value={payload.password} onChange={handleChange} />
                        {validationError.password && <p className='text-red-500 text-sm'>{validationError.password}</p>}

                        <InputField name='referral' label='Referral Code (Optional)' value={payload.referral} onChange={handleChange} />

                        <Button
                            title={submitting ? 'Registering...' : 'Register'}
                            className='bg-bg-color px-4 py-3 text-sm rounded-md text-white w-full disabled:opacity-50'
                            onClick={handleRegister}
                            disabled={submitting}
                        />

                        <Link to='/login' className='text-sm underline text-blue-500'>Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
