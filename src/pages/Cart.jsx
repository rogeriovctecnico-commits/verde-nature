// src/pages/Cart.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ 
        backgroundColor: '#f5f0e8', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: '#fdfbf7',
          padding: '40px 24px',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <span style={{ fontSize: '60px', display: 'block', marginBottom: '16px' }}>🛒</span>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '8px' }}>
            Carrinho Vazio
          </h2>
          <p style={{ color: '#6b7c68', marginBottom: '24px', fontSize: '14px' }}>
            Adicione produtos para continuar
          </p>
          <Link to="/" style={{
            display: 'inline-block',
            backgroundColor: '#4a7c43',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '20px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#4a7c43', fontWeight: '600', textDecoration: 'none', fontSize: '13px' }}>
            ← Continuar comprando
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d5a27', marginTop: '12px' }}>
            🛒 Meu Carrinho
          </h1>
          <p style={{ color: '#6b7c68', fontSize: '14px', marginTop: '4px' }}>
            {cart.length} {cart.length === 1 ? 'item' : 'itens'}
          </p>
        </div>

        {/* Lista de Itens */}
        <div style={{
          backgroundColor: '#fdfbf7',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {cart.map((item, index) => (
            <div 
              key={item.id} 
              style={{ 
                padding: '16px',
                borderBottom: index < cart.length - 1 ? '1px solid #e8e4dc' : 'none'
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Imagem */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    flexShrink: 0
                  }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#2d5a27',
                    marginBottom: '4px',
                    lineHeight: '1.3'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7c68', marginBottom: '8px' }}>
                    R$ {item.price.toFixed(2).replace('.', ',')} cada
                  </p>

                  {/* Controles */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {/* Quantidade */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      backgroundColor: '#f5f0e8',
                      borderRadius: '8px',
                      padding: '4px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#fff',
                          color: '#4a7c43',
                          fontSize: '16px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        -
                      </button>
                      <span style={{ 
                        minWidth: '24px', 
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#2d5a27',
                        fontSize: '14px'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#4a7c43',
                          color: '#fff',
                          fontSize: '16px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Preço e Remover */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: '#4a7c43',
                        fontSize: '16px'
                      }}>
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo e Ações */}
        <div style={{
          backgroundColor: '#fdfbf7',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          padding: '20px'
        }}>
          {/* Frete */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#5a6c57'
          }}>
            <span>Frete</span>
            <span style={{ color: '#4a7c43', fontWeight: '600' }}>
              {getTotal() >= 150 ? 'Grátis 🎉' : 'A calcular'}
            </span>
          </div>

          {getTotal() < 150 && (
            <p style={{ 
              fontSize: '12px', 
              color: '#6b7c68', 
              marginBottom: '16px',
              backgroundColor: '#fef3c7',
              padding: '10px 12px',
              borderRadius: '8px'
            }}>
              💡 Faltam <strong>R$ {(150 - getTotal()).toFixed(2).replace('.', ',')}</strong> para frete grátis!
            </p>
          )}

          {/* Total */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #e8e4dc',
            paddingTop: '16px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d5a27' }}>Total</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a7c43' }}>
              R$ {getTotal().toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Botões */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/checkout" style={{
              display: 'block',
              backgroundColor: '#4a7c43',
              color: '#fff',
              padding: '16px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
              textAlign: 'center'
            }}>
              Finalizar Compra →
            </Link>
            <button
              onClick={clearCart}
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: '2px solid #e0ddd5',
                backgroundColor: '#fff',
                color: '#6b7c68',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;