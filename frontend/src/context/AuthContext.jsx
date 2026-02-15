import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            // Set a timeout so we don't wait forever for cold-start backends
            const timeout = setTimeout(() => {
                setLoading(false);
            }, 5000);

            authApi.getMe(token)
                .then((data) => setUser(data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                })
                .finally(() => {
                    clearTimeout(timeout);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = (authData) => {
        localStorage.setItem('token', authData.token);
        setToken(authData.token);
        setUser({ id: authData.id, name: authData.name, email: authData.email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
