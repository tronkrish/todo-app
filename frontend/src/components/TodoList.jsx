import { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTodos = todos
        .filter((todo) => {
            if (filter === 'ACTIVE') return !todo.completed;
            if (filter === 'COMPLETED') return todo.completed;
            return true;
        })
        .filter((todo) =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    return (
        <div className="todo-list-container">
            <div className="list-controls">
                <div className="search-box">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search todos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-tabs">
                    {['ALL', 'ACTIVE', 'COMPLETED'].map((f) => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="todo-list">
                {filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">
                            {searchQuery ? '🔍' : filter === 'COMPLETED' ? '🎯' : '📝'}
                        </span>
                        <p className="empty-text">
                            {searchQuery
                                ? 'No todos match your search'
                                : filter === 'COMPLETED'
                                    ? 'No completed todos yet'
                                    : filter === 'ACTIVE'
                                        ? 'All caught up! Great job!'
                                        : 'No todos yet. Add one above!'}
                        </p>
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
