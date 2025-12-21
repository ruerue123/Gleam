import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

function Products({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const products = [
    {
      id: 1,
      name: 'Blocked & Blessed',
      slug: 'blocked-and-blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      name: 'After the Cry',
      slug: 'after-the-cry',
      collection: 'Soft Feelings',
      description: 'Warm. Safe. The scent of healing after letting it all out.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 3,
      name: 'Unbothered',
      slug: 'unbothered',
      collection: 'Mood Collection',
      description: 'Fresh boundaries. High standards. That\'s the mood.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 4,
      name: 'Velvet Smoke',
      slug: 'velvet-smoke',
      collection: 'Luxe Gleam',
      description: 'Quiet opulence. For those who move in silence.',
      price: 28.00,
      emoji: '🕯️'
    },
    {
      id: 5,
      name: 'I\'m Healed (Mostly)',
      slug: 'im-healed-mostly',
      collection: 'Petty Collection',
      description: 'Growth looks good on you. Even if it\'s still a work in progress.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 6,
      name: 'Warm Milk & Honey',
      slug: 'warm-milk-and-honey',
      collection: 'Soft Feelings',
      description: 'Comfort in a candle. Like a hug that smells delicious.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 7,
      name: 'The Reset',
      slug: 'the-reset',
      collection: 'Mood Collection',
      description: 'New chapter. New energy. Same you, better boundaries.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 8,
      name: 'Quiet Opulence',
      slug: 'quiet-opulence',
      collection: 'Luxe Gleam',
      description: 'Wealth whispers. This is the scent of knowing your worth.',
      price: 28.00,
      emoji: '🕯️'
    }
  ];

  return (
    <section id="shop" style={{
      background: 'white',
      padding: 'clamp(3rem, 8vw, 6rem) 5%'
    }}>
      <h2 style={{
        fontFamily: "'Raleway', sans-serif",
        textAlign: 'center',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 300,
        marginBottom: '1rem',
        letterSpacing: '2px'
      }}>
        Bestsellers
      </h2>

      <p style={{
        textAlign: 'center',
        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
        opacity: 0.7,
        marginBottom: 'clamp(2rem, 5vw, 4rem)',
        fontStyle: 'italic',
        fontWeight: 300
      }}>
        Light the feeling
      </p>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
        marginTop: '3rem'
      }}>
        {products.map((product, index) => {
          const isFavourite = favourites.some(fav => fav.id === product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                background: '#FAFAF8',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
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
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: 'clamp(180px, 30vw, 280px)',
                background: '#CFC7BE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                position: 'relative'
              }}>
                {product.emoji}

                {/* Wishlist Button */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToFavourites(product);
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isFavourite ? {
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: isFavourite ? '#8B7355' : 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 2
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavourite ? "#ffffff" : "none"} stroke={isFavourite ? "#ffffff" : "#8B7355"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Product Details */}
              <div style={{
                padding: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                textAlign: 'center',
                background: '#ffffff',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Collection Link */}
                <Link
                  to={`/collection/${product.slug.split('-')[0]}-collection`}
                  style={{
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#9C7A4E',
                    marginBottom: '0.4rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9C7A4E'}
                >
                  {product.collection}
                </Link>

                {/* Product Name Link */}
                <Link
                  to={`/product/${product.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                    fontWeight: 400,
                    marginBottom: 'clamp(0.4rem, 0.8vw, 0.6rem)',
                    letterSpacing: '0.3px',
                    color: '#171515',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#8B7355'}
                  onMouseLeave={(e) => e.target.style.color = '#171515'}
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  fontWeight: 500,
                  color: '#171515',
                  marginBottom: '1rem'
                }}>
                  ${product.price.toFixed(2)}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: 'auto'
                }}>
                  <motion.button
                    onClick={() => onAddToCart(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: 'clamp(0.6rem, 1.2vw, 0.75rem)',
                      background: '#8B7355',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#6F5943'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#8B7355'}
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    onClick={() => setQuickViewProduct(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: 'clamp(0.6rem, 1.2vw, 0.75rem)',
                      background: 'transparent',
                      color: '#8B7355',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      width: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#8B7355';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
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
                fontSize: '1.5rem',
                color: '#171515',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1
              }}
            >
              ×
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              padding: '2rem'
            }}>
              <div style={{
                width: '100%',
                height: '300px',
                background: '#CFC7BE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                borderRadius: '4px'
              }}>
                {quickViewProduct.emoji}
              </div>

              <div>
                <div style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#9C7A4E',
                  marginBottom: '0.5rem',
                  fontWeight: 500
                }}>
                  {quickViewProduct.collection}
                </div>

                <h2 style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: '2rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  color: '#171515'
                }}>
                  {quickViewProduct.name}
                </h2>

                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: '#171515',
                  opacity: 0.7,
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  {quickViewProduct.description}
                </p>

                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: '#171515',
                  marginBottom: '1.5rem'
                }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => {
                      onAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '1rem 2rem',
                      background: '#8B7355',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: '1rem',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#6F5943'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#8B7355'}
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${quickViewProduct.slug}`}
                    style={{
                      padding: '1rem 2rem',
                      background: 'transparent',
                      color: '#8B7355',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: '1rem',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textDecoration: 'none',
                      display: 'inline-block',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#8B7355';
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Products;