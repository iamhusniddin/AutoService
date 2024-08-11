import React, { createContext, useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from '../service/tokenService';
import { refreshToken } from '../service/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setUser({ loggedIn: true });
        }
    }, []);

    const login = async (accessToken, refreshToken) => {
        setTokens(accessToken, refreshToken);
        setUser({ loggedIn: true });
    };

    const logout = () => {
        removeTokens();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
