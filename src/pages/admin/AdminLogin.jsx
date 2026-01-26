// src/pages/admin/AdminLogin.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = loginAdmin(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '2px solid #e0ddd5',
    backgroundColor: '#f9f6f0',
    color: '#3d4a3a',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500',
    color: '#4a5c47',
    marginBottom: '8px',
    fontSize: '14px'
  };

  return (
    <div style={{ 
      backgroundColor: '#2d5a27', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#fdfbf7',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#e8f5e9',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <span style={{ fontSize: '28px' }}>🔐</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '8px' }}>
            Área Administrativa
          </h1>
          <p style={{ color: '#6b7c68', fontSize: '14px' }}>
            Acesso restrito a administradores
          </p>
        </div>

        {/* Credenciais padrão (remover em produção) */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '20px',
          fontSize: '12px',
          color: '#92400e'
        }}>
          <strong>Credenciais padrão:</strong><br />
          Email: admin@verdenature.com<br />
          Senha: admin123
        </div>

        {/* Erro */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>E-mail do Admin</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@verdenature.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha do administrador"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#2d5a27',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Entrando...' : '🔓 Acessar Painel'}
          </button>
        </form>

        {/* Link voltar */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#6b7c68', fontSize: '14px', textDecoration: 'none' }}>
            ← Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;