// Redux/Slice/authReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
  user: null,
  isAuthenticated: false,
  cartLength: 0,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.cartLength = action.payload.cartLength
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
    },

   
    incrementCartLength: (state) => {
      state.cartLength += 1;
    },
    decrementCartLength: (state) => {
      state.cartLength -= 1;
    },
  },
});

export const { loginSuccess, logout , incrementCartLength, decrementCartLength} = authReducer.actions;
export default authReducer.reducer;
