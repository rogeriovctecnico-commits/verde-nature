import { useState, useEffect } from 'react';
import { getClients, addClient, updateClient, deleteClient } from '../../utils/apiClients';

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ nome: '', telefone: '', email: '', endereco: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateClient(editingId, formData);
        setEditingId(null);
      } else {
        await addClient(formData);
      }
      setFormData({ nome: '', telefone: '', email: '', endereco: '' });
      loadClients();
    } catch (err) {
      alert('Erro ao salvar cliente: ' + err.message);
    }
  }

  function handleEdit(client) {
    setEditingId(client.id);
    setFormData({ nome: client.nome, telefone: client.telefone, email: client.email, endereco: client.endereco });
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja excluir este cliente?')) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (err) {
        alert('Erro ao excluir cliente: ' + err.message);
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Gerenciar Clientes</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          {editingId ? 'Atualizar' : 'Adicionar'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ nome: '', telefone: '', email: '', endereco: '' });
            }}
            style={{ marginLeft: '10px', padding: '10px 20px' }}
          >
            Cancelar
          </button>
        )}
      </form>

      {loading && <p>Carregando clientes...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {clients.map(client => (
          <li key={client.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{client.nome}</strong><br />
            {client.telefone && <span>Telefone: {client.telefone}<br /></span>}
            {client.email && <span>Email: {client.email}<br /></span>}
            {client.endereco && <span>Endereço: {client.endereco}</span>}
            <br />
            <button onClick={() => handleEdit(client)} style={{ marginRight: '10px' }}>Editar</button>
            <button onClick={() => handleDelete(client.id)} style={{ color: 'red' }}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminClients;