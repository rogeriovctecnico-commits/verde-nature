// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{
      backgroundColor: '#2d5a27',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
          🌿 Verde Nature
        </h1>
      </Link>

      {/* Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Carrinho */}
        <Link to="/cart" style={{
          display: 'flex',
          alignItems: 'center', gap: '8px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '15px'
        }}>
          <span style={{ fontSize: '20px' }}>🛒</span>
          <span>Carrinho</span>
          {totalItems > 0 && (
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {totalItems}
            </span>
          )}
        </Link>

        {/* Usuário Logado ou Links de Login */}
        {isAuthenticated() ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#a8d4a2', fontSize: '14px' }}>
              Olá, {user?.name?.split(' ')[0]}
            </span>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#ffffff20',
                color: '#fff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Sair
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/login" style={{
              color: '#a8d4a2',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Entrar
            </Link>
            <Link to="/register" style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#4a7c43',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Cadastrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;