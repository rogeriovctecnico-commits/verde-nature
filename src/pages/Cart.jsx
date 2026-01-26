import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

function Cart() {
  const { cart, getTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl">🛒</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 mt-2">
            Adicione produtos para continuar
          </p>
          <Link
            to="/"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          🛒 Meu Carrinho
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 transition-colors mt-4"
            >
              🗑️ Limpar carrinho
            </button>
          </div>

          {/* Resumo */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Resumo do Pedido
            </h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Entrega</span>
                <span className="text-green-600">A combinar</span>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span className="text-green-600">
                R$ {getTotal().toFixed(2).replace('.', ',')}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Finalizar Pedido
            </Link>
            
            <Link
              to="/"
              className="block w-full text-center text-green-600 mt-4 hover:underline"
            >
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;