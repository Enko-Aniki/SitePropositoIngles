import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../context/auth';
import { authenticateUser } from '../data/admlogin';

export default function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const user = authenticateUser(emailOrUsername, password);
            
            if (user) {
                login(user);
                // Parent component (App) will handle page redirect
            } else {
                setError('Email/Usuário ou Senha incorretos');
                setPassword('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="login-container">
            <div className="striped-corner"></div>

            <div className="login-card">
                <header className="login-header">
                    <h1>Welcome</h1>
                    <p>Efetue Login</p>
                </header>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="email ou usuario"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Acessar'}
                    </button>
                </form>

                <div className="demo-credentials">
                    <p><strong>Contas de Demonstração:</strong></p>
                    <p>👤 admin@email.com / admin123</p>
                    <p>👤 user@email.com / user123</p>
                </div>
            </div>
        </div>
    );
}