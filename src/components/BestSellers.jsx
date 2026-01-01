import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function BestSellers({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products?featured=true&limit=6`);
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
        background: '#ffffff',
        padding: 'clamp(3rem, 6vw, 5rem) 5%',
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
      background: '#ffffff',
      padding: 'clamp(3rem, 6vw, 5rem) 0'
    }}>
      <div style={{ padding: '0 5%' }}>
        <h2 style={{
          fontFamily: "'Cardo', serif",
          textAlign: 'center',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 400,
          marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          letterSpacing: '0.5px',
          color: '#171515'
        }}>
          Best Sellers
        </h2>
      </div>

      <style>{`
        .bestsellers-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: clamp(0.8rem, 2vw, 1.5rem);
          padding: 0 5% clamp(1rem, 2vw, 1.5rem);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #8B7355 #EDECE4;
        }

        .bestsellers-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .bestsellers-scroll-container::-webkit-scrollbar-track {
          background: #EDECE4;
          border-radius: 4px;
        }

        .bestsellers-scroll-container::-webkit-scrollbar-thumb {
          background: #8B7355;
          border-radius: 4px;
        }

        .bestsellers-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #6F5943;
        }

        .bestseller-card {
          flex: 0 0 280px;
          scroll-snap-align: start;
          background: #F6F1EB;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .bestseller-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .bestseller-image-container {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .bestseller-quick-view-overlay {
          position: absolute;
          bottom: 0.8rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #171515;
          border: none;
          padding: 0.6rem 1.2rem;
          borderRadius: 50px;
          fontSize: 0.85rem;
          fontFamily: "'Raleway', sans-serif";
          fontWeight: 500;
          cursor: pointer;
          display: flex;
          alignItems: center;
          gap: 0.4rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          zIndex: 10;
          letterSpacing: 0.3px;
        }

        .bestseller-card:hover .bestseller-quick-view-overlay {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .bestseller-card {
            flex: 0 0 220px;
          }
          .bestseller-image-container {
            height: 220px;
          }
        }

        @media (max-width: 480px) {
          .bestseller-card {
            flex: 0 0 180px;
          }
          .bestseller-image-container {
            height: 180px;
          }
        }
      `}</style>

      <div className="bestsellers-scroll-container">
        {bestSellers.map((product) => {
          const isFavourite = favourites.some(fav => (fav.id || fav._id) === (product.id || product._id));

          return (
            <motion.div
              key={product._id || product.id}
              className="bestseller-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
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
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isFavourite ? "#ffffff" : "none"}
                  stroke={isFavourite ? "#ffffff" : "#8B7355"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>

              <Link
                to={`/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                {/* Product Image with Quick View */}
                <div className="bestseller-image-container">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem'
                    }}>
                      {product.emoji || '🕯️'}
                    </div>
                  )}

                  {/* Quick View Overlay */}
                  <button
                    className="bestseller-quick-view-overlay"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(product);
                      setSelectedImageIndex(0);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Quick View
                  </button>
                </div>

                {/* Product Details */}
                <div style={{
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <h3 style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                    letterSpacing: '0.5px',
                    color: '#171515'
                  }}>
                    {product.name}
                  </h3>

                  <p style={{
                    fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)',
                    fontStyle: 'italic',
                    opacity: 0.6,
                    marginBottom: '0.8rem',
                    lineHeight: 1.4,
                    fontWeight: 300,
                    fontFamily: "'Cormorant', serif",
                    flex: 1
                  }}>
                    {product.description}
                  </p>

                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                    fontWeight: 500,
                    marginBottom: '0.8rem',
                    color: '#171515',
                    marginTop: 'auto'
                  }}>
                    ${product.price.toFixed(2)}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    style={{
                      width: '100%',
                      padding: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                      background: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)',
                      letterSpacing: '0.3px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: 500,
                      fontFamily: "'Raleway', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8B7355';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#111111';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Shop All Button */}
      <div style={{
        textAlign: 'center',
        marginTop: 'clamp(2.5rem, 5vw, 4rem)',
        padding: '0 5%'
      }}>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2.5rem, 5vw, 3.5rem)',
            background: '#171515',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '2px',
            fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            border: '2px solid #171515',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#8B7355';
            e.currentTarget.style.borderColor = '#8B7355';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#171515';
            e.currentTarget.style.borderColor = '#171515';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          SHOP ALL 
        </Link>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'clamp(0.5rem, 2vw, 1rem)'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{
                position: 'absolute',
                top: 'clamp(0.5rem, 2vw, 1rem)',
                right: 'clamp(0.5rem, 2vw, 1rem)',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: 'clamp(30px, 8vw, 36px)',
                height: 'clamp(30px, 8vw, 36px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                color: '#171515',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              ×
            </button>

            <div style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
              <div style={{
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#F6F1EB'
              }}>
                {quickViewProduct.images && quickViewProduct.images.length > 0 ? (
                  <img
                    src={quickViewProduct.images[selectedImageIndex]}
                    alt={quickViewProduct.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: 'clamp(250px, 50vw, 400px)',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: 'clamp(200px, 40vw, 300px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)'
                  }}>
                    {quickViewProduct.emoji || '🕯️'}
                  </div>
                )}
              </div>

              {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {quickViewProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      style={{
                        width: 'clamp(45px, 12vw, 60px)',
                        height: 'clamp(45px, 12vw, 60px)',
                        border: selectedImageIndex === index ? '2px solid #8B7355' : '2px solid #EDECE4',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#F6F1EB',
                        padding: 0
                      }}
                    >
                      <img
                        src={image}
                        alt={`${quickViewProduct.name} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              <h2 style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
                fontWeight: 400,
                marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                color: '#171515',
                letterSpacing: '0.5px'
              }}>
                {quickViewProduct.name}
              </h2>

              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                fontStyle: 'italic',
                opacity: 0.7,
                marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                lineHeight: 1.6
              }}>
                {quickViewProduct.description}
              </p>

              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
                fontWeight: 600,
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                color: '#171515'
              }}>
                ${quickViewProduct.price.toFixed(2)}
              </div>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.6rem, 2vw, 1rem)',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => {
                    onAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  style={{
                    flex: 1,
                    minWidth: 'clamp(120px, 30vw, 150px)',
                    padding: 'clamp(0.8rem, 2.5vw, 1rem)',
                    background: '#111111',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#8B7355';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#111111';
                  }}
                >
                  Add to Cart
                </button>

                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  style={{
                    flex: 1,
                    minWidth: 'clamp(120px, 30vw, 150px)',
                    padding: 'clamp(0.8rem, 2.5vw, 1rem)',
                    background: 'transparent',
                    color: '#171515',
                    border: '2px solid #171515',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#171515';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#171515';
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default BestSellers;
