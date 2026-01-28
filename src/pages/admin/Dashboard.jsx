// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getOrders, getUsers } from '../../utils/storage';
import { getProducts as apiGetProducts, addProduct as apiAddProduct } from '../../utils/api';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  

  const [products, setProducts] = useState([]);
  const orders = getOrders();
  const users = getUsers();

  const pendingOrders = orders.filter(o => o.status === 'pendente').length;
  const completedOrders = orders.filter(o => o.status === 'concluido').length;
  const totalRevenue = orders
    .filter(o => o.status === 'concluido')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await apiGetProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos', error);
      setProducts([]);
    }
  };

  const bulkAddProducts = async () => {
    // Exemplo de produtos para cadastro em massa
    const produtosParaAdicionar = [
      {
        nome: 'Produto Exemplo 1',
        preco: 29.99,
        image: '/images/produto1.jpg',
        description: 'Descrição do produto 1',
        category: 'Categoria 1',
        stock: 100,
        benefits: 'Benefícios do produto 1'
      },
      {
        nome: 'Produto Exemplo 2',
        preco: 19.99,
        image: '/images/produto2.jpg',
        description: 'Descrição do produto 2',
        category: 'Categoria 2',
        stock: 50,
        benefits: 'Benefícios do produto 2'
      }
      // Adicione mais produtos aqui, se quiser
    ];

    try {
      for (const produto of produtosParaAdicionar) {
        await apiAddProduct(produto);
      }
      alert('Produtos adicionados em massa com sucesso!');
      loadProducts(); // Recarrega a lista após inserção
    } catch (error) {
      alert('Erro ao adicionar produtos em massa');
      console.error(error);
    }
  };

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
          <Link to="/admin/orders">Gerenciar Pedidos</Link>
          <Link to="/admin/orders/create">Criar Pedido</Link>
        </div>

        {/* Menu administrativo (exemplo) */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <Link to="/admin/products" style={menuItemStyle}>Gerenciar Produtos</Link>
          <Link to="/admin/orders" style={menuItemStyle}>Gerenciar Pedidos</Link>
          <Link to="/admin/users" style={menuItemStyle}>Gerenciar Usuários</Link>
        </div>

               {/* Botão para cadastro em massa e para gerenciar produtos */}
        <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={bulkAddProducts}
            style={{
              padding: '14px 28px',
              backgroundColor: '#4a7c43',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              border: 'none'
            }}
          >
            Cadastrar Produtos em Massa
          </button>

          <button
            onClick={() => navigate('/admin/products')}
            style={{
              padding: '14px 28px',
              backgroundColor: '#3a6b2a',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              border: 'none'
            }}
          >
            Gerenciar Produtos
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;