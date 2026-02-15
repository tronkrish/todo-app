import { useState, useEffect } from 'react';
import './TodoForm.css';

export default function TodoForm({ onSubmit, editingTodo, onCancelEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description || '');
            setPriority(editingTodo.priority);
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        setError('');
        onSubmit({ title: title.trim(), description: description.trim(), priority });
        if (!editingTodo) {
            setTitle('');
            setDescription('');
            setPriority('MEDIUM');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setPriority('MEDIUM');
        setError('');
        onCancelEdit();
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{editingTodo ? '✏️ Edit Todo' : '➕ Add New Todo'}</h2>

            <div className="form-group">
                <input
                    id="todo-title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`form-input ${error ? 'input-error' : ''}`}
                    autoComplete="off"
                />
                {error && <span className="error-text">{error}</span>}
            </div>

            <div className="form-group">
                <textarea
                    id="todo-description"
                    placeholder="Add a description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    rows="2"
                />
            </div>

            <div className="form-row">
                <div className="priority-group">
                    {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                        <button
                            key={p}
                            type="button"
                            className={`priority-btn priority-${p.toLowerCase()} ${priority === p ? 'active' : ''}`}
                            onClick={() => setPriority(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="form-actions">
                    {editingTodo && (
                        <button type="button" onClick={handleCancel} className="btn btn-cancel">
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="btn btn-submit">
                        {editingTodo ? 'Update' : 'Add Todo'}
                    </button>
                </div>
            </div>
        </form>
    );
}
