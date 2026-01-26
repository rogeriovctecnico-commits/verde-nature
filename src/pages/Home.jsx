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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌿 Verde Nature 🌿
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Produtos naturais para uma vida mais saudável
          </p>
          
          {/* Busca */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="🔍 Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            />
          </div>
        </div>
      </section>

      {/* Filtros e Produtos */}
      <section className="container mx-auto px-4 py-12">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sem resultados */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">
              😕 Nenhum produto encontrado
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;