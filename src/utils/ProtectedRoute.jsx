import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Routers } from "../constants/Routes";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth);
    const token = user?.token;
    const status = user?.user?.status;
    const location = useLocation();

    const isAuthenticated = !!token;
    const isOnProfilePage = location.pathname === Routers.Profile;

    if (!isAuthenticated) {
        return <Navigate to={Routers.Login} replace />;
    }

    if (status === false && !isOnProfilePage) {
        return <Navigate to={Routers.Profile} replace />;
    }

    return children;
};

export default ProtectedRoute;

