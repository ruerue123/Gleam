import { Link } from 'react-router-dom'

function FavouritesPage({ favourites, onRemove, onAddToCart }) {
  if (favourites.length === 0) {
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
            No Favourites Yet
          </h1>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#171515',
            opacity: 0.7,
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            Start adding items to your wishlist
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
            Explore Products
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
          My Favourites
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
          {favourites.length} {favourites.length === 1 ? 'item' : 'items'} saved
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {favourites.map((product, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              <button
                onClick={() => onRemove && onRemove(index)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B7355';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#8B7355' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              <div style={{
                width: '100%',
                height: 'clamp(220px, 35vw, 280px)',
                background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                overflow: 'hidden'
              }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                ) : (
                  <div>{product.emoji || '🕯️'}</div>
                )}
              </div>

              <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div style={{
                  fontSize: 'clamp(0.75rem, 1.3vw, 0.8rem)',
                  fontFamily: "'Cormorant', serif",
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  color: '#8B7355',
                  marginBottom: '0.6rem',
                  fontWeight: 500
                }}>
                  {product.collection}
                </div>

                <h3 style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 400,
                  marginBottom: 'clamp(0.5rem, 1vw, 0.7rem)',
                  letterSpacing: '0.3px',
                  color: '#171515'
                }}>
                  {product.name}
                </h3>

                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  fontStyle: 'italic',
                  color: '#171515',
                  opacity: 0.7,
                  marginBottom: 'clamp(1rem, 2vw, 1.3rem)',
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>
                  {product.description}
                </p>

                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                  fontWeight: 500,
                  marginBottom: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#171515'
                }}>
                  ${product.price.toFixed(2)}
                </div>

                <button
                  onClick={() => onAddToCart && onAddToCart(product)}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.8rem, 1.8vw, 1rem)',
                    background: '#8B7355',
                    color: '#ffffff',
                    border: '1px solid #8B7355',
                    borderRadius: '2px',
                    fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
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
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavouritesPage;
