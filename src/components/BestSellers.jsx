import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function BestSellers({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Collection name to slug mapping
  const collectionSlugMap = {
    'Petty Collection': 'petty-collection',
    'Soft Feelings': 'soft-feelings',
    'Mood Collection': 'mood-collection',
    'Luxe Gleam': 'luxe-gleam'
  };

  const bestSellers = [
    {
      id: 1,
      slug: 'blocked-and-blessed',
      name: 'Blocked & Blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 3,
      slug: 'unbothered',
      name: 'Unbothered',
      collection: 'Mood Collection',
      description: 'Fresh boundaries. High standards. That\'s the mood.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 4,
      slug: 'velvet-smoke',
      name: 'Velvet Smoke',
      collection: 'Luxe Gleam',
      description: 'Quiet opulence. For those who move in silence.',
      price: 28.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      slug: 'after-the-cry',
      name: 'After the Cry',
      collection: 'Soft Feelings',
      description: 'Warm. Safe. The scent of healing after letting it all out.',
      price: 15.00,
      emoji: '🕯️'
    }
  ];

  return (
    <section style={{
      background: '#FAFAF8',
      padding: 'clamp(4rem, 10vw, 8rem) 5%'
    }}>
      <h2 style={{
        fontFamily: "'Cardo', serif",
        textAlign: 'center',
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 400,
        marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
        letterSpacing: '0.5px',
        color: '#171515'
      }}>
        Bestsellers
      </h2>

      <p style={{
        textAlign: 'center',
        fontFamily: "'Cormorant', serif",
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        color: '#171515',
        opacity: 0.75,
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
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
        {bestSellers.map((product) => {
          const isFavourite = favourites.some(fav => fav.id === product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6 }}
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
            >
              {/* Product Image with Wishlist Button */}
              <div style={{
                width: '100%',
                height: 'clamp(180px, 30vw, 240px)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3rem)'
                }}>
                  {product.emoji || '🕯️'}
                </div>

                {/* Wishlist Heart Button */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToFavourites(product);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: '0.8rem',
                    right: '0.8rem',
                    background: isFavourite ? '#8B7355' : 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #EDECE4',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isFavourite ? "#ffffff" : "none"}
                    stroke={isFavourite ? "#ffffff" : "#8B7355"}
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Product Details */}
              <div style={{
                padding: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                textAlign: 'center',
                background: '#ffffff',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Collection Link */}
                <Link
                  to={`/collection/${collectionSlugMap[product.collection]}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: 'clamp(0.75rem, 1.3vw, 0.8rem)',
                    fontFamily: "'Cormorant', serif",
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: '#8B7355',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {product.collection}
                </Link>

                {/* Product Name Link */}
                <Link
                  to={`/product/${product.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                    fontWeight: 400,
                    marginBottom: 'clamp(0.4rem, 0.8vw, 0.6rem)',
                    letterSpacing: '0.3px',
                    color: '#171515',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* Description */}
                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                  color: '#171515',
                  opacity: 0.7,
                  lineHeight: 1.5,
                  fontWeight: 300,
                  marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                  fontStyle: 'italic'
                }}>
                  {product.description}
                </p>

                {/* Price */}
                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 500,
                  marginBottom: 'clamp(0.8rem, 1.5vw, 1rem)',
                  color: '#171515'
                }}>
                  ${product.price.toFixed(2)}
                </div>

                {/* Action Buttons */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  gap: '0.6rem'
                }}>
                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                      background: '#8B7355',
                      color: '#ffffff',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: 'clamp(0.85rem, 1.4vw, 0.9rem)',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6F5943';
                      e.currentTarget.style.borderColor = '#6F5943';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                      e.currentTarget.style.borderColor = '#8B7355';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Add to Cart
                  </motion.button>

                  {/* Quick View Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                      background: 'transparent',
                      color: '#8B7355',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      width: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#8B7355';
                    }}
                    aria-label="Quick View"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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

      <div style={{
        textAlign: 'center',
        marginTop: 'clamp(3rem, 6vw, 4.5rem)'
      }}>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.2rem, 5vw, 3rem)',
            background: 'transparent',
            color: '#8B7355',
            textDecoration: 'none',
            borderRadius: '2px',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            fontFamily: "'Cormorant', serif",
            fontWeight: 500,
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            border: '1px solid #8B7355'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#8B7355';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#8B7355';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View All Products
        </Link>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '4px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #EDECE4',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B7355';
                  e.currentTarget.style.borderColor = '#8B7355';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.borderColor = '#EDECE4';
                }}
                aria-label="Close quick view"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '300px',
                background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                {quickViewProduct.emoji || '🕯️'}
              </div>

              {/* Product Details */}
              <div style={{ padding: '2rem' }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontFamily: "'Cormorant', serif",
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  color: '#8B7355',
                  marginBottom: '0.5rem',
                  fontWeight: 500
                }}>
                  {quickViewProduct.collection}
                </div>

                <h3 style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: '2rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  letterSpacing: '0.3px',
                  color: '#171515'
                }}>
                  {quickViewProduct.name}
                </h3>

                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: '#171515',
                  opacity: 0.7,
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>
                  {quickViewProduct.description}
                </p>

                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                  color: '#171515'
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
                      padding: '1rem',
                      background: '#8B7355',
                      color: '#ffffff',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: '1rem',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6F5943';
                      e.currentTarget.style.borderColor = '#6F5943';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                      e.currentTarget.style.borderColor = '#8B7355';
                    }}
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${quickViewProduct.slug}`}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'transparent',
                      color: '#8B7355',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: '1rem',
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BestSellers;
