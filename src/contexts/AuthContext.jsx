import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchUserData} from "@/api/user.js";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => sessionStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token);
        } else {
            sessionStorage.removeItem("token");
        }
    }, [token]);

    function logout() {
        setToken(null);
        sessionStorage.removeItem("token")
        navigate('/login');
    }

    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => fetchUserData(token),
        enabled: !!token
    });

    const value = {token, setToken, userQuery, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
