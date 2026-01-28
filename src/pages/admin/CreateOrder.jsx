import { useState, useEffect } from 'react';
import { getClients } from '../../utils/apiClients';
import { getProducts } from '../../utils/api';
import { createOrder } from '../../utils/apiOrders';

function CreateOrder() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState('pendente');

  useEffect(() => {
    async function loadData() {
      setClients(await getClients());
      setProducts(await getProducts());
    }
    loadData();
  }, []);

  function addProductToOrder(product) {
    const exists = orderItems.find(item => item.product.id === product.id);
    if (exists) {
      setOrderItems(orderItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    setOrderItems(orderItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedClient) {
      alert('Selecione um cliente');
      return;
    }
    if (orderItems.length === 0) {
      alert('Adicione pelo menos um produto');
      return;
    }

    const produtos = orderItems.map(item => ({
      produto_id: item.product.id,
      quantidade: item.quantity
    }));

    try {
      await createOrder({ cliente_id: selectedClient, produtos, status, confirmado: 0 });
      alert('Pedido criado com sucesso!');
      // resetar formulário
      setSelectedClient('');
      setOrderItems([]);
    } catch (error) {
      alert('Erro ao criar pedido: ' + error.message);
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Criar Pedido</h2>
      <form onSubmit={handleSubmit}>
        <label>Cliente:</label>
        <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required>
          <option value="">Selecione</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.nome}</option>
          ))}
        </select>

        <h3>Produtos:</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - R$ {product.price.toFixed(2)}{' '}
              <button type="button" onClick={() => addProductToOrder(product)}>Adicionar</button>
            </li>
          ))}
        </ul>

        <h3>Itens do Pedido:</h3>
        <ul>
          {orderItems.map(item => (
            <li key={item.product.id}>
              {item.product.name} - Quantidade:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => updateQuantity(item.product.id, parseInt(e.target.value))}
              />
            </li>
          ))}
        </ul>

        <button type="submit">Criar Pedido</button>
      </form>
    </div>
  );
}

export default CreateOrder;