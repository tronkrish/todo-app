import './TodoItem.css';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
    const priorityEmoji = { LOW: '🟢', MEDIUM: '🟡', HIGH: '🔴' };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-left">
                <button
                    className={`checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => onToggle(todo.id)}
                    aria-label={todo.completed ? 'Mark as pending' : 'Mark as complete'}
                >
                    {todo.completed && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </button>

                <div className="todo-content">
                    <h3 className="todo-title">{todo.title}</h3>
                    {todo.description && <p className="todo-description">{todo.description}</p>}
                    <div className="todo-meta">
                        <span className={`priority-badge priority-${todo.priority.toLowerCase()}`}>
                            {priorityEmoji[todo.priority]} {todo.priority}
                        </span>
                        <span className="todo-date">{formatDate(todo.createdAt)}</span>
                    </div>
                </div>
            </div>

            <div className="todo-actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(todo)} title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
