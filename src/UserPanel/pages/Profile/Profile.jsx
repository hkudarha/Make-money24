import React, { useEffect, useState } from "react";
import InputField from "../../../Component/InputField";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../Component/PageLoader";
import Swal from "sweetalert2";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { getProfile, profileUpdate } from "../../../api/user.api";
import { loginSuccess } from "../../../Redux/Reducer/authReducer";
import SelectComponent from "../../../Component/SelectComponent";

const ProfileForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userProfile: null,
    panImage: null,
    aadharFront: null,
    aadharBack: null,
    fatherName: "",
    profession: "",
    email: "",
    maritalStatus: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineeDOB: "",
    nomineeAadhar: "",
    bankName: "",
    branchName: "",
    aadharNo: "",
  });

  const user = useSelector((state) => state.auth);
  const userDetails = user?.user

  useEffect(() => {
    if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        distributorName: (userDetails?.name || userDetails?.generalDetails?.distributorName) ?? "",
        distributorID: userDetails?.username ?? "",
        email: userDetails?.email ?? "",
        gender: userDetails?.gender ?? "",
        dob: userDetails?.dob ?? "",
        mobile: userDetails?.mobile ?? "",
        panNo: userDetails?.panNo ?? "",
        accountNo: userDetails?.accountNo ?? "",
        ifscCode: userDetails?.ifscCode ?? "",
        sponserID: userDetails?.referrCode ?? "",
        sponserName: userDetails?.referredBy?.name ?? "",
        doj: userDetails?.createdAt ? new Date(userDetails.createdAt).toISOString().split("T")[0] : "",
        fatherName: userDetails?.generalDetails?.fatherName ?? "",
        profession: userDetails?.generalDetails?.profession ?? "",
        maritalStatus: userDetails?.generalDetails?.maritalStatus ?? "",
        address: userDetails?.generalDetails?.address ?? "",
        city: userDetails?.generalDetails?.city ?? "",
        district: userDetails?.generalDetails?.district ?? "",
        state: userDetails?.generalDetails?.state ?? "",
        pincode: userDetails?.generalDetails?.pincode ?? "",
        nomineeAadhar: userDetails?.generalDetails?.nomineeAadhar ?? "",
        nomineeDOB: userDetails?.generalDetails?.nomineeDOB ? new Date(userDetails.generalDetails.nomineeDOB).toISOString().split("T")[0] : "",
        nomineeName: userDetails?.generalDetails?.nomineeName ?? "",
        nomineeRelation: userDetails?.generalDetails?.nomineeRelation ?? "",
        bankName: userDetails?.generalDetails?.bankName ?? "",
        branchName: userDetails?.generalDetails?.branchName ?? "",
        aadharFront: userDetails?.generalDetails?.aadharFront ?? "",
        aadharBack: userDetails?.generalDetails?.aadharBack ?? "",
        panImage: userDetails?.generalDetails?.panImage ?? "",
        userProfile: userDetails?.generalDetails?.userProfile ?? "",
        aadharNo: userDetails?.generalDetails?.aadharNo ?? "",
      }));

    }
  }, [userDetails]);

  const disabledFields = [
    "sponserID",
    "sponserName",
    "distributorID",
    "distributorName",
    "doj",
    "gender",
    "dob",
    "mobile",
    "email",
    "panNo",
    "accountNo",
    "ifscCode",
  ];

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      try {
        const base64 = await convertToBase64(files[0]);
        setFormData({ ...formData, [name]: base64 });
      } catch (err) {
        console.error("Error converting to base64:", err);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const getUserData = async () => {
    try {
      const data = await getProfile();
      if (data) {
        console.log(data)
        dispatch(loginSuccess({
          token: data?.data?.token,
          role: data?.data?.role,
          user: data?.data?.data,
          cartLength: data?.data?.data?.cartLength
        }));
      }
    } catch (err) {
      console.error("Failed to fetch updated user profile", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const optionalFields = [
      "nomineeName",
      "nomineeRelation",
      "nomineeDOB",
      "nomineeAadhar"
    ];

    const requiredFields = Object.keys(formData).filter(
      (key) => !optionalFields.includes(key)
    );

    // const emptyFields = requiredFields.filter(
    //   (key) => formData[key] === "" || formData[key] === null
    // );

    // if (emptyFields.length > 0) {
    //   Swal.fire({
    //     toast: true,
    //     icon: 'error',
    //     title: 'Please fill all required fields before submitting.',
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     customClass: {
    //       popup: 'swal2-toast'
    //     }
    //   });
    //   return;
    // }
    console.log("Form submitted:", formData);

    try {
      setLoading(true);
      const response = await profileUpdate(formData);
      console.log(response);
      console.log(response?.message);
      if (response?.success) {
        dispatch(loginSuccess({
          token: response?.token,
          role: response?.role,
          user: response?.data,
          // cartLength: data?.data?.data?.cartLength
        }));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.message || "user verify successfully",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setFormData({
          userProfile: null,
          panImage: null,
          aadharFront: null,
          aadharBack: null,
          fatherName: "",
          profession: "",
          maritalStatus: "",
          address: "",
          city: "",
          district: "",
          state: "",
          pincode: "",
          nomineeName: "",
          nomineeRelation: "",
          nomineeDOB: "",
          nomineeAadhar: "",
          bankName: "",
          branchName: "",
          aadharNo: ""
        });
        await getUserData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Something went wrong",
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
      });
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="">
      <form className="space-y-6 p-4 bg-white shadow rounded-xl" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Image Upload</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4">
          {["userProfile", "panImage", "aadharFront", "aadharBack"].map((field) => (
            <div key={field} className="border p-2 rounded-md flex flex-col gap-2">
              <label className="block font-medium text-sm capitalize">
                {field.replace(/([A-Z])/g, " $1")}:
              </label>

              {formData[field] ? (
                <img
                  src={
                    typeof formData[field] === "string"
                      ? formData[field]
                      : URL.createObjectURL(formData[field])
                  }
                  alt={field}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <>
                  <InputField
                    type="file"
                    name={field}
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-500">Max: 250KB | jpg/jpeg/png</p>
                </>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            ["sponserID", "Sponsor ID"],
            ["sponserName", "Sponsor Name"],
            ["distributorID", "Distributor ID"],
            ["distributorName", "Distributor Name"],
            ["doj", "Date of Joining"],
            ["gender", "Gender"],
            ["fatherName", "Father's Name"],
            ["dob", "Date of Birth"],
            ["mobile", "Mobile Number"],
            ["profession", "Profession"],
            ["email", "Email ID"],
            ["aadharNo", "Aadhar No"],
          ].map(([name, label]) => (
            <InputField
              label={label}
              key={name}
              type="text"
              name={name}
              value={formData[name] || ""}
              placeholder={label}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              // disabled={formData[name] !== undefined && formData[name] !== ""}
              className="border p-2 rounded w-full"
            />
          ))}

          <SelectComponent
              label="Select Marital Status *"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              placeholder={'--Select Marital Status--'}
              options={[
                { value: "Married", label: "Married" },
                { value: "Unmarried", label: "Unmarried" },
              ]}
              // error={formErrors.gender}
            />  
        </div>

        <h2 className="text-xl font-bold">Permanent Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {["address", "city", "state", "pincode"].map((field) => (

            <InputField
              key={field}
              type="text"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field] || ""}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              disabled={disabledFields.includes(field)}
              // disabled={formData[field] !== undefined && formData[field] !== ""}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">Nominee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            ["nomineeName", "Nominee Name"],
            ["nomineeRelation", "Nominee Relation"],
            ["nomineeDOB", "Nominee DOB", "date"],
            ["nomineeAadhar", "Nominee Aadhar"],
          ].map(([name, label, type]) => (
            <InputField
              label={label}
              key={name}
              type={type || "text"}
              name={name}
              value={formData[name] || ""}
              placeholder={label}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              // disabled={formData[field] !== undefined && formData[field] !== ""}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            ["bankName", "Bank Name"],
            ["branchName", "Branch Name"],
            ["accountNo", "Account No"],
            ["ifscCode", "IFSC Code"]
          ].map(([name, label]) => (
            <InputField
              label={label}
              key={name}
              type="text"
              name={name}
              value={formData[name] || ""}
              placeholder={label}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              // disabled={formData[field] !== undefined && formData[field] !== ""}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">PAN Details</h2>
        <InputField
          type="text"
          name="panNo"
          value={formData.panNo || ""}
          placeholder="PAN Number"
          onChange={handleChange}
          disabled={formData.panNo}
          // disabled={formData.panNo !== undefined && formData.panNo !== ""}
          className="border p-2 rounded w-full"
        />

        {!userDetails.status && (
          <button
            type="submit"
            className="bg-bg-color text-white px-4 py-2 rounded mt-6"
          >
            Save Changes
          </button>
        )}

        {/* <button
          type="submit"
          className="bg-bg-color text-white px-4 py-2 rounded mt-6"
        >
          Save Changes
        </button> */}

      </form>

      {loading && (
        <PageLoader />
      )}
    </div>
  );
};

export default ProfileForm;
