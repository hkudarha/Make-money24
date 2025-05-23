import React, { useState } from 'react';
import loginbg from '../../../assets/images/bg.png';
import { MainContent } from '../../../constants/mainContent';
import Button from '../../../Component/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Routers } from '../../../constants/Routes';
import InputField from '../../../Component/InputField';
import Swal from 'sweetalert2';
import { userLogin } from '../../../api/user.api';
import { loginSuccess } from '../../../Redux/Reducer/authReducer';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [validationError, setValidationError] = useState({});
    const [payload, setPayload] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPayload({ ...payload, [name]: type === "checkbox" ? checked : value });
        setValidationError((prev) => ({ ...prev, [name]: "" }));
    };

    const navigateToHomePage = () => {
        navigate(Routers.UserPanel);
    };

    const handleSubmit = async () => {
        let errors = {};
        if (!payload.username) errors.username = "Please enter your User ID.";
        if (!payload.password) errors.password = "Please enter your password.";

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        try {
            setSubmitting(true);
            const data = await userLogin(payload);
            console.log("Login response:", data);

            if (data?.success) {
                dispatch(loginSuccess({
                    token: data?.token,
                    role: data?.role,
                    user: data?.data,
                              cartLength:data?.data?.data?.cartLength || 0

                }));

                Swal.fire({
                    icon: 'success',
                    title: data?.message || 'Login Successfully',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    navigateToHomePage();
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data?.message || 'Something went wrong.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            setValidationError({ form: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginbg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            className='w-full h-screen bg-bg-color1'
        >
            <div className='w-full h-full flex items-center justify-between'>
                <div className='w-full h-full flex items-center justify-center p-4'>
                    <div className='max-w-xl h-fit p-5 flex flex-col gap-5 rounded-xl border bg-[#ffffff6e] backdrop-blur-md'>
                        <div className='flex items-center justify-center'>
                            <img src={MainContent.logo1} className='h-20 object-contain mx-[8rem]' alt="Logo" />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <InputField
                                type="text"
                                name="username"
                                label="User ID"
                                value={payload.username}
                                onChange={handleChange}
                            />
                            {validationError.username && (
                                <p className="text-red-500 text-sm mt-1">{validationError.username}</p>
                            )}

                            <InputField
                                type="password"
                                name="password"
                                label="Password"
                                value={payload.password}
                                onChange={handleChange}
                            />
                            {validationError.password && (
                                <p className="text-red-500 text-sm mt-1">{validationError.password}</p>
                            )}

                            {validationError.form && (
                                <p className="text-red-500 text-sm mt-1">{validationError.form}</p>
                            )}

                            <Button
                                title={submitting ? "Logging in..." : "Login"}
                                disabled={submitting}
                                className="bg-bg-color px-4 py-3 text-sm  rounded-md text-white text-center w-full disabled:opacity-50"
                                onClick={handleSubmit}
                            />
                            <div className='flex flex-row items-center justify-between'>
                            <Link to={Routers.forgotPassword} className='text-sm underline text-blue-500'>Forget Password</Link>
                            <Link to='/register' className='text-sm underline text-blue-500'>Register</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
