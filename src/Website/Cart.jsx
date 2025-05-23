import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addtoCart, getCarts, removeCartItem, removeToProducts } from "../api/user.api";
import PageLoader from "../Component/PageLoader";
import { backendConfig1 } from "../constants/mainContent";
import { decrementCartLength } from "../Redux/Reducer/authReducer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const userId = user?.user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCarts(userId);
        const items = response?.data?.cart?.items || [];
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  const handleQuantityChange = async (item, delta) => {
    if (!item || !item?.product || typeof item?.quantity === "undefined") {
      console.error("Invalid item:", item);
      return;
    }

    try {
      const updatedItem = {
        productId: item.product._id,
        quantity: delta,
        userId: userId,
        size: item?.size,
      };

      await addtoCart(updatedItem);

      const response = await getCarts(userId);
      const items = response?.data?.cart?.items || [];
      setCartItems(items);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (item) => {

    if (!item || !item?.product || typeof item?.quantity === "undefined") {
      console.error("Invalid item:", item);
      return;
    }

    if (item?.quantity <= 1) return;

    try {
      const updatedItem = {
        productId: item?.product?._id,
        quantity: 1,
        userId: userId,
        size: item?.size,
      };
      await removeToProducts(updatedItem);
      const response = await getCarts(userId);
      const items = response?.data?.cart?.items || [];
      setCartItems(items);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // const totalPrice = cartItems?.reduce(
  //   (total, item) => total + (item?.product?.price || 0) * (item?.quantity || 1),
  //   0
  // );

  const totalPrice = cartItems.reduce((total, item) => total + item?.subtotal, 0);

  const handleRemove = async (productId, size) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const data = {
            productId: productId,
            userId: userId,
            size: size,
          };

          await removeCartItem(data);
          const response = await getCarts(userId);
          const items = response?.data?.cart?.items || [];
          setCartItems(items);

          Swal.fire({
            title: "Removed!",
            text: "Item has been removed from your cart.",
            icon: "success",
            confirmButtonColor: "#90479B",
            confirmButtonText: "OK",
          });
          dispatch(decrementCartLength());
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to remove item. Please try again.",
            icon: "error",
            confirmButtonColor: "#90479B",
            confirmButtonText: "OK",
          });
        } finally {
          setLoading(false)
        }
      }
    });
  };

  if (!userId) {
    return (
      <div className="p-10 min-h-52 text-center flex items-center justify-center text-xl font-medium tracking-wider">
        Your cart is empty. <Link to="/login" className="text-blue-600"> Login </Link> to continue shopping.
      </div>
    );
  }

  const gstAmount = cartItems?.reduce((totalGST, item) => {
    const gstRate = item?.product?.gst || 0;
    const subtotal = item?.subtotal || 0;
    const itemGST = (subtotal * gstRate) / 100;
    return totalGST + itemGST;
  }, 0);

  const userRank = user?.user?.selectRank;
  const sponsorAmount = (!user?.user?.sponsorBonusGiven && ['FC', 'FI', 'FR', 'BD', 'BR', 'CT', 'MQ', 'DU'].includes(user?.user?.selectRank) && (user?.user?.totalSaleAmount + totalPrice) >= 8100) ? 1048 : 0;
  const shippingAmount = totalPrice < 10000 ? 235 : 824;
  const finalTotalAmonut = totalPrice + gstAmount + shippingAmount + sponsorAmount;

  return (
    <>
      <div className="px-5 lg:px-10 py-24 flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-3/4 h-fit border p-4 shadow-md rounded-lg bg-white">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Shopping Cart</h2>
          {cartItems?.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-center text-lg text-gray-600 font-semibold">Your cart is empty.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 font-semibold">Product</th>
                    <th className="py-3 font-semibold">Price</th>
                    <th className="py-3 font-semibold">Size</th>
                    <th className="py-3 font-semibold">Quantity</th>
                    <th className="py-3 font-semibold">GST</th>
                    <th className="py-3 font-semibold">GST Amount</th>
                    <th className="py-3 font-semibold">Subtotal</th>
                    <th className="py-3 font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, index) => {
                    const availableStock = item?.product?.sizes?.[item.size];
                    return (
                      <tr key={item.id} className="border-b text-sm lg:text-base">
                        <td className="flex items-center gap-3 py-3">
                          {item?.product?.images?.length > 0 && (
                            <div className="w-10 h-10 border lg:w-12 lg:h-12 rounded-lg">
                              <img src={item?.product?.defaultImage} alt={item?.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          {item?.name}
                        </td>
                        <td>₹{item?.product?.price}</td>
                        <td className="capitalize">{item?.size}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 border rounded-lg"
                              onClick={() => handleDecreaseQuantity(item)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            {item?.quantity}
                            <button
                              className="px-2 py-1 border rounded-lg"
                              onClick={() => handleQuantityChange(item, 1)}
                              disabled={item.quantity >= availableStock}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="capitalize">{item?.product?.gst} %</td>
                        <td className="capitalize">
                          ₹{(
                            ((item?.product?.price || 0) * (item?.product?.gst || 0) * (item?.quantity || 1)) /
                            100
                          ).toFixed(2)}
                        </td>
                        <td>₹{item?.subtotal.toFixed(2)}</td>
                        <td>
                          <button onClick={() => handleRemove(item?.product?._id, item?.size,)} className="text-red-500">
                            <FiTrash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:w-1/4 h-fit bg-gray-100 p-5 flex flex-col gap-2 shadow-md rounded-lg lg:sticky lg:top-5">
          <h3 className="text-lg font-medium mb-4">Cart Total</h3>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Total Amount:</p>
              <p className="text-lg font-medium">₹{totalPrice?.toFixed(2)}</p>
            </div>
          </div>
          <div className="border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">GST:</p>
              <p className="text-sm">₹ {gstAmount?.toFixed(2)}</p>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Shipping Amount  + GST </p>
              <p className="text-sm font-medium">
                ₹ {cartItems?.length === 0 ? '0.00' : shippingAmount?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <p className=" font-medium">Sponsor Bonus </p>
              <p className=" font-medium">
                ₹ {cartItems?.length === 0 ? '0.00' : sponsorAmount?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Grand Total:</p>
              <p className="text-lg font-medium">₹{cartItems?.length === 0 ? '0.00' : finalTotalAmonut?.toFixed(2)}</p>
            </div>
          </div>
          <div
            className="w-full flex items-center justify-center"
          >
            <Link
              className={`w-full px-8 mt-4 text-center py-2 rounded-lg ${cartItems?.length === 0 ? "bg-gray-500 cursor-not-allowed" : "btn-primary text-white hover:bg-bg-color"}`}
              to={cartItems?.length === 0 ? "#" : "/checkout"}
              state={cartItems?.length === 0 ? null : { cartItems, finalTotalAmonut }}
              onClick={(e) => {
                if (cartItems?.length === 0) {
                  e.preventDefault();
                }
              }}
            >
              {cartItems?.length === 0 ? "CART IS EMPTY" : "CHECKOUT"}
            </Link>
          </div>
        </div>
      </div >

      {loading && (
        <div>
          <PageLoader />
        </div>
      )}
    </>
  );
};

export default Cart;
