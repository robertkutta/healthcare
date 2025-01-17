import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(() => {
        return localStorage.getItem("loggedIn") === "true";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(localStorage.getItem("loggedIn") === "true");
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const value = { loggedIn, setLoggedIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
