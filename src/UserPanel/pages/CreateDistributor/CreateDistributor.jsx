import React, { useState } from "react";
import InputField from "../../../Component/InputField";
import Button from "../../../Component/Button";
import SelectComponent from "../../../Component/SelectComponent";
import Swal from "sweetalert2";
import { createDistributor } from "../../../api/user.api";
import { MainContent } from "../../../constants/mainContent";
import PageLoader from "../../../Component/PageLoader";
import { useSelector } from "react-redux";
import TopCard from "../LicActivatation/TopCard";

const CreateDistributor = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        shoppingMode: "",
        selectRank: "",
        name: "",
        dob: "",
        email: "",
        mobile: "",
        gender: "",
        ifscCode: "",
        accountNo: "",
        panNo: "",
        agree: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            shoppingMode, selectRank, name, dob, email,
            mobile, gender, ifscCode, accountNo, panNo, agree
        } = formData;

        if (
            !shoppingMode || shoppingMode === "select" ||
            !selectRank || selectRank === "--Select Rank--" ||
            !name || !dob || !email || !mobile || !gender || gender === "select" ||
            !ifscCode || !accountNo || !panNo
        ) {
            return Swal.fire({
                icon: "error",
                title: "All fields are required",
                text: "Please fill out all the fields before submitting the form.",
            });
        }

        if (!agree) {
            return Swal.fire({
                icon: "error",
                title: "Terms not accepted",
                text: "Please agree to terms and conditions",
            });
        }
        try {
            setLoading(true);
            const response = await createDistributor(formData);
            console.log(response.data);
            if (response?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response?.data?.message || "Distributor created successfully",
                    // toast: true,
                    // position: 'top-end',
                    // showConfirmButton: false,
                    // timer: 3000,
                    // timerProgressBar: true,

                    html: `
        <div style="text-align: left;">
            <p><strong>Name:</strong> ${response?.data?.name || 'N/A'}</p>
            <p><strong>FCID:</strong> ${response?.data?.username || 'N/A'}</p>
            <p><strong>Password:</strong> ${response?.data?.key || 'N/A'}</p>
        </div>
    `,
                    showCloseButton: true,
                    showConfirmButton: false,
                    width: 500,

                });

                setFormData({
                    shoppingMode: "",
                    selectRank: "",
                    name: "",
                    dob: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    ifscCode: "",
                    accountNo: "",
                    panNo: "",
                    agree: false,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response?.data?.message || "Something went wrong",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.msg || "Something went wrong",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } finally {
            setLoading(false);
        }

    };

    const user = useSelector((state) => state.auth);
    const userData = user?.user;
    const shopByCompanylabels = userData?.licenseOptions?.map((item) => ({
        value: item,
        label: item,
    })) || [];

    return (
        <>

            <div className="flex flex-col gap-5">
                <TopCard />
                <div className="flex bg-white p-4 rounded-lg w-full">
                    <form
                        onSubmit={handleSubmit}
                        className=" w-full"
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">Distribution Registration</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <SelectComponent
                                label="Shopping Mode"
                                name="shoppingMode"
                                value={formData.shoppingMode}
                                onChange={handleChange}
                                placeholder={'--Select Shopping Mode--'}
                                options={[
                                    { value: "shop_by_company", label: "Shopping by Company" },
                                ]}
                            />

                            <SelectComponent
                                label="Select Rank"
                                placeholder={'--Select Rank--'}
                                name="selectRank"
                                value={formData.selectRank}
                                onChange={handleChange}
                                options={shopByCompanylabels}
                            />
                            <InputField
                                label={'Full Name'}
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />



                            <InputField
                                label={"Email"}
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />

                            <InputField
                                label={'Mobile Number'}
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                type="tel"
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                            <InputField
                                label={"Date of Birth"}
                                name="dob"
                                type="date"
                                placeholder="Date of Birth (DD/MM/YYYY)"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                            <SelectComponent
                                label="Select Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                placeholder={'--Select Gender--'}
                                options={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                ]}
                            />
                            <InputField
                                label={'Account Number'}
                                name="accountNo"
                                placeholder="Account Number"
                                value={formData.accountNo}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                            <InputField
                                label={'IFSC Code'}
                                name="ifscCode"
                                placeholder="Enter IFSC Code"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                            <InputField
                                label={'Pan Card Number'}
                                name="panNo"
                                placeholder="Pan Card Number"
                                value={formData.panNo}
                                onChange={handleChange}
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4 text-sm text-gray-600 flex items-center gap-2 mt-4">
                            <input type="checkbox" onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />
                            I agree to the <span className="font-semibold">{MainContent.name} Terms of Service</span>
                        </div>
                        <Button className="px-10 py-2 bg-bg-color rounded-md text-white" title="Submit" onClick={handleSubmit} />

                    </form>
                </div>
            </div>


            {loading && (
                <PageLoader />
            )}

        </>
    );
};

export default CreateDistributor;