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
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            🌿 Verde Nature 🌿
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#d4e8d1',
            marginBottom: '32px'
          }}>
            Produtos naturais para uma vida mais saudável
          </p>

          {/* Busca */}
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="🔍 Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '16px',
                backgroundColor: '#fdfbf7',
                color: '#3d4a3a',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </section>

      {/* Filtros e Produtos */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 32px'
      }}>
        
        {/* Categorias */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
          justifyContent: 'center'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '12px 24px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          justifyItems: 'center'
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
              fontSize: '20px',
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
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '16px' }}>
            🌿 Verde Nature
          </h3>
          <p style={{ color: '#d4e8d1', fontSize: '14px', marginBottom: '24px' }}>
            Produtos naturais de qualidade para sua saúde e bem-estar
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#a8d4a2', fontSize: '14px' }}>📱 (27) 99950-5856</span>
            <a href="mailto:contato@verdenature.com" style={{ color: '#a8d4a2', fontSize: '14px' }}>📧 contato@verdenature.com</a>
          </div>
          <p style={{ color: '#7ab573', fontSize: '12px', marginTop: '24px' }}>
            © 2025 Verde Nature - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;