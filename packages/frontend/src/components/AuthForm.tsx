import React, { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  mode: 'signup' | 'signin';
  onSwitchMode: () => void;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
}

export default function AuthForm({ mode, onSwitchMode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    onSubmit({ email, password, name: mode === 'signup' ? name : undefined });
  };

  return (
    <div className={`auth-form-container ${mode}`}> 
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === 'signup' ? 'Create Account' : 'Sign In'}</h2>
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="auth-input"
            autoComplete="name"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-input"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="auth-input"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-btn">
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="auth-switch">
          {mode === 'signup' ? (
            <span>
              Already have an account?{' '}
              <button type="button" className="auth-link" onClick={onSwitchMode}>
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{' '}
              <button type="button" className="auth-link" onClick={onSwitchMode}>
                Sign Up
              </button>
            </span>
          )}
        </div>
      </form>
      <div className="auth-form-bg" />
    </div>
  );
}
