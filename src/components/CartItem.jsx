import { useCart } from '../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-green-600 font-bold">
          R$ {item.price.toFixed(2).replace('.', ',')}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          -
        </button>
        
        <span className="w-8 text-center font-semibold">
          {item.quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
        >
          +
        </button>
      </div>

      <div className="text-right min-w-[6.25px]">
        <p className="text-sm text-gray-500">Subtotal</p>
        <p className="font-bold text-gray-800">
          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
        </p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition-colors p-2"
      >
        🗑️
      </button>
    </div>
  );
}

export default CartItem;