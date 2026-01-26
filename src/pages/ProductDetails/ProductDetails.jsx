import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Produto não encontrado 😕
        </h1>
        <Link 
          to="/" 
          className="text-green-600 hover:text-green-700 font-semibold"
        >
          ← Voltar para produtos
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      {/* Container centralizado */}
      <div className="w-full max-w-5xl">
        
        {/* Link voltar */}
        <Link 
          to="/" 
          className="inline-block text-green-600 hover:text-green-700 font-semibold mb-6"
        >
          ← Voltar para produtos
        </Link>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            
            {/* Imagem */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-xl object-cover shadow-md"
                />
                <span className="absolute top-4 left-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Informações */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
                {product.name}
              </h1>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-center md:text-left">
                {product.description}
              </p>

              {/* Preço */}
              <div className="mb-6 text-center md:text-left">
                <span className="text-4xl font-bold text-green-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <p className="text-gray-500 text-sm mt-1">
                  à vista no PIX
                </p>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                >
                  🛒 Adicionar ao Carrinho
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  ⚡ Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Seção de Benefícios */}
          <div className="bg-green-50 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ✨ Benefícios do Produto
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {product.benefits && product.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3"
                >
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Informações de compra */}
          <div className="p-6 md:p-10 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🛡️ Compre com Segurança
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">🚚</span>
                <p>Frete grátis acima de R$ 150</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">🔒</span>
                <p>Compra 100% segura</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">↩️</span>
                <p>Devolução em até 7 dias</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">💳</span>
                <p>Parcele em até 12x</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;