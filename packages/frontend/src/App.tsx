import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { registerUser, loginUser } from './lib/api';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [token, setToken] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        // Check expiration (exp is in seconds)
        if (decoded.exp && Date.now() / 1000 < decoded.exp) {
          setToken(storedToken);
          setIsValid(true);
        } else {
          localStorage.removeItem('authToken');
          setToken(null);
          setIsValid(false);
        }
      } catch {
        localStorage.removeItem('authToken');
        setToken(null);
        setIsValid(false);
      }
    } else {
      setToken(null);
      setIsValid(false);
    }
  }, []);

  const handleSwitchMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
    setError(null);
  };

  const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
    setError(null);
    try {
      if (mode === 'signup') {
        const res = await registerUser({ name: data.name!, email: data.email, password: data.password });
        localStorage.setItem('authToken', res.token);
        setToken(res.token);
        setIsValid(true);
      } else {
        const res = await loginUser({ email: data.email, password: data.password });
        localStorage.setItem('authToken', res.token);
        setToken(res.token);
        setIsValid(true);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsValid(false);
    setMode('signin');
  };

  if (!token || !isValid) {
    return <AuthForm mode={mode} onSwitchMode={handleSwitchMode} onSubmit={handleAuthSubmit} />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Welcome to TestMate LIMS</h1>
      <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.7rem 2rem', borderRadius: '8px', background: '#6e8efb', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}

export default App;
