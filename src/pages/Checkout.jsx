// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { addOrder } from '../utils/storage';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: '',
    observation: ''
  });
  const [orderSent, setOrderSent] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || ''
          }));
        }
      } catch (error) {
        console.log('Erro ao buscar CEP');
      }
    }
  };

  const handleWhatsAppOrder = () => {
    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userId: user?.id || null
      },
      address: {
        cep: formData.cep,
        street: formData.address,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: getTotal(),
      paymentMethod: formData.paymentMethod,
      observation: formData.observation
    };

    addOrder(orderData);

    let message = `🌿 *PEDIDO VERDE NATURE*\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📱 *Telefone:* ${formData.phone}\n\n`;
    message += `📍 *Endereço:*\n`;
    message += `${formData.address}, ${formData.number}\n`;
    if (formData.complement) message += `${formData.complement}\n`;
    message += `${formData.neighborhood} - ${formData.city}/${formData.state}\n`;
    message += `CEP: ${formData.cep}\n\n`;
    message += `📦 *ITENS:*\n`;

    cart.forEach(item => {
      message += `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *TOTAL: R$ ${getTotal().toFixed(2).replace('.', ',')}*\n`;
    message += `💳 *Pagamento:* ${formData.paymentMethod}\n`;
    if (formData.observation) message += `\n📝 *Obs:* ${formData.observation}`;

    const phoneNumber = '5527999505856';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
    setOrderSent(true);
  };

  const isFormValid = () => {
    return formData.name && formData.phone && formData.cep && formData.address && 
           formData.number && formData.neighborhood && formData.city && 
           formData.state && formData.paymentMethod;
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '2px solid #e0ddd5',
    backgroundColor: '#f9f6f0',
    color: '#3d4a3a',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500',
    color: '#4a5c47',
    marginBottom: '6px',
    fontSize: '13px'
  };

  const cardStyle = {
    backgroundColor: '#fdfbf7',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '20px'
  };

  const numberBadgeStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#e8f5e9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a7c43',
    fontWeight: 'bold',
    fontSize: '13px',
    flexShrink: 0
  };

  // Tela de Sucesso
  if (orderSent || cart.length === 0) {
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
          backgroundColor: '#fdfbf7', 
          padding: '32px 24px', 
          borderRadius: '20px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
          maxWidth: '400px', 
          width: '100%',
          textAlign: 'center' 
        }}>
          <div style={{ 
            width: '70px', 
            height: '70px', 
            backgroundColor: '#e8f5e9', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px' 
          }}>
            <span style={{ fontSize: '36px' }}>✅</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '10px' }}>
            Pedido Enviado!
          </h2>
          <p style={{ color: '#5a6c57', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
            Seu pedido foi enviado para o WhatsApp. Aguarde o contato para confirmar.
          </p>
          <Link to="/" style={{ 
            display: 'inline-block', 
            backgroundColor: '#4a7c43', 
            color: '#fff', 
            padding: '14px 24px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            fontSize: '14px' 
          }}>
            🏠 Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '20px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/cart" style={{ color: '#4a7c43', fontWeight: '600', textDecoration: 'none', fontSize: '13px' }}>
            ← Voltar ao carrinho
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d5a27', marginTop: '12px' }}>
            📋 Finalizar Pedido
          </h1>
        </div>

        {/* Botão Ver Resumo (Mobile) */}
        <button
          onClick={() => setShowSummary(!showSummary)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#4a7c43',
            color: '#fff',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          className="show-mobile-only"
        >
          <span>🛒 Ver Resumo ({cart.length} itens)</span>
          <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
        </button>

        {/* Layout Principal */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Coluna do Formulário */}
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            
            {/* Aviso Login */}
            {!isAuthenticated() && (
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '14px 16px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <div>
                  <p style={{ color: '#92400e', fontSize: '13px', fontWeight: '600' }}>
                    Faça login para preencher automaticamente!
                  </p>
                  <p style={{ color: '#a16207', fontSize: '12px', marginTop: '4px' }}>
                    <Link to="/login" style={{ color: '#92400e', fontWeight: '600' }}>Entrar</Link> ou{' '}
                    <Link to="/register" style={{ color: '#92400e', fontWeight: '600' }}>Cadastrar</Link>
                  </p>
                </div>
              </div>
            )}

            {isAuthenticated() && (
              <div style={{
                backgroundColor: '#d1fae5',
                padding: '14px 16px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <p style={{ color: '#065f46', fontSize: '13px' }}>
                  Olá, <strong>{user?.name}</strong>! Dados preenchidos.
                </p>
              </div>
            )}

            {/* 1. Dados Pessoais */}
            <div style={cardStyle}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#2d5a27', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <span style={numberBadgeStyle}>1</span>
                Dados Pessoais
              </h2>
              
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Nome completo *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Seu nome" 
                  style={inputStyle} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="seu@email.com" 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="(00) 00000-0000" 
                    style={inputStyle} 
                  />
                </div>
              </div>
            </div>

            {/* 2. Endereço */}
            <div style={cardStyle}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#2d5a27', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <span style={numberBadgeStyle}>2</span>
                Endereço de Entrega
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={labelStyle}>CEP *</label>
                  <input 
                    type="text" 
                    name="cep" 
                    value={formData.cep} 
                    onChange={handleChange} 
                    onBlur={handleCepBlur} 
                    placeholder="00000-000" 
                    maxLength={9} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Endereço *</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Rua, Avenida..." 
                    style={inputStyle} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={labelStyle}>Nº *</label>
                  <input 
                    type="text" 
                    name="number" 
                    value={formData.number} 
                    onChange={handleChange} 
                    placeholder="123" 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Complemento</label>
                  <input 
                    type="text" 
                    name="complement" 
                    value={formData.complement} 
                    onChange={handleChange} 
                    placeholder="Apto, Bloco..." 
                    style={inputStyle} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Bairro *</label>
                  <input 
                    type="text" 
                    name="neighborhood" 
                    value={formData.neighborhood} 
                    onChange={handleChange} 
                    placeholder="Bairro" 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Cidade *</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    placeholder="Cidade" 
                    style={inputStyle} 
                  />
                </div>
                <div style={{ maxWidth: '80px' }}>
                  <label style={labelStyle}>UF *</label>
                  <select 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                    style={inputStyle}
                  >
                    <option value="">--</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Pagamento */}
            <div style={cardStyle}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#2d5a27', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <span style={numberBadgeStyle}>3</span>
                Forma de Pagamento
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                {['PIX', 'Crédito', 'Débito', 'Boleto'].map((method) => (
                  <label 
                    key={method} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === method ? '#e8f5e9' : '#f9f6f0',
                      border: formData.paymentMethod === method ? '2px solid #4a7c43' : '2px solid #e0ddd5'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      style={{ accentColor: '#4a7c43' }}
                    />
                    <span style={{ fontWeight: '500', color: '#2d5a27', fontSize: '13px' }}>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Observações */}
            <div style={cardStyle}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#2d5a27', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <span style={numberBadgeStyle}>4</span>
                Observações
              </h2>
              <textarea
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                placeholder="Alguma informação adicional..."
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Botão Enviar - Mobile */}
            <button
              onClick={handleWhatsAppOrder}
              disabled={!isFormValid()}
              className="show-mobile-only"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
                backgroundColor: isFormValid() ? '#4a7c43' : '#c5ccc3',
                color: isFormValid() ? '#fff' : '#8a9a87',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}
            >
              <span>📲</span> Enviar via WhatsApp
            </button>
          </div>

          {/* Coluna do Resumo - Desktop */}
          <div style={{ flex: '0 0 320px', minWidth: '280px' }} className="hide-mobile">
            <div style={{ 
              ...cardStyle, 
              position: 'sticky', 
              top: '100px',
              marginBottom: 0
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '16px' }}>
                🛒 Resumo do Pedido
              </h2>

              {/* Lista de Itens */}
              <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '14px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    paddingBottom: '10px', 
                    marginBottom: '10px', 
                    borderBottom: '1px solid #e8e4dc' 
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: '45px', 
                        height: '45px', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }} 
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ 
                        fontWeight: '500', 
                        fontSize: '12px', 
                        color: '#2d5a27',
                        marginBottom: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b7c68' }}>
                        {item.quantity}x R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <p style={{ 
                      fontWeight: 'bold', 
                      fontSize: '12px', 
                      color: '#4a7c43',
                      whiteSpace: 'nowrap'
                    }}>
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div style={{ 
                borderTop: '2px solid #e8e4dc', 
                paddingTop: '14px', 
                marginBottom: '10px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '13px', 
                  color: '#5a6c57',
                  marginBottom: '6px'
                }}>
                  <span>Subtotal</span>
                  <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '13px', 
                  color: '#5a6c57' 
                }}>
                  <span>Frete</span>
                  <span style={{ color: '#4a7c43', fontWeight: '600' }}>
                    {getTotal() >= 150 ? 'Grátis 🎉' : 'A calcular'}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderTop: '2px solid #e8e4dc', 
                paddingTop: '14px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#2d5a27' }}>Total</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4a7c43' }}>
                  R$ {getTotal().toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Botão Enviar */}
              <button
                onClick={handleWhatsAppOrder}
                disabled={!isFormValid()}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  backgroundColor: isFormValid() ? '#4a7c43' : '#c5ccc3',
                  color: isFormValid() ? '#fff' : '#8a9a87',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>📲</span> Enviar via WhatsApp
              </button>

              {!isFormValid() && (
                <p style={{ 
                  fontSize: '11px', 
                  color: '#b85c5c', 
                  textAlign: 'center', 
                  marginTop: '8px' 
                }}>
                  * Preencha os campos obrigatórios
                </p>
              )}

              {/* Selos */}
              <div style={{ 
                borderTop: '1px solid #e8e4dc', 
                marginTop: '16px', 
                paddingTop: '14px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '6px', 
                  fontSize: '11px', 
                  color: '#6b7c68' 
                }}>
                  <span>🔒 Compra Segura</span>
                  <span>✅ Dados Protegidos</span>
                  <span>🚚 Entrega Rápida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Mobile - Modal */}
        {showSummary && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end'
          }} className="show-mobile-only">
            <div style={{
              backgroundColor: '#fdfbf7',
              borderRadius: '20px 20px 0 0',
              padding: '20px',
              width: '100%',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27' }}>
                  🛒 Resumo do Pedido
                </h2>
                <button
                  onClick={() => setShowSummary(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f5f0e8',
                    color: '#6b7c68',
                    fontSize: '18px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Lista de Itens Mobile */}
              {cart.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  paddingBottom: '12px', 
                  marginBottom: '12px', 
                  borderBottom: '1px solid #e8e4dc' 
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      objectFit: 'cover', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      fontWeight: '500', 
                      fontSize: '13px', 
                      color: '#2d5a27',
                      marginBottom: '4px'
                    }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7c68' }}>
                      {item.quantity}x R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <p style={{ 
                    fontWeight: 'bold', 
                    fontSize: '14px', 
                    color: '#4a7c43' 
                  }}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}

              {/* Total Mobile */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderTop: '2px solid #e8e4dc', 
                paddingTop: '16px',
                marginTop: '8px'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d5a27' }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#4a7c43' }}>
                  R$ {getTotal().toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={() => setShowSummary(false)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#4a7c43',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS Responsivo */}
      <style>{`
        .hide-mobile { display: block; }
        .show-mobile-only { display: none; }
        
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default Checkout;