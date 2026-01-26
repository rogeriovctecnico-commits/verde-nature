import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Link para página de detalhes */}
      <Link to={`/produto/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          {product.category}
        </span>

        {/* Link no nome também */}
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mt-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-green-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>

          <button
            onClick={handleAddToCart}
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