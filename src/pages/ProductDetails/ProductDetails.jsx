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
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 style={{ fontSize: '24px', color: '#2d5a27' }}>Produto não encontrado 😕</h1>
        <Link to="/" style={{ color: '#4a7c43', fontWeight: '600', textDecoration: 'none' }}>
          ← Voltar para produtos
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho! 🛒`);
  };

  const cardStyle = {
    backgroundColor: '#fdfbf7',
    padding: '28px',
    borderRadius: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  };

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Link Voltar */}
        <Link to="/" style={{ 
          color: '#4a7c43', 
          fontWeight: '600', 
          textDecoration: 'none', 
          fontSize: '14px',
          display: 'inline-block',
          marginBottom: '24px'
        }}>
          ← Voltar para produtos
        </Link>

        {/* Container Principal */}
        <div style={{ 
          ...cardStyle,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }}>
          
          {/* Coluna Esquerda - Imagem */}
          <div style={{ position: 'relative' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ 
                width: '100%', 
                borderRadius: '16px',
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
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {product.category}
            </span>
          </div>

          {/* Coluna Direita - Informações */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Nome */}
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#2d5a27',
              marginBottom: '16px'
            }}>
              {product.name}
            </h1>

            {/* Descrição */}
            <p style={{ 
              color: '#5a6c57', 
              lineHeight: '1.7',
              fontSize: '15px',
              marginBottom: '24px'
            }}>
              {product.description}
            </p>

            {/* Preço */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#4a7c43' 
              }}>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <p style={{ color: '#6b7c68', fontSize: '14px', marginTop: '4px' }}>
                à vista no PIX
              </p>
            </div>

            {/* Botões de Ação */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginBottom: '24px' 
            }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: '2px solid #4a7c43',
                  backgroundColor: '#fff',
                  color: '#4a7c43',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🛒 Adicionar ao Carrinho
              </button>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#4a7c43',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                ⚡ Comprar Agora
              </button>
            </div>

            {/* Formas de Pagamento */}
            <div style={{
              backgroundColor: '#f5f0e8',
              padding: '20px',
              borderRadius: '14px',
              marginBottom: '24px'
            }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#2d5a27',
                marginBottom: '14px'
              }}>
                💳 Formas de Pagamento
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '10px' 
              }}>
                <div style={{
                  backgroundColor: '#fdfbf7',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #e0ddd5'
                }}>
                  <span style={{ fontSize: '20px' }}>📱</span>
                  <div>
                    <p style={{ fontWeight: '600', color: '#2d5a27', fontSize: '13px' }}>PIX</p>
                    <p style={{ fontSize: '11px', color: '#6b7c68' }}>Aprovação instantânea</p>
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fdfbf7',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #e0ddd5'
                }}>
                  <span style={{ fontSize: '20px' }}>💳</span>
                  <div>
                    <p style={{ fontWeight: '600', color: '#2d5a27', fontSize: '13px' }}>Crédito</p>
                    <p style={{ fontSize: '11px', color: '#6b7c68' }}>Até 12x sem juros</p>
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fdfbf7',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #e0ddd5'
                }}>
                  <span style={{ fontSize: '20px' }}>💳</span>
                  <div>
                    <p style={{ fontWeight: '600', color: '#2d5a27', fontSize: '13px' }}>Débito</p>
                    <p style={{ fontSize: '11px', color: '#6b7c68' }}>Débito na hora</p>
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fdfbf7',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #e0ddd5'
                }}>
                  <span style={{ fontSize: '20px' }}>📄</span>
                  <div>
                    <p style={{ fontWeight: '600', color: '#2d5a27', fontSize: '13px' }}>Boleto</p>
                    <p style={{ fontSize: '11px', color: '#6b7c68' }}>Vence em 3 dias</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios da Compra */}
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🚚</span>
                <p style={{ fontSize: '13px', color: '#5a6c57' }}>Frete grátis acima de R$ 150</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🔒</span>
                <p style={{ fontSize: '13px', color: '#5a6c57' }}>Compra segura</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>↩️</span>
                <p style={{ fontSize: '13px', color: '#5a6c57' }}>Devolução em 7 dias</p>
              </div>
            </div>

          </div>
        </div>

        {/* Seção de Benefícios do Produto */}
        {product.benefits && product.benefits.length > 0 && (
          <div style={{ 
            ...cardStyle, 
            marginTop: '32px',
            backgroundColor: '#e8f5e9'
          }}>
            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: 'bold', 
              color: '#2d5a27',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              ✨ Benefícios do Produto
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {product.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: '#fdfbf7',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ color: '#4a7c43', fontSize: '18px' }}>✓</span>
                  <p style={{ color: '#3d4a3a', fontSize: '14px' }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductDetails;