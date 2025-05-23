import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Routers } from "../constants/Routes";

const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.auth);
    const token = user?.token;
    const isAuthenticated = !!token;
    if (isAuthenticated) {
        return <Navigate to={Routers.UserPanel} replace />;
    }

    return children;
};

export default PublicRoute;
