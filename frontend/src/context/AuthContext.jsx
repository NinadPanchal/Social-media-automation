'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load token on mount
        const storedToken = localStorage.getItem('autosocial_token');
        if (storedToken) {
            setToken(storedToken);
            fetchUser(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (authToken) => {
        try {
            const res = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        const formData = new URLSearchParams();
        formData.append('username', email); // OAuth2 expects 'username' instead of 'email'
        formData.append('password', password);

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || 'Failed to login');
        }

        const data = await res.json();
        setToken(data.access_token);
        localStorage.setItem('autosocial_token', data.access_token);
        await fetchUser(data.access_token);
    };

    const register = async (email, password) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || 'Failed to register');
        }

        const data = await res.json();
        setToken(data.access_token);
        localStorage.setItem('autosocial_token', data.access_token);
        await fetchUser(data.access_token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('autosocial_token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading: isLoading, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
