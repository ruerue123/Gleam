import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function CartPage({ cart, onUpdateQuantity, onRemove, onClearCart }) {
  const { user, token } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleWhatsAppCheckout = async () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }

    setIsProcessing(true);
    // Group items by product to show quantity
    const groupedItems = cart.reduce((acc, item) => {
      const key = item._id || item.id || item.name;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 1 };
      } else {
        acc[key].quantity += 1;
      }
      return acc;
    }, {});

    // Build order summary message
    let message = '*🕯️ GLEAM CANDLES - New Order*%0A%0A';
    message += '*Order Summary:*%0A';
    message += '━━━━━━━━━━━━━━━%0A%0A';

    Object.values(groupedItems).forEach((item) => {
      message += `*${item.name}*%0A`;
      message += `Collection: ${item.collection}%0A`;
      message += `Quantity: ${item.quantity}%0A`;
      message += `Price: $${item.price.toFixed(2)} each%0A`;
      message += `Subtotal: $${(item.price * item.quantity).toFixed(2)}%0A`;
      message += '━━━━━━━━━━━━━━━%0A';
    });

    message += `%0A*Order Total:*%0A`;
    message += `Subtotal: $${subtotal.toFixed(2)}%0A`;
    message += `Shipping: ${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}%0A`;
    message += `*Total: $${total.toFixed(2)}*%0A%0A`;

    message += '_Please provide your delivery address and preferred delivery time._';

    // WhatsApp business number
    const whatsappNumber = '263718125084';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    try {
      // Save order to database
      const orderItems = Object.values(groupedItems).map(item => ({
        product: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.emoji
      }));

      const orderData = {
        orderItems,
        shippingAddress: {},
        paymentMethod: 'whatsapp',
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: 0,
        totalPrice: total
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear the cart after successful order
        setTimeout(() => {
          if (onClearCart) {
            onClearCart();
          }

          // Show success message
          setShowSuccess(true);
          setIsProcessing(false);
          setTimeout(() => setShowSuccess(false), 5000);
        }, 100);
      } else {
        alert(data.message || 'Failed to create order');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{
        paddingTop: 'clamp(90px, 10vw, 110px)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        background: '#FAFAF8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '0 5%'
        }}>
          <h1 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            marginBottom: '1rem',
            color: '#171515'
          }}>
            Your Cart is Empty
          </h1>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#171515',
            opacity: 0.7,
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            Start shopping to add items to your cart
          </p>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.2rem, 5vw, 3rem)',
              background: '#8B7355',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              fontFamily: "'Cormorant', serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              border: '1px solid #8B7355'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6F5943';
              e.currentTarget.style.borderColor = '#6F5943';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8B7355';
              e.currentTarget.style.borderColor = '#8B7355';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: 'clamp(90px, 10vw, 110px)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#FAFAF8',
      minHeight: '100vh'
    }}>
      {/* Success Notification */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#25D366',
          color: '#ffffff',
          padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontWeight: 500,
          textAlign: 'center',
          animation: 'slideIn 0.3s ease-out',
          maxWidth: '90%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>Order sent successfully! We'll contact you on WhatsApp shortly.</span>
          </div>
        </div>
      )}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5%'
      }}>
        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 400,
          marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
          letterSpacing: '0.5px',
          color: '#171515'
        }}>
          Shopping Cart
        </h1>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          color: '#171515',
          opacity: 0.75,
          marginBottom: 'clamp(3rem, 6vw, 4rem)',
          fontStyle: 'italic',
          fontWeight: 300
        }}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(2rem, 4vw, 3rem)',
          '@media (min-width: 768px)': {
            gridTemplateColumns: '2fr 1fr'
          }
        }}>
          {/* Cart Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '4px',
                  border: '1px solid #EDECE4',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: 'clamp(1rem, 2vw, 1.5rem)',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  {item.emoji || '🕯️'}
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 400,
                    marginBottom: '0.3rem',
                    color: '#171515'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                    color: '#8B7355',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem'
                  }}>
                    {item.collection}
                  </p>
                  <p style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    fontWeight: 500,
                    color: '#171515'
                  }}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onRemove && onRemove(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#171515',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    opacity: 0.5,
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            background: '#ffffff',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '4px',
            border: '1px solid #EDECE4',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            height: 'fit-content',
            position: 'sticky',
            top: 'clamp(6rem, 12vw, 8rem)'
          }}>
            <h2 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
              fontWeight: 400,
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#171515'
            }}>
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #EDECE4'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                color: '#171515'
              }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                color: '#171515'
              }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
              fontWeight: 500,
              color: '#171515',
              marginBottom: '1.5rem'
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {subtotal < 50 && (
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                color: '#8B7355',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <button
              onClick={handleWhatsAppCheckout}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                background: isProcessing ? '#A8A8A8' : '#25D366',
                color: '#ffffff',
                border: isProcessing ? '1px solid #A8A8A8' : '1px solid #25D366',
                borderRadius: '2px',
                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                fontFamily: "'Cormorant', serif",
                fontWeight: 500,
                letterSpacing: '0.5px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: isProcessing ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.background = '#20BA5A';
                  e.currentTarget.style.borderColor = '#20BA5A';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.background = '#25D366';
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Checkout via WhatsApp
                </>
              )}
            </button>

            <Link
              to="/products"
              style={{
                display: 'block',
                marginTop: '1rem',
                textAlign: 'center',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                color: '#8B7355',
                textDecoration: 'none',
                fontStyle: 'italic'
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
