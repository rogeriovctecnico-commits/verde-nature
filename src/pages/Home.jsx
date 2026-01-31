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
    
    <div
      style={{
        backgroundColor: '#F9FBFC', /* branco gelo */
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    > 
      <section
  style={{
    background: 'linear-gradient(135deg, #2d5a27 20%, #4a7c43 100%)',
    padding: '10px 20px',        // menos padding vertical
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    color: '#fff',
    minHeight: '90px',          // altura mínima menor
  }}
>
  {/* Link Admin - Canto superior direito */}
  <Link
    to="/admin/login"
    style={{
      // position: 'absolute',
      top: 10,
      right: 20,
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontWeight: 600,
      zIndex: 10,
    }}
  >
    🔐 Admin
  </Link>

  {/* Texto e título - ocupando espaço à esquerda */}
  <div style={{ maxWidth: '80%' }}>
    <p
            style={{
              fontSize: 'clamp(12px, 1.5vw, 16px)', // fonte menor
              color: '#c1d8b9',
              lineHeight: 1.3,
              fontWeight: 500,
            }}
          >
            Produtos naturais para uma vida mais saudável
          </p>
  </div>

  {/* Campo de busca à direita */}
  <input
    type="text"
    placeholder="🔍 Buscar produtos..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: '260px',
      padding: '10px 18px',
      borderRadius: 50,
      border: 'none',
      fontSize: 14,
      backgroundColor: '#fdfbf7',
      color: '#3d4a3a',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      outline: 'none',
      transition: 'box-shadow 0.3s ease',
    }}
    onFocus={(e) => (e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)')}
    onBlur={(e) => (e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)')}
  />
</section>

      {/* Filtros e Produtos */}
      <section
        style={{
          maxWidth: 1280,
          margin: '40px auto 80px',
          padding: '0 14px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Categorias */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '12px 26px',
                borderRadius: 50,
                border: 'none',
                fontSize: 14,
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category ? '#4a7c43' : '#fdfbf7',
                color: selectedCategory === category ? '#fff' : '#4a5c47',
                boxShadow: selectedCategory === category
                  ? '0 6px 20px rgba(74, 124, 67, 0.35)'
                  : '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'all 0.3s ease',
                userSelect: 'none',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 28,
            paddingBottom: 24,
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: 18, color: '#6b7c68' }}>
              😕 Nenhum produto encontrado
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#2d5a27',
          padding: '32px 24px',
          textAlign: 'center',
          color: '#d4e8d1',
          fontSize: 14,
          userSelect: 'none',
        }}
      >
        <h3
          style={{
            color: '#ffffff',
            fontSize: 20,
            marginBottom: 16,
            fontWeight: 'bold',
          }}
        >
          🌿 Verde Nature
        </h3>
        <p style={{ marginBottom: 20 }}>Produtos naturais de qualidade</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            flexWrap: 'wrap',
            fontSize: 14,
            color: '#a8d4a2',
          }}
        >
          <span>📱 (27) 99950-5856</span>
        </div>
        <p style={{ fontSize: 12, color: '#7ab573' }}>© 2025 Verde Nature</p>
      </footer>
    </div>
  );
}

export default Home;
