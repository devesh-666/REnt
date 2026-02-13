import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const saveRegisteredUser = (userData) => {
        const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const exists = registered.some(u => u.email === userData.email);
        if (!exists) {
            registered.push({ name: userData.name, email: userData.email });
            localStorage.setItem('registeredUsers', JSON.stringify(registered));
        }
    };

    const login = (userData) => {
        const nameFromEmail = userData.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        if (userData.email.includes('admin')) {
            userData = { ...userData, isAdmin: true, name: 'Admin User' };
        } else {
            userData = { ...userData, isAdmin: false, name: userData.name || nameFromEmail };
        }
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        saveRegisteredUser(userData);
        return true;
    };

    const signup = ({ name, email, password }) => {
        const userData = {
            email,
            password,
            isAdmin: email.includes('admin'),
            name: email.includes('admin') ? 'Admin User' : name
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        saveRegisteredUser(userData);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
