/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <LoadingSpinner></LoadingSpinner>
    if (user) return children
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default PrivateRoute;