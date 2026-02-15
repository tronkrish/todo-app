const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authApi = {
    async signUp(name, email, password) {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Sign up failed');
        return data;
    },

    async signIn(email, password) {
        const res = await fetch(`${API_URL}/api/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Sign in failed');
        return data;
    },

    async getMe(token) {
        const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
    },

    async getStats() {
        const res = await fetch(`${API_URL}/api/auth/stats`);
        if (!res.ok) throw new Error('Failed to get stats');
        return res.json();
    },
};
