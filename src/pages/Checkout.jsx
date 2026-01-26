import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    observation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppOrder = () => {
    let message = `🌿 *PEDIDO VERDE NATURE*\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📱 *Telefone:* ${formData.phone}\n`;
    message += `📍 *Endereço:* ${formData.address}\n\n`;
    message += `📦 *ITENS DO PEDIDO:*\n`;
    message += `─────────────────\n`;
    
    cart.forEach(item => {
      message += `• ${item.name}\n`;
      message += `  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
      message += `  Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });
    
    message += `─────────────────\n`;
    message += `💰 *TOTAL: R$ ${getTotal().toFixed(2).replace('.', ',')}*\n\n`;
    
    if (formData.observation) {
      message += `📝 *Observação:* ${formData.observation}\n`;
    }

    // TROQUE PELO NÚMERO REAL DA VERDE NATURE
    const phoneNumber = '5511999999999';
    
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl">✅</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Pedido enviado com sucesso!
          </h2>
          <p className="text-gray-500 mt-2">
            Aguarde o contato pelo WhatsApp
          </p>
          <Link
            to="/"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          📋 Finalizar Pedido
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          {/* Resumo dos itens */}
          <div className="mb-6">
            <h2 className="font-semibold text-gray-800 mb-3">Itens do pedido:</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  R$ {getTotal().toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Endereço de entrega *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Rua, número, bairro, cidade..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Observações (opcional)
              </label>
              <textarea
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Alguma informação adicional..."
              />
            </div>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={!formData.name || !formData.phone || !formData.address}
              className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span>📱</span>
              Enviar Pedido pelo WhatsApp
            </button>
          </form>

          <Link
            to="/cart"
            className="block text-center text-green-600 mt-4 hover:underline"
          >
            ← Voltar para o carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;