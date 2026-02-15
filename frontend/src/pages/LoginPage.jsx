import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let data;
            if (isSignUp) {
                if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
                data = await authApi.signUp(name.trim(), email.trim(), password);
            } else {
                data = await authApi.signIn(email.trim(), password);
            }
            login(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <span className="login-icon">✦</span>
                    <h1>Todo App</h1>
                    <p className="login-subtitle">
                        {isSignUp ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
                    </p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="login-input"
                                autoComplete="name"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            autoComplete={isSignUp ? 'new-password' : 'current-password'}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <span className="btn-spinner"></span>
                        ) : isSignUp ? (
                            'Create Account'
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button className="toggle-btn" onClick={toggleMode}>
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
