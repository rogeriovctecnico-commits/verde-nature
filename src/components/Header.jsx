// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header style={{
          backgroundColor: '#2d5a27',
          padding: '8px 12px',  // ← MENOR
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '32px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ 
              color: '#fff', 
              fontSize: '18px', 
              fontWeight: 'bold',
              margin: 0
            }}>
              🌿 Verde Nature
            </h1>
          </Link>

          {/* Menu Desktop */}
          <nav className="header-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Carrinho */}
            <Link to="/cart" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              <span style={{ fontSize: '18px' }}>🛒</span>
              <span>Carrinho</span>
              {totalItems > 0 && (
                <span style={{
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuário */}
            {isAuthenticated() ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#a8d4a2', fontSize: '13px' }}>
                  Olá, {user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/login" style={{
                  color: '#a8d4a2',
                  textDecoration: 'none',
                  fontSize: '13px'
                }}>
                  Entrar
                </Link>
                <Link to="/register" style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#4a7c43',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>

          {/* Menu Mobile - Ícones */}
          <div className="header-mobile" style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Carrinho Mobile */}
            <Link to="/cart" style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              textDecoration: 'none',
              position: 'relative'
            }}>
              <span style={{ fontSize: '22px' }}>🛒</span>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Botão Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {menuOpen && (
          <div className="header-mobile-menu" style={{
            backgroundColor: '#234d1f',
            marginTop: '12px',
            padding: '16px',
            borderRadius: '12px'
          }}>
            {isAuthenticated() ? (
              <>
                <p style={{ 
                  color: '#a8d4a2', 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>
                  Olá, {user?.name?.split(' ')[0]}
                </p>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Sair
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#4a7c43',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* CSS do Header */}
      <style>{`
        .header-desktop {
          display: flex !important;
          with
        }
        .header-mobile {
          display: none !important;
        }
        .header-mobile-menu {
          display: block;
        }
        
        @media (max-width: 768px) {
          .header-desktop {
            display: none !important;
          }
          .header-mobile {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .header-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Header;