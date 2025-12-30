import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

function Products({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('All Products');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const collections = [
    'All Products',
    'Petty Collection',
    'Soft Feelings',
    'Mood Collection',
    'Luxe Gleam'
  ];

  const fetchProducts = useCallback(async (collection) => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/products`;
      if (collection && collection !== 'All Products') {
        url += `?collection=${encodeURIComponent(collection)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProducts(selectedCollection);
  }, [fetchProducts, selectedCollection]);

  if (loading) {
    return (
      <section id="shop" style={{
        background: 'white',
        padding: 'clamp(3rem, 8vw, 6rem) 5%',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading products...
        </p>
      </section>
    );
  }

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
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        fontStyle: 'italic',
        fontWeight: 300
      }}>
        Light the feeling
      </p>

      {/* Collection Filter Dropdown */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 5%'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            style={{
              width: '100%',
              padding: 'clamp(0.7rem, 1.5vw, 0.9rem) clamp(1rem, 2vw, 1.5rem)',
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              color: '#171515',
              background: '#FAFAF8',
              border: '1px solid #EDECE4',
              borderRadius: '4px',
              cursor: 'pointer',
              appearance: 'none',
              paddingRight: '2.5rem',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8B7355';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 115, 85, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#EDECE4';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8B7355';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 115, 85, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#EDECE4';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {collections.map((collection) => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </select>
          {/* Custom Dropdown Arrow */}
          <div style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#8B7355'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        marginTop: '1rem'
      }}>
        {products.map((product) => {
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
              <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                </div>
              </Link>

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

              {/* Product Details */}
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                    letterSpacing: '0.5px'
                  }}>
                    {product.name}
                  </h3>
                </Link>

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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          onClick={() => {
            setQuickViewProduct(null);
            setSelectedImageIndex(0);
          }}
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
              onClick={() => {
                setQuickViewProduct(null);
                setSelectedImageIndex(0);
              }}
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
              <div>
                {/* Main Image */}
                <div style={{
                  width: '100%',
                  height: '350px',
                  background: '#CFC7BE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  borderRadius: '4px',
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
                    <div>{quickViewProduct.emoji}</div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    padding: '0.5rem 0'
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