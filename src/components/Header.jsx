import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%)',
          padding: '12px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1
              style={{
                color: '#d4e8d1',
                fontSize: 24,
                fontWeight: 900,
                margin: 0,
                userSelect: 'none',
              }}
            >
              🌿 Verde Nature
            </h1>
          </Link>

          {/* Menu desktop */}
          <nav
            className="header-desktop"
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
            }}
          >
            {/* Carrinho */}
            <Link
              to="/cart"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#a8d4a2',
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 600,
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 22 }}>🛒</span>
              <span>Carrinho</span>
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 'bold',
                    boxShadow: '0 0 6px #f59e0b',
                    userSelect: 'none',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuário */}
            {isAuthenticated() ? (
              <>
                <span
                  style={{
                    color: '#c1d8b9',
                    fontSize: 15,
                    fontWeight: 600,
                    userSelect: 'none',
                  }}
                >
                  Olá, <strong style={{ color: '#f0f9f1' }}>{user?.name?.split(' ')[0]}</strong>
                </span>
                <button
                  onClick={logout}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#a8d4a2',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)')}
                >
                  Sair
                </button >
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: '#a8d4a2',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#d4e8d1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a8d4a2')}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    backgroundColor: '#4a7c43',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'background-color 0.3s ease',
                    marginLeft: 12,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3a6b2a')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a7c43')}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>

          {/* Botão menu hamburguer mobile */}
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#d4e8d1',
              fontSize: 28,
              marginLeft: 12,
            }}
          >
            ☰
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <><nav
            className="menu-mobile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%)',
              padding: 16,
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              position: 'absolute',
              top: 56,
              right: 0,
              width: 200,
              zIndex: 200,
            }}
          >
            <Link to="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                      margin: '12px 0px 0px 100px',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#4a7c43',
                      color: '#fff',
                      fontWeight: 700,
                      textDecoration: 'none',
                      }}
                      >🔐 Entrar
            </Link>
            
            <Link to="/register"
              onClick={() => setMenuOpen(false)}
              style={{
                      margin: '12px 0px 0px 80px',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#4a7c43',
                      color: '#fff',
                      fontWeight: 700,
                      textDecoration: 'none',
                      }}
                >📝Cadastrar
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              style={{
                margin: '12px 0px 0px 100px',
                margin: '12px 0px 0px 80px',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#4a7c43',
                      color: '#fff',
                      fontWeight: 700,
                      textDecoration: 'none',
              }}
            >
              🛒 Carrinho{' '}
              {totalItems > 0 && (
                <span
                  style={{
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 'bold',
                    boxShadow: '0 0 6px #f59e0b',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        )</>)}
      </header>

      {/* CSS responsivo */}
      < style > {`
        .menu-button {
          display: none;
        }
        @media (max-width: 768px) {
          .header-desktop {
            display: none !important;
          }
          .menu-button {
            display: block;
          }
        }
      `}</style >
    </>
  );
}

export default Header;