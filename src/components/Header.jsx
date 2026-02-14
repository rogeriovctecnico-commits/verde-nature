import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

// MenuItem com classes CSS
function MenuItem({ to, icon, label, badge, onClick, className }) {
  return onClick ? (
    <button
      onClick={onClick}
      className={`${styles.menuItem} ${className || ""}`}
    >
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
      {badge > 0 && <span className={styles.badge}>{badge}</span>}
    </button>
  ) : (
    <Link to={to} className={`${styles.menuItem} ${className || ""}`}>
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
      {badge > 0 && <span className={styles.badge}>{badge}</span>}
    </Link>
  );
}

function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha menu mobile ao clicar em um link
  const handleMenuItemClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🌿 Verde Nature 🌿
        </Link>

        {/* Menu desktop */}
        <nav className={styles.navDesktop}>
          <MenuItem to="/cart" icon="🛒" label="Carrinho" badge={totalItems} />
          {isAuthenticated() ? (
            <>
              <span className={styles.greeting}>
                Olá, <strong>{user?.name?.split(" ")[0]}</strong>
              </span>
              <MenuItem
                onClick={logout}
                icon="🚪"
                label="Sair"
                className={styles.logoutButton}
              />
            </>
          ) : (
            <>
              <MenuItem to="../pages/Login" icon="🔐" label="Entrar" />
              <MenuItem
                to="../pages/Register"
                icon="✍️"
                label="Cadastrar"
                className={styles.registerButton}
              />
            </>
          )}
        </nav>

        {/* Botão menu hamburguer mobile */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
        {/* Link Admin - Canto superior direito */}
        <Link
          to="./admin/login"
          style={{
            // position: 'absolute',
            top: 0,
            right: 0,
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontWeight: 600,
            zIndex: 10,
          }}
        >
          🔐 Admin
        </Link>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className={styles.navMobile}>
          {isAuthenticated() ? (
            <>
              <span className={styles.greetingMobile}>
                Olá, <strong>{user?.name?.split(" ")[0]}</strong>
              </span>
              <MenuItem
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                icon="🚪"
                label="Sair"
                className={styles.logoutButtonMobile}
              />
              <MenuItem
                to="/cart"
                icon="🛒"
                label="Carrinho"
                badge={totalItems}
                onClick={handleMenuItemClick}
              />
            </>
          ) : (
            <>
              <MenuItem
                to="/login"
                icon="🔐"
                label="Entrar"
                onClick={handleMenuItemClick}
              />
              <MenuItem
                to="/register"
                icon="✍️"
                label="Cadastrar"
                className={styles.registerButtonMobile}
                onClick={handleMenuItemClick}
              />
              <MenuItem
                to="/cart"
                icon="🛒"
                label="Carrinho"
                badge={totalItems}
                onClick={handleMenuItemClick}
              />
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
