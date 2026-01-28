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
            color: message.includes('✅') ? '#065f46' : message.includes('❌') ? '#dc2626' : '#92400e',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {message}
          </div>
        )}

        {/* Botões de Ação */}
        <div style={{
          backgroundColor: '#fdfbf7',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '16px' }}>
            ⚡ Ações Rápidas
          </h2>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSeed}
              style={{
                padding: '14px 24px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#4a7c43',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🌱 Cadastrar 20 Produtos
            </button>

            <button
              onClick={handleList}
              style={{
                padding: '14px 24px',
                borderRadius: '10px',
                border: '2px solid #4a7c43',
                backgroundColor: '#fff',
                color: '#4a7c43',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📋 Atualizar Lista
            </button>

            <button
              onClick={handleClear}
              style={{
                padding: '14px 24px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🗑️ Limpar Tudo
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '8px' }}>
            ℹ️ Informações
          </h3>
          <ul style={{
            color: '#3d6b35',
            fontSize: '13px',
            lineHeight: '1.8',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Este script cadastra <strong>20 produtos</strong> automaticamente</li>
            <li>Os produtos incluem: suplementos, alimentos, óleos e bebidas</li>
            <li>Cada produto tem: nome, preço, descrição, categoria, estoque e benefícios</li>
            <li>As imagens devem estar na pasta <code>public/images/products/</code></li>
          </ul>
        </div>

        {/* Lista de Produtos */}
        <div style={{
          backgroundColor: '#fdfbf7',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27' }}>
              📦 Produtos Cadastrados
            </h2>
            <span style={{
              backgroundColor: '#e8f5e9',
              color: '#2d5a27',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {products.length} produtos
            </span>
          </div>

          {products.length === 0 ? (
            <p style={{
              color: '#6b7c68',
              textAlign: 'center',
              padding: '40px',
              fontSize: '14px'
            }}>
              Nenhum produto cadastrado ainda.<br />
              Clique em "Cadastrar 20 Produtos" para começar.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f0e8' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47' }}>Imagem</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47' }}>Nome</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#4a5c47' }}>Categoria</th>
                    <th style={{ textAlign: 'right', padding: '12px', color: '#4a5c47' }}>Preço</th>
                    <th style={{ textAlign: 'center', padding: '12px', color: '#4a5c47' }}>Estoque</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: '1px solid #e8e4dc',
                        backgroundColor: index % 2 === 0 ? '#fff' : '#fdfbf7'
                      }}
                    >
                      <td style={{ padding: '10px' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '6px'
                          }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=?';
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px', color: '#2d5a27', fontWeight: '500' }}>
                        {product.name}
                      </td>
                      <td style={{ padding: '10px', color: '#6b7c68' }}>
                        {product.category}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#4a7c43', fontWeight: '600' }}>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: product.stock > 10 ? '#d1fae5' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                          color: product.stock > 10 ? '#065f46' : product.stock > 0 ? '#92400e' : '#dc2626',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {product.stock}
                        </span>
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

export default SeedProducts;