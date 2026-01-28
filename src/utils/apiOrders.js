const API_URL = 'http://localhost:3000/pedidos';

export async function createOrder(order) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error('Erro ao criar pedido');
  return res.json();
}

export async function getOrders() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar pedidos');
  return res.json();
}

export async function updateOrder(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar pedido');
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar pedido');
  return res.json();
}