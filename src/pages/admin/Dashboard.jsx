// src/pages/admin/Dashboard.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProducts, getOrders, getUsers } from '../../utils/storage';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const products = getProducts();
  const orders = getOrders();
  const users = getUsers();

  const pendingOrders = orders.filter(o => o.status === 'pendente').length;
  const completedOrders = orders.filter(o => o.status === 'concluido').length;
  const totalRevenue = orders
    .filter(o => o.status === 'concluido')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cardStyle = {
    backgroundColor: '#fdfbf7',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  };

  const statCardStyle = {
    ...cardStyle,
    textAlign: 'center'
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: '#fdfbf7',
    borderRadius: '16px',
    textDecoration: 'none',
    color: '#2d5a27',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease'
  };

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{
        backgroundColor: '#2d5a27',
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
            🌿 Painel Administrativo
          </h1>
          <p style={{ color: '#a8d4a2', fontSize: '14px', marginTop: '4px' }}>
            Bem-vindo, {user?.name || 'Admin'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#a8d4a2', textDecoration: 'none', fontSize: '14px' }}>
            Ver Loja →
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ffffff20',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        
        {/* Cards de Estatísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={statCardStyle}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>📦</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d5a27' }}>{products.length}</p>
            <p style={{ color: '#6b7c68', fontSize: '14px' }}>Produtos</p>
          </div>
          
          <div style={statCardStyle}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>🛒</p>
            
<p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{pendingOrders}</p>
            <p style={{ color: '#6b7c68', fontSize: '14px' }}>Pedidos Pendentes</p>
          </div>
          
          <div style={statCardStyle}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>✅</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4a7c43' }}>{completedOrders}</p>
            <p style={{ color: '#6b7c68', fontSize: '14px' }}>Pedidos Concluídos</p>
          </div>
          
          <div style={statCardStyle}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>👥</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d5a27' }}>{users.length}</p>
            <p style={{ color: '#6b7c68', fontSize: '14px' }}>Clientes</p>
          </div>
          
          <div style={statCardStyle}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>💰</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4a7c43' }}>
              R$ {totalRevenue.toFixed(2).replace('.', ',')}
            </p>
            <p style={{ color: '#6b7c68', fontSize: '14px' }}>Receita Total</p>
          </div>
        </div>

        {/* Menu de Ações */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px' }}>
          Gerenciamento
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <Link to="/admin/products" style={menuItemStyle}>
            <span style={{ fontSize: '32px' }}>📦</span>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Gerenciar Produtos</p>
              <p style={{ color: '#6b7c68', fontSize: '14px' }}>Adicionar, editar e remover produtos</p>
            </div>
          </Link>
          
          <Link to="/admin/orders" style={menuItemStyle}>
            <span style={{ fontSize: '32px' }}>🛒</span>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Gerenciar Pedidos</p>
              <p style={{ color: '#6b7c68', fontSize: '14px' }}>Ver e atualizar status dos pedidos</p>
            </div>
          </Link>
          
          <Link to="/admin/customers" style={menuItemStyle}>
            <span style={{ fontSize: '32px' }}>👥</span>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Clientes</p>
              <p style={{ color: '#6b7c68', fontSize: '14px' }}>Ver clientes cadastrados</p>
            </div>
          </Link>
        </div>

        {/* Pedidos Recentes */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5a27', marginTop: '40px', marginBottom: '20px' }}>
          Pedidos Recentes
        </h2>
        
        <div style={cardStyle}>
          {orders.length === 0 ? (
            <p style={{ color: '#6b7c68', textAlign: 'center', padding: '40px' }}>
              Nenhum pedido ainda
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e8e4dc' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47', fontSize: '14px' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47', fontSize: '14px' }}>Cliente</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47', fontSize: '14px' }}>Total</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47', fontSize: '14px' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47', fontSize: '14px' }}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(-5).reverse().map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #e8e4dc' }}>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#3d4a3a' }}>#{order.id}</td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#3d4a3a' }}>{order.customer?.name || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#4a7c43', fontWeight: '600' }}>
                        R$ {(order.total || 0).toFixed(2).replace('.', ',')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: order.status === 'pendente' ? '#fef3c7' : order.status === 'concluido' ? '#d1fae5' : '#fee2e2',
                          color: order.status === 'pendente' ? '#92400e' : order.status === 'concluido' ? '#065f46' : '#dc2626'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#6b7c68' }}>
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;