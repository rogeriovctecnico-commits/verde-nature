// src/pages/admin/AdminOrders.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '../../utils/storage';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getOrders();
    setOrders(allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'todos') return true;
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return { bg: '#fef3c7', color: '#92400e' };
      case 'confirmado':
        return { bg: '#dbeafe', color: '#1e40af' };
      case 'enviado':
        return { bg: '#e0e7ff', color: '#3730a3' };
      case 'concluido':
        return { bg: '#d1fae5', color: '#065f46' };
      case 'cancelado':
        return { bg: '#fee2e2', color: '#dc2626' };
      default:
        return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const cardStyle = {
    backgroundColor: '#fdfbf7',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/admin/dashboard" style={{ color: '#a8d4a2', textDecoration: 'none', fontSize: '14px' }}>
            ← Voltar
          </Link>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
            🛒 Gerenciar Pedidos
          </h1>
        </div>
        <div style={{ color: '#a8d4a2', fontSize: '14px' }}>
          {orders.length} pedido(s) total
        </div>
      </header>

      {/* Conteúdo */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        
        {/* Filtros */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {['todos', 'pendente', 'confirmado', 'enviado', 'concluido', 'cancelado'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: filter === status ? '#4a7c43' : '#fdfbf7',
                color: filter === status ? '#fff' : '#4a5c47'
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'todos' && (
                <span style={{ marginLeft: '6px' }}>
                  ({orders.filter(o => o.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Lista de Pedidos */}
        <div style={cardStyle}>
          {filteredOrders.length === 0 ? (
            <p style={{ color: '#6b7c68', textAlign: 'center', padding: '60px' }}>
              Nenhum pedido encontrado
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f0e8' }}>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Pedido</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Cliente</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Itens</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Total</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Data</th>
                    <th style={{ textAlign: 'center', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => {
                    const statusColor = getStatusColor(order.status);
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid #e8e4dc' }}>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#2d5a27', fontWeight: '600' }}>
                          #{order.id}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <p style={{ fontSize: '14px', color: '#3d4a3a', fontWeight: '500' }}>
                            {order.customer?.name || 'N/A'}
                          </p>
                          <p style={{ fontSize: '12px', color: '#6b7c68' }}>
                            {order.customer?.phone || ''}
                          </p>
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: '#6b7c68' }}>
                          {order.items?.length || 0} item(s)
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#4a7c43', fontWeight: '600' }}>
                          R$ {(order.total || 0).toFixed(2).replace('.', ',')}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: statusColor.bg,
                            color: statusColor.color
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: '#6b7c68' }}>
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '2px solid #e0ddd5',
                              backgroundColor: '#f9f6f0',
                              color: '#3d4a3a',
                              fontSize: '13px',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="enviado">Enviado</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#e8f5e9',
                              color: '#2d5a27',
                              fontWeight: '600',
                              cursor: 'pointer',
                              fontSize: '12px',
                              marginLeft: '8px'
                            }}
                            >
                            👁️ Ver
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fdfbf7',
            borderRadius: '20px',
            padding: '32px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Header do Modal */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5a27' }}>
                📦 Pedido #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f5f0e8',
                  color: '#6b7c68',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Status */}
            <div style={{
              backgroundColor: getStatusColor(selectedOrder.status).bg,
              color: getStatusColor(selectedOrder.status).color,
              padding: '12px 20px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              Status: {selectedOrder.status.toUpperCase()}
            </div>

            {/* Dados do Cliente */}
            <div style={{
              backgroundColor: '#f5f0e8',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '12px' }}>
                👤 Dados do Cliente
              </h3>
              <p style={{ fontSize: '14px', color: '#3d4a3a', marginBottom: '4px' }}>
                <strong>Nome:</strong> {selectedOrder.customer?.name || 'N/A'}
              </p>
              <p style={{ fontSize: '14px', color: '#3d4a3a', marginBottom: '4px' }}>
                <strong>Telefone:</strong> {selectedOrder.customer?.phone || 'N/A'}
              </p>
              <p style={{ fontSize: '14px', color: '#3d4a3a', marginBottom: '4px' }}>
                <strong>Email:</strong> {selectedOrder.customer?.email || 'N/A'}
              </p>
            </div>

            {/* Endereço */}
            {selectedOrder.address && (
              <div style={{
                backgroundColor: '#f5f0e8',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '12px' }}>
                  📍 Endereço de Entrega
                </h3>
                <p style={{ fontSize: '14px', color: '#3d4a3a', lineHeight: '1.6' }}>
                  {selectedOrder.address.street}, {selectedOrder.address.number}<br />
                  {selectedOrder.address.complement && <>{selectedOrder.address.complement}<br /></>}
                  {selectedOrder.address.neighborhood}<br />
                  {selectedOrder.address.city} - {selectedOrder.address.state}<br />
                  CEP: {selectedOrder.address.cep}
                </p>
              </div>
            )}

            {/* Itens do Pedido */}
            <div style={{
              backgroundColor: '#f5f0e8',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '12px' }}>
                🛒 Itens do Pedido
              </h3>
              {selectedOrder.items?.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #e0ddd5' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <p style={{ fontSize: '14px', color: '#3d4a3a', fontWeight: '500' }}>{item.name}</p>
                      <p style={{ fontSize: '12px', color: '#6b7c68' }}>Qtd: {item.quantity}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4a7c43', fontWeight: '600' }}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>

            {/* Total e Pagamento */}
            <div style={{
              backgroundColor: '#e8f5e9',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#4a5c47' }}>Forma de Pagamento:</span>
                <span style={{ color: '#2d5a27', fontWeight: '600' }}>{selectedOrder.paymentMethod || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27' }}>Total:</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a7c43' }}>
                  R$ {(selectedOrder.total || 0).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Observações */}
            {selectedOrder.observation && (
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                  📝 Observações
                </h3>
                <p style={{ fontSize: '14px', color: '#78350f' }}>{selectedOrder.observation}</p>
              </div>
            )}

            {/* Alterar Status */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  handleStatusChange(selectedOrder.id, e.target.value);
                  setSelectedOrder({ ...selectedOrder, status: e.target.value });
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '10px',
                  border: '2px solid #e0ddd5',
                  backgroundColor: '#f9f6f0',
                  color: '#3d4a3a',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="enviado">Enviado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#4a7c43',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;                