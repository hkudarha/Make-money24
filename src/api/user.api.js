import { Axios } from "../constants/mainContent";

const userApi = "/user";;

export const userLogin = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/userLogin`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};

export const userForgotPassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/forgetpassword`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};

export const userChangePassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/regeneratepassword`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};

export const userNewPassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/changePassword`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};
export const userRegister = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/auth/register`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};
export const profileUpdate = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/addkyc`, payload);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};
export const getProfile = async () => {
  try {
    const response = await Axios.get(`${userApi}/userDetails`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await Axios.get(`${userApi}/products/all-products`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleProductDetails = async (id) => {
  try {
    const response = await Axios.get(`${userApi}/products/productbyId/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addtoCart = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/products/addToCart`, payload);
    return response?.data;
  } catch (error) {
    return error?.response?.data
    console.log(error);
  }
};


export const removeToProducts = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/cart/remove`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCarts = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/cart/getCarts/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/cart/removeProduct`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/payment/orders`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await Axios.post(`${userApi}/payment/verify`, paymentData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const walletPayment = async (paymentData) => {
  try {
    const response = await Axios.post(`${userApi}/payment/e-pin-payment`, paymentData);
    return response.data;
  } catch (error) {
    return error.response.data;
    console.log(error);
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/myOrders/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/address/add`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getAddress = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/addresses/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deteleAddress = async (addressId) => {
  try {
    const response = await Axios.delete(`${userApi}/address/delete/${addressId}`);
    return response;

  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (addressId, data) => {
  try {
    const response = await Axios.put(`${userApi}/address/update/${addressId}`, data);
    return response;

  } catch (error) {
    console.log(error);
  }
};

export const getDashboradData = async () => {
  try {
    const response = await Axios.get(`${userApi}/dashboard`,);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDownlineMember = async () => {
  try {
    const response = await Axios.get(`${userApi}/get-my-downline`,);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestWithdrawal = async (data) => {
  try {
    const response = await Axios.post(`${origin}/user/withdrawal-request`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestEpinBalance = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/add-fund-requested`, data);
    return response.data;
  } catch (error) {
     return error.response.data
    console.log(error);
  }
};

export const getEpinBalance = async () => {
  try {
    const response = await Axios.get(`${userApi}/myTransaction`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export async function createDistributor(payload) {
  try {
    const response = await Axios.post(`${userApi}/userRegistration`, payload);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}


export async function enquiryForm(payload) {
  try {
    const response = await Axios.post(`${userApi}/contact-us`, payload);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}

export async function getNews(payload) {
  try {
    const response = await Axios.get(`${userApi}/get-news`, payload);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}
export async function getOrderInvoice(id) {
  try {
    const response = await Axios.get(`${userApi}/get-order-invoice/${id}`);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}

export async function requestRankUpdate(rank) {
  try {
    const response = await Axios.put(`${userApi}/rank-update-request`, rank);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}

export const getMyDownlineOrders = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/get-downline-summary`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMyDownlineTotalMonthAmount = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/get-month-summary`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export async function userenquiryForm(payload) {
  try {
    const response = await Axios.post(`${userApi}/support`, payload);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}
export async function userenquiryList(payload) {
  try {
    const response = await Axios.get(`${userApi}/support-list`, payload);
    return response?.data;
  } catch (error) {
    return error.response.data
  }
}
export const licUserList = async () => {
  try {
    const response = await Axios.get(`${userApi}/get-license-user`);
    return response.data;
  } catch (error) {
    return error.response.data
    console.log(error);
  }
};