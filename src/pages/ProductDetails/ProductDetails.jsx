// src/pages/ProductDetails/ProductDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ 
        backgroundColor: '#f5f0e8', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '20px', color: '#2d5a27', marginBottom: '16px' }}>
            Produto não encontrado 😕
          </h1>
          <Link to="/" style={{ color: '#4a7c43', fontWeight: '600', textDecoration: 'none' }}>
            ← Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho! 🛒`);
  };

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '20px 16px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Link Voltar */}
        <Link to="/" style={{ 
          color: '#4a7c43', 
          fontWeight: '600', 
          textDecoration: 'none', 
          fontSize: '13px',
          display: 'inline-block',
          marginBottom: '16px'
        }}>
          ← Voltar para produtos
        </Link>

        {/* Container Principal */}
        <div style={{
          backgroundColor: '#fdfbf7',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          {/* Grid Responsivo */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Imagem */}
            <div style={{ position: 'relative' }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ 
                  width: '100%', 
                  aspectRatio: '1',
                  objectFit: 'cover'
                }}
              />
              <span style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#4a7c43',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {product.category}
              </span>
            </div>

            {/* Informações */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              
              {/* Nome */}
              <h1 style={{ 
                fontSize: 'clamp(22px, 5vw, 28px)', 
                fontWeight: 'bold', 
                color: '#2d5a27',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>
                {product.name}
              </h1>

              {/* Descrição */}
              <p style={{ 
                color: '#5a6c57', 
                lineHeight: '1.6',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {product.description}
              </p>

              {/* Preço */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ 
                  fontSize: 'clamp(28px, 6vw, 36px)', 
                  fontWeight: 'bold', 
                  color: '#4a7c43' 
                }}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <p style={{ color: '#6b7c68', fontSize: '13px', marginTop: '4px' }}>
                  à vista no PIX
                </p>
              </div>

              {/* Botões de Ação */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: '1 1 140px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #4a7c43',
                    backgroundColor: '#fff',
                    color: '#4a7c43',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  🛒 Adicionar
                </button>
                <Link
                  to="/cart"
                  onClick={handleAddToCart}
                  style={{
                    flex: '1 1 140px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#4a7c43',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  ⚡ Comprar
                </Link>
              </div>

              {/* Formas de Pagamento */}
              <div style={{
                backgroundColor: '#f5f0e8',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  color: '#2d5a27',
                  marginBottom: '12px'
                }}>
                  💳 Formas de Pagamento
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '8px' 
                }}>
                  {[
                    { icon: '📱', name: 'PIX', desc: 'Aprovação instantânea' },
                    { icon: '💳', name: 'Crédito', desc: 'Até 12x sem juros' },
                    { icon: '💳', name: 'Débito', desc: 'Débito na hora' },
                    { icon: '📄', name: 'Boleto', desc: 'Vence em 3 dias' }
                  ].map((method) => (
                    <div key={method.name} style={{
                      backgroundColor: '#fdfbf7',
                      padding: '10px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #e0ddd5'
                    }}>
                      <span style={{ fontSize: '16px' }}>{method.icon}</span>
                      <div>
                        <p style={{ fontWeight: '600', color: '#2d5a27', fontSize: '12px' }}>{method.name}</p>
                        <p style={{ fontSize: '10px', color: '#6b7c68' }}>{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefícios da Compra */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                fontSize: '12px',
                color: '#5a6c57'
              }}>
                <span>🚚 Frete grátis +R$150</span>
                <span>🔒 Compra segura</span>
                <span>↩️ Devolução 7 dias</span>
              </div>
            </div>
          </div>

          {/* Benefícios do Produto */}
          {product.benefits && product.benefits.length > 0 && (
            <div style={{
              backgroundColor: '#e8f5e9',
              padding: '24px'
            }}>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#2d5a27',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                ✨ Benefícios do Produto
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {product.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: '#fdfbf7',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ color: '#4a7c43', fontSize: '16px' }}>✓</span>
                    <p style={{ color: '#3d4a3a', fontSize: '13px' }}>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;