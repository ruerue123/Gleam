import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function BestSellers({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Collection name to slug mapping
  const collectionSlugMap = {
    'Petty Collection': 'petty-collection',
    'Soft Feelings': 'soft-feelings',
    'Mood Collection': 'mood-collection',
    'Luxe Gleam': 'luxe-gleam'
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products?featured=true&limit=4`);
      const data = await response.json();
      if (data.success) {
        setBestSellers(data.data);
      }
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section style={{
        background: '#FAFAF8',
        padding: 'clamp(4rem, 10vw, 8rem) 5%',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading bestsellers...
        </p>
      </section>
    );
  }

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
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginTop: '3rem',
        justifyContent: 'center'
      }}>
        {bestSellers.map((product) => {
          const isFavourite = favourites.some(fav => (fav.id || fav._id) === (product.id || product._id));

          return (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#F6F1EB',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Product Image with Wishlist Button */}
              <div style={{
                width: '100%',
                height: '320px',
                position: 'relative',
                overflow: 'hidden',
                background: '#CFC7BE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3rem)'
                  }}>
                    {product.emoji || '🕯️'}
                  </div>
                )}

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
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <h3 style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.5px'
                }}>
                  {product.name}
                </h3>

                <p style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                  fontStyle: 'italic',
                  opacity: 0.6,
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                  fontWeight: 300,
                  flex: 1
                }}>
                  {product.description}
                </p>

                <div style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 500,
                  marginBottom: '1rem'
                }}>
                  ${product.price.toFixed(2)}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => onAddToCart(product)}
                    style={{
                      flex: 1,
                      padding: '0.9rem',
                      background: '#111111',
                      color: '#F6F1EB',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: 400
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#9C7A4E';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#111111';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      setQuickViewProduct(product);
                      setSelectedImageIndex(0);
                    }}
                    style={{
                      padding: '0.9rem',
                      background: 'transparent',
                      color: '#111111',
                      border: '1px solid #111111',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#111111';
                      e.currentTarget.style.color = '#F6F1EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#111111';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
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
            onClick={() => {
              setQuickViewProduct(null);
              setSelectedImageIndex(0);
            }}
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
                onClick={() => {
                  setQuickViewProduct(null);
                  setSelectedImageIndex(0);
                }}
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
              <div>
                {/* Main Image */}
                <div style={{
                  width: '100%',
                  height: '350px',
                  background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  {quickViewProduct.images && quickViewProduct.images.length > 0 ? (
                    <img
                      src={quickViewProduct.images[selectedImageIndex]}
                      alt={quickViewProduct.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  ) : (
                    <div>{quickViewProduct.emoji || '🕯️'}</div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    padding: '0.5rem 1rem'
                  }}>
                    {quickViewProduct.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        style={{
                          width: '70px',
                          height: '70px',
                          padding: 0,
                          border: idx === selectedImageIndex ? '2px solid #8B7355' : '2px solid transparent',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          flexShrink: 0,
                          background: '#CFC7BE',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (idx !== selectedImageIndex) {
                            e.currentTarget.style.borderColor = '#D3C4B4';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (idx !== selectedImageIndex) {
                            e.currentTarget.style.borderColor = 'transparent';
                          }
                        }}
                      >
                        <img
                          src={image}
                          alt={`${quickViewProduct.name} view ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
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
