import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/produto/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-36 h-36 object-cover transition-transform duration-300 hover:scale-110"
          />
          {/* Overlay dos benefícios */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 text-sm transition-opacity duration-300 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ maxHeight: '100%', overflowY: 'auto' }}
          >
            {/* {product.benefits || 'Sem benefícios cadastrados.'} */}
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full w-max">
          {product.category}
        </span>

        <Link to={`/produto/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mt-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-green-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;