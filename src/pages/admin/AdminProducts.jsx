// src/pages/admin/AdminProducts.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../utils/storage';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
  name: '',
  price: '',
  image: '',
  description: '',
  category: '',
  benefits: '',
  stock: ''
});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const productData = {
    name: formData.name,
    price: parseFloat(formData.price),
    image: formData.image,
    description: formData.description,
    category: formData.category,
    benefits: formData.benefits,
    stock: parseInt(formData.stock) || 0
  };

  try {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }
    // Limpar e atualizar lista
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      benefits: '',
      stock: ''
    });
    setEditingProduct(null);
    setShowModal(false);
    loadProducts();
  } catch (error) {
    alert('Erro ao salvar produto');
    console.error(error);
  }
};

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: (product.stock || 0).toString()
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', description: '', category: '', stock: '' });
    setShowModal(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '2px solid #e0ddd5',
    backgroundColor: '#f9f6f0',
    color: '#3d4a3a',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500',
    color: '#4a5c47',
    marginBottom: '6px',
    fontSize: '13px'
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
            📦 Gerenciar Produtos
          </h1>
        </div>
        <button
          onClick={openNewProductModal}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#4a7c43',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          + Novo Produto
        </button>
      </header>

      {/* Conteúdo */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        
        {/* Tabela de Produtos */}
        <div style={{
          backgroundColor: '#fdfbf7',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          {products.length === 0 ? (
            <p style={{ color: '#6b7c68', textAlign: 'center', padding: '60px' }}>
              Nenhum produto cadastrado ainda.<br />
              Clique em "+ Novo Produto" para adicionar.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f0e8' }}>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Imagem</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Nome</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Categoria</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Preço</th>
                    <th style={{ textAlign: 'left', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Estoque</th>
                    <th style={{ textAlign: 'center', padding: '16px', color: '#4a5c47', fontSize: '13px' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #e8e4dc' }}>
                      <td style={{ padding: '12px' }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#2d5a27', fontWeight: '500' }}>
                        {product.name}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#6b7c68' }}>
                        {product.category}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#4a7c43', fontWeight: '600' }}>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: (product.stock || 0) > 10 ? '#d1fae5' : (product.stock || 0) > 0 ? '#fef3c7' : '#fee2e2',
                          color: (product.stock || 0) > 10 ? '#065f46' : (product.stock || 0) > 0 ? '#92400e' : '#dc2626'
                        }}>
                          {product.stock || 0} un.
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleEdit(product)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#e8f5e9',
                            color: '#2d5a27',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '13px',
                            marginRight: '8px'
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >
                          🗑️ Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Adicionar/Editar Produto */}
      {showModal && (
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
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '24px' }}>
              {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Nome do Produto *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Magnésio com Inositol"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Preço (R$) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="89.90"
                    step="0.01"
                    min="0"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Estoque *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    min="0"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Categoria *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Selecione...</option>
                  <option value="Suplementos">Suplementos</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Kits">Kits</option>
                  <option value="Óleos">Óleos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>URL da Imagem *</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/products/produto.webp"
                  required
                  style={inputStyle}
                />
                <p style={{ fontSize: '11px', color: '#6b7c68', marginTop: '4px' }}>
                  Coloque a imagem na pasta public/images/products/
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Descrição *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição detalhada do produto..."
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '10px',
                    border: '2px solid #e0ddd5',
                    backgroundColor: '#fff',
                    color: '#6b7c68',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#4a7c43',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;                            