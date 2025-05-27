import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverIP = window.location.hostname;
    try {
      const res = await axios.post(`http://${serverIP}:5000/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '100px auto', display: 'flex', flexDirection: 'column', gap: 16, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Se connecter</h2>
      <input placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: 8, borderRadius: 4 }} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 8, borderRadius: 4 }} />
      <button type="submit" style={{ padding: 10, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Connexion</button>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </form>
  );
} 