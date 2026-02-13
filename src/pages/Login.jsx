import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login
        if (login({ email, password })) {
            navigate('/');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Welcome Back</h2>
                <p>Sign in to your account to rent equipment.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="user@example.com (use 'admin' for admin access)"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        <p className="hint">Hint: Use 'admin' in email for Admin access.</p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
