const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const TODOS_URL = `${API_URL}/api/todos`;

function getHeaders() {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

export const todoApi = {
    async getAll() {
        const res = await fetch(TODOS_URL, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch todos');
        return res.json();
    },

    async getById(id) {
        const res = await fetch(`${TODOS_URL}/${id}`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch todo');
        return res.json();
    },

    async create(todo) {
        const res = await fetch(TODOS_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(todo),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create todo');
        }
        return res.json();
    },

    async update(id, todo) {
        const res = await fetch(`${TODOS_URL}/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(todo),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to update todo');
        }
        return res.json();
    },

    async toggle(id) {
        const res = await fetch(`${TODOS_URL}/${id}/toggle`, {
            method: 'PATCH',
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to toggle todo');
        return res.json();
    },

    async delete(id) {
        const res = await fetch(`${TODOS_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete todo');
    },
};
