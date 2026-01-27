// src/pages/admin/SeedProducts.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { seedProducts, listProducts, clearProducts } from '../../utils/seedProducts';
import { getProducts } from '../../utils/storage';

function SeedProducts() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState(getProducts());

  const handleSeed = () => {
    const result = seedProducts();
    if (result) {
      setMessage('✅ Produtos cadastrados com sucesso!');
      setProducts(getProducts());
    } else {
      setMessage('❌ Operação cancelada.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja remover TODOS os produtos?')) {
      clearProducts();
      setMessage('🗑️ Todos os produtos foram removidos.');
      setProducts([]);
    }
  };

  const handleList = () => {
    const list = listProducts();
    setProducts(list);
  };

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <Link to="/admin/dashboard" style={{ 
            color: '#4a7c43', 
            textDecoration: 'none', 
            fontSize: '14px' 
          }}>
            ← Voltar ao Dashboard
          </Link>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#2d5a27', 
            marginTop: '12px' 
          }}>
            🌱 Cadastrar Produtos em Massa
          </h1>
          <p style={{ color: '#6b7c68', fontSize: '14px', marginTop: '8px' }}>
            Cadastre todos os produtos de uma vez no sistema
          </p>
        </div>

        {/* Mensagem */}
        {message && (
          <div style={{
            backgroundColor: message.includes('✅') ? '#d1fae5' : message.includes('❌') ? '#fee2e2' : '#fef3c7',
            color: message.includes('✅') ? '#065f46' : message.includes('❌') ? '#dc