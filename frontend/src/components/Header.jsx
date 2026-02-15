import './Header.css';

export default function Header({ todos }) {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-title">
                    <span className="header-icon">✦</span>
                    <h1>Todo App</h1>
                </div>
                <p className="header-subtitle">Stay organized, stay productive</p>
                <div className="header-stats">
                    <div className="stat">
                        <span className="stat-number">{total}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat stat-completed">
                        <span className="stat-number">{completed}</span>
                        <span className="stat-label">Done</span>
                    </div>
                    <div className="stat stat-pending">
                        <span className="stat-number">{pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
                {total > 0 && (
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        <span className="progress-text">{progress}% complete</span>
                    </div>
                )}
            </div>
        </header>
    );
}
