import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-green-700 text-green-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <span className="text-2xl text-green-100 font-bold">Verde Nature</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hover:text-green-200 transition-colors"
            >
              Produtos
            </Link>
            
            <Link 
              to="/cart" 
              className="relative bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition-colors"
            >
              🛒 Carrinho
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;