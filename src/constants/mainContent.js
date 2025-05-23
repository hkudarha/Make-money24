import logo from "../assets/images/logo.png";
import logo1 from "../assets/images/adm logo1.png";
import { store } from "../Redux/store";
import axios from "axios";

export const MainContent = {
  name: "Aetheric Dynamics",
  logo: logo,
  logo1: logo1,
};

export const backendConfig = {
  

  // base: "http://192.168.1.22:6052/api",
  // origin: "http://192.168.1.22:6052/",

  // base: "https://adm.api.smartchainstudio.in/api",
  // origin: "https://adm.api.smartchainstudio.in",
  base: "https://api.admfashion.com/api",
  origin: "https://api.admfashion.com",
};

export const backendConfig1 = {
  origin: "https://api.admfashion.com",
  // origin: "https://adm.api.smartchainstudio.in",
  // origin: "http://192.168.29.134:8000",
};


export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
