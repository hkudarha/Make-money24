import React, { useState } from 'react';
import { userenquiryForm } from '../../../api/user.api';
import Swal from 'sweetalert2';
import PageLoader from '../../../Component/PageLoader';

const SupportForm = () => {
    const [loading, setLoading] = useState()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        issueType: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log('Form submitted:', formData);
        try {
            const response = await userenquiryForm(formData)
            console.log(response);
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: response?.message || 'Support request submitted successfully',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                setFormData({
                    name: '',
                    email: '',
                    number: '',
                    issueType: '',
                    message: ''
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response?.message || 'Something went wrong.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }

        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow-md ">
                <h2 className="text-xl font-semibold mb-4">Support Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            className="block w-full text-xs bg-bg-color1/50 border-gray-300 rounded shadow-sm border p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            className="block w-full text-xs bg-bg-color1/50 border-gray-300 rounded shadow-sm border p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="number"
                            required
                            value={formData.number}
                            onChange={handleChange}
                            placeholder='Enter your number'
                            className="block w-full text-xs bg-bg-color1/50 border-gray-300 rounded shadow-sm border p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-1">Issue Type</label>
                        <select
                            name="issueType"
                            required
                            value={formData.issueType}
                            onChange={handleChange}
                            className="block w-full text-xs bg-bg-color1/50 border-gray-300 rounded shadow-sm border p-2"
                        >
                            <option value="-- Select an issue --" disabled>Select an issue</option>
                            <option value="login Issue">Login Issue</option>
                            <option value="payment Issue">Payment Issue</option>
                            <option value="bug Report">Bug Report</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-normal text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Enter your message'
                            className="block w-full text-xs bg-bg-color1/50 border-gray-300 rounded shadow-sm border p-2"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-bg-color'}`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </>
    );
};

export default SupportForm;
