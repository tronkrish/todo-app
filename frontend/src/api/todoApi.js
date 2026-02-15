const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/todos';

export const todoApi = {
    async getAll() {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch todos');
        return res.json();
    },

    async getById(id) {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch todo');
        return res.json();
    },

    async create(todo) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create todo');
        }
        return res.json();
    },

    async update(id, todo) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to update todo');
        }
        return res.json();
    },

    async toggle(id) {
        const res = await fetch(`${API_URL}/${id}/toggle`, {
            method: 'PATCH',
        });
        if (!res.ok) throw new Error('Failed to toggle todo');
        return res.json();
    },

    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete todo');
    },
};
