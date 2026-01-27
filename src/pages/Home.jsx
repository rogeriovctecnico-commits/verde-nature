// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh' }}>



      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%)',
        padding: '24px 16px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Link Admin - Canto superior direito */}
        <Link to="/admin/login" 
          style={{
            position: 'absolute',
            top: '10px',
            right: '16px',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          🔐 Admin
        </Link>

        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 30px)',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            🌿 Verde Nature 🌿
          </h1>
          <p style={{
            fontSize: 'clamp(19px, 5vw, 16px)',
            color: '#d4e8d1',
            marginBottom: '16px',
            justifyContent: 'justify',
            display: 'flex',
          }}>
            Produtos naturais para uma vida mais saudável
          </p>

          {/* Busca */}
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '12px 18px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '14px',
              backgroundColor: '#fdfbf7',
              color: '#3d4a3a',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </section>

      {/* Filtros e Produtos */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px 48px'
      }}>

        {/* Categorias */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '24px',
          justifyContent: 'center'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '10px 18px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category ? '#4a7c43' : '#fdfbf7',
                color: selectedCategory === category ? '#ffffff' : '#4a5c47',
                boxShadow: selectedCategory === category
                  ? '0 4px 15px rgba(74, 124, 67, 0.3)'
                  : '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sem resultados */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#6b7c68'
            }}>
              😕 Nenhum produto encontrado
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2d5a27',
        padding: '32px 16px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>
          🌿 Verde Nature
        </h3>
        <p style={{ color: '#d4e8d1', fontSize: '13px', marginBottom: '16px' }}>
          Produtos naturais de qualidade
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}>
          <span style={{ color: '#a8d4a2', fontSize: '13px' }}>📱 (27) 99950-5856</span>
        </div>
        <p style={{ color: '#7ab573', fontSize: '11px' }}>
          © 2025 Verde Nature
        </p>
      </footer>
    </div>
  );
}

export default Home;