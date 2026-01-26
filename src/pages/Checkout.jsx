import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
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
    let message = `🌿 *PEDIDO VERDE NATURE*\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
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
    padding: '14px 18px',
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
    marginBottom: '8px',
    fontSize: '14px'
  };

  const cardStyle = {
    backgroundColor: '#fdfbf7',
    padding: '28px',
    borderRadius: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '24px'
  };

  const numberBadgeStyle = {
    width: '36px',
    height: '36px',
    backgroundColor: '#e8f5e9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a7c43',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  // Tela de Sucesso
  if (orderSent || cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ backgroundColor: '#fdfbf7', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <span style={{ fontSize: '40px' }}>✅</span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '12px' }}>Pedido Enviado!</h2>
          <p style={{ color: '#5a6c57', marginBottom: '28px', fontSize: '15px', lineHeight: '1.6' }}>
            Seu pedido foi enviado para o WhatsApp da Verde Nature. Aguarde o contato para confirmar.
          </p>
          <Link to="/" style={{ display: 'inline-block', backgroundColor: '#4a7c43', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px' }}>
            🏠 Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '40px' }}>
        
        {/* Coluna do Formulário */}
        <div style={{ flex: 1, maxWidth: '680px' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <Link to="/cart" style={{ color: '#4a7c43', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
              ← Voltar ao carrinho
            </Link>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d5a27', marginTop: '16px' }}>📋 Finalizar Pedido</h1>
            <p style={{ color: '#6b7c68', marginTop: '8px', fontSize: '15px' }}>Preencha seus dados para enviar via WhatsApp</p>
          </div>

          {/* 1. Dados Pessoais */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={numberBadgeStyle}>1</span>
              Dados Pessoais
            </h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Nome completo *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite seu nome" style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(00) 00000-0000" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* 2. Endereço */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={numberBadgeStyle}>2</span>
              Endereço de Entrega
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>CEP *</label>
                <input type="text" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="00000-000" maxLength={9} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Endereço *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Rua, Avenida..." style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Número *</label>
                <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="123" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Complemento</label>
                <input type="text" name="complement" value={formData.complement} onChange={handleChange} placeholder="Apto, Bloco..." style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Bairro *</label>
                <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Bairro" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Cidade *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Cidade" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>UF *</label>
                <select name="state" value={formData.state} onChange={handleChange} style={inputStyle}>
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
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={numberBadgeStyle}>3</span>
              Forma de Pagamento
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'].map((method) => (
                <label key={method} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: formData.paymentMethod === method ? '#e8f5e9' : '#f9f6f0',
                  border: formData.paymentMethod === method ? '2px solid #4a7c43' : '2px solid #e0ddd5'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                    style={{ accentColor: '#4a7c43' }}
                  />
                  <span style={{ fontWeight: '500', color: '#2d5a27', fontSize: '14px' }}>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Observações */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
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

        </div>

        {/* Coluna do Resumo - Direita */}
        <div style={{ width: '340px', flexShrink: 0 }}>
          <div style={{ 
            ...cardStyle, 
            position: 'sticky', 
            top: '24px',
            marginRight: '30px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5a27', marginBottom: '20px' }}>
              🛒 Resumo do Pedido
            </h2>

            {/* Lista de Itens */}
            <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '16px' }}>
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
                    fontSize: '13px', 
                    color: '#4a7c43' 
                  }}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal e Frete */}
            <div style={{ 
              borderTop: '2px solid #e8e4dc', 
              paddingTop: '16px', 
              marginBottom: '12px' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px', 
                color: '#5a6c57',
                marginBottom: '8px'
              }}>
                <span>Subtotal</span>
                <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px', 
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
              paddingTop: '16px',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d5a27' }}>Total</span>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#4a7c43' }}>
                R$ {getTotal().toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Botão Enviar */}
            <button
              onClick={handleWhatsAppOrder}
              disabled={!isFormValid()}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '15px',
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
                fontSize: '12px', 
                color: '#b85c5c', 
                textAlign: 'center', 
                marginTop: '10px' 
              }}>
                * Preencha os campos obrigatórios
              </p>
            )}

            {/* Selos */}
            <div style={{ 
              borderTop: '1px solid #e8e4dc', 
              marginTop: '20px', 
              paddingTop: '16px' 
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px', 
                fontSize: '12px', 
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
    </div>
  );
}

export default Checkout;              