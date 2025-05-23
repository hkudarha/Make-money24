import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Address from "./Address";
import { getProfile, placeOrder, verifyPayment, getCarts, walletPayment } from "../api/user.api";
import PageLoader from "../Component/PageLoader";
import { Routers } from "../constants/Routes";
import { loginSuccess } from "../Redux/Reducer/authReducer";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("Wallet");
    const location = useLocation();
    const navigate = useNavigate();
    const { finalTotalAmonut } = location.state || { coupon: null, cartItems: [] };
    const totalAmount = finalTotalAmonut || 0;
    const defaultDeliveryCharge = 70;
    const user = useSelector((state) => state.auth);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const deliveryCharge = paymentMethod === "Pickup" ? 0 : defaultDeliveryCharge;
    const [userBalance, setUserBalance] = useState(0);
    const [appliedBalance, setAppliedBalance] = useState(0);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [finalTotal, setFinalTotal] = useState(totalAmount + deliveryCharge);
    const [remainingBalance, setRemainingBalance] = useState(0);
    const dispatch = useDispatch()
    const generateInvoicePath = (id) => Routers.Invoice.replace(':id', id);

    const fetchBalance = async () => {
        try {
            const response = await getProfile();
            if (response) {
                dispatch(loginSuccess({
                    token: response?.data?.token,
                    role: response?.data?.role,
                    user: response?.data?.data,
                }));
            }
            const balance = response?.data?.data?.investment || 0;
            setUserBalance(balance);

            // console.log(response?.data?.data?.investment);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    useEffect(() => {
        const newFinalTotal = (totalAmount + deliveryCharge) - appliedBalance;
        const newRemainingBalance = userBalance - appliedBalance;
        setFinalTotal(newFinalTotal);
        setRemainingBalance(newRemainingBalance);
    }, [paymentMethod, selectedAddress, totalAmount, deliveryCharge, appliedBalance, userBalance]);

    const handleApplyBalance = () => {
        if (userBalance >= 100) {
            const usableBalance = userBalance - 100;
            const amountToDeduct = Math.min(usableBalance, totalAmount + deliveryCharge);
            setAppliedBalance(amountToDeduct);
            setIsApplied(true);
        } else {
            Swal.fire({
                title: "Insufficient Balance!",
                text: "You must have at least ₹100 to apply balance.",
                icon: "warning",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
            });
        }
    };

    const handlePayment = async () => {
        if (!selectedAddress) {
            Swal.fire({
                title: "Address Required!",
                text: "Please select an address to proceed.",
                icon: "warning",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        try {
            setLoading(true)
            const orderPayload = {
                userId: user?.user?._id,
                paymentMethod,
                address: selectedAddress,
            };

            const orderData = await placeOrder(orderPayload);
            if (paymentMethod === "Razorpay") {

                if (orderData?.data?.razorpayOrder?.id) {

                    const options = {
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                        amount: orderData?.data?.amount * 100,
                        order_id: orderData?.data?.razorpayOrder?.id,
                        name: "Aetheric Dynamics Mkt Private Limited",
                        description: "Complete your order",
                        handler: async function (response) {
                            const paymentData = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: user.user._id,
                                address: selectedAddress,
                                paymentMethod
                            };
                            const verification = await verifyPayment(paymentData);
                            if (verification.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Payment Successful!",
                                    text: "Your order has been placed successfully.",
                                });
                                await getCarts(user.user._id);
                                navigate(generateInvoicePath(verification?.data?._id));
                                await fetchBalance();
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Payment Failed!",
                                    text: "There was an issue verifying your payment. Please contact support.",
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                });
                            }
                        },
                        prefill: {
                            name: user?.user?.name || "",
                            email: user?.user?.email || "",
                        },
                        theme: { color: "#3399cc" },
                    };

                    const razorpay = new window.Razorpay(options);
                    razorpay.open();
                }
            } else if (paymentMethod === "Wallet") {
                const paymentData = {
                    userId: user.user._id,
                    address: selectedAddress,
                    paymentMethod
                };
                await fetchBalance();
                const verification = await walletPayment(paymentData);
                console.log(verification);
                if (verification.success) {
                    Swal.fire({
                        icon: "success",
                        title: verification.message || "Payment Successful!",
                        text: "Your order has been placed successfully.",
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    await getCarts(user.user._id);
                    navigate(generateInvoicePath(verification?.data?._id));
                    console.log("Calling fetchBalance before payment...");
                    await fetchBalance(); ''
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Payment Failed!",
                        text: verification.message || "There was an issue verifying your payment. Please contact support.",
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
            } else {
                Swal.fire({
                    title: "Please Select Method !",
                    text: "Please Select Method.",
                    icon: "warning",
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err?.response?.data?.message || "Something went wrong!",
            });
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pt-32 pb-20 p-5">
            <div className="w-full lg:w-2/3 border bg-white p-6 rounded-lg">
                <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
            </div>

            <div className="w-full lg:w-1/3 border h-fit bg-white p-6 rounded-lg lg:sticky lg:top-5">
                <h2 className="text-lg font-bold mb-4">Your Order</h2>

                <div className="py-4 border-b">
                    <div className="flex justify-between">
                        <span>My Balance</span>
                        <span>₹{userBalance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">


                    {["Razorpay", "Wallet"].map(method => (
                        <label key={method} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                checked={method == 'Wallet'}
                                disabled={method == 'Razorpay' ? true : false}
                                onChange={() => setPaymentMethod(method)}
                            />
                            {method === "Razorpay" ? "Online" : method}
                        </label>
                    ))}
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full mt-4 px-5 py-2 btn-primary text-white rounded-md"
                >
                    Place Order
                </button>
            </div>

            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

export default Checkout;
