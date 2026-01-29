
function MenuItem({ to, icon, label, badge, onClick, style }) {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#a8d4a2',
    textDecoration: 'none',
    fontSize: 16,
    fontWeight: 600,
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
    transition: 'color 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = '#d4e8d1';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = '#a8d4a2';
  };

  const content = (
    <>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span>{label}</span>
      {badge > 0 && (
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
          {badge}
        </span>
      )}
    </>
  );

  if (onClick) {
    // Se receber onClick, renderiza botão
    return (
      <button
        onClick={onClick}
        style={{
          ...baseStyle,
          border: 'none',
          background: 'none',
          padding: 0,
          fontSize: 16,
          fontWeight: 600,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </button>
    );
  }

  // Senão, renderiza Link para navegação
  return (
    <Link
      to={to}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </Link>
  );
}

export default MenuItem;