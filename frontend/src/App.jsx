import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { todoApi } from './api/todoApi';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (todo) => {
    try {
      const created = await todoApi.create(todo);
      setTodos((prev) => [created, ...prev]);
      showNotification('Todo added successfully!');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleUpdate = async (todo) => {
    try {
      const updated = await todoApi.update(editingTodo.id, todo);
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingTodo(null);
      showNotification('Todo updated successfully!');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleToggle = async (id) => {
    try {
      const toggled = await todoApi.toggle(id);
      setTodos((prev) => prev.map((t) => (t.id === toggled.id ? toggled : t)));
    } catch (err) {
      showNotification('Failed to update todo', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      showNotification('Todo deleted');
    } catch (err) {
      showNotification('Failed to delete todo', 'error');
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="app">
      <div className="app-container">
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <Header todos={todos} />

        <TodoForm
          onSubmit={editingTodo ? handleUpdate : handleCreate}
          editingTodo={editingTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading todos...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
            <button className="retry-btn" onClick={fetchTodos}>Retry</button>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={setEditingTodo}
            onDelete={handleDelete}
          />
        )}
      </div>

      <footer className="app-footer">
        <p>Built with ❤️ using React & Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;
