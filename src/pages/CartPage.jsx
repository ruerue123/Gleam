import { Link } from 'react-router-dom'

function CartPage({ cart, onUpdateQuantity, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div style={{
        paddingTop: 'clamp(5rem, 10vw, 7rem)',
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
      paddingTop: 'clamp(5rem, 10vw, 7rem)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#FAFAF8',
      minHeight: '100vh'
    }}>
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
              style={{
                width: '100%',
                padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                background: '#8B7355',
                color: '#ffffff',
                border: '1px solid #8B7355',
                borderRadius: '2px',
                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                fontFamily: "'Cormorant', serif",
                fontWeight: 500,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
              Proceed to Checkout
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
