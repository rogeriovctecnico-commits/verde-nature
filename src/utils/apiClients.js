const API_URL = 'http://localhost:3000/clientes';

export async function getClients() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar clientes');
  return res.json();
}

export async function addClient(client) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  });
  if (!res.ok) throw new Error('Erro ao adicionar cliente');
  return res.json();
}

export async function updateClient(id, client) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  });
  if (!res.ok) throw new Error('Erro ao atualizar cliente');
  return res.json();
}

export async function deleteClient(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar cliente');
  return res.json();
}