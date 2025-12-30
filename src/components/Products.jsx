import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

function Products({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const categories = [
    { name: 'All', label: 'All Candles' },
    { name: 'Petty Collection', label: 'Petty Collection' },
    { name: 'Soft Feelings', label: 'Soft Feelings' },
    { name: 'Mood Collection', label: 'Mood Collection' },
    { name: 'Luxe Gleam', label: 'Luxe Gleam' }
  ];

  const scents = [
    { value: 'ember', label: 'Ember' },
    { value: 'zest', label: 'Zest' },
    { value: 'serene', label: 'Serene' },
    { value: 'root', label: 'Root' }
  ];

  const fetchProducts = useCallback(async (collection) => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/products`;
      if (collection && collection !== 'All') {
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

  const productCount = products.length;

  if (loading) {
    return (
      <section style={{
        background: '#FAFAF8',
        padding: 'clamp(3rem, 6vw, 5rem) 5%',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <section style={{
      background: '#FAFAF8',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: 'clamp(2rem, 4vw, 3rem)',
        padding: '0 5%'
      }}>
        {/* Sidebar */}
        <aside style={{
          paddingTop: '2rem',
          position: 'sticky',
          top: '120px',
          alignSelf: 'start',
          height: 'fit-content'
        }}>
          {/* Categories */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              fontWeight: 400,
              marginBottom: '1.2rem',
              letterSpacing: '0.5px',
              color: '#171515',
              textTransform: 'uppercase'
            }}>
              Categories
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {categories.map((category) => (
                <li key={category.name} style={{ marginBottom: '0.8rem' }}>
                  <button
                    onClick={() => setSelectedCollection(category.name)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      color: selectedCollection === category.name ? '#8B7355' : '#171515',
                      opacity: selectedCollection === category.name ? 1 : 0.7,
                      fontWeight: selectedCollection === category.name ? 500 : 400,
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = '#8B7355';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCollection !== category.name) {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.color = '#171515';
                      }
                    }}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Scent Families */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              fontWeight: 400,
              marginBottom: '1.2rem',
              letterSpacing: '0.5px',
              color: '#171515',
              textTransform: 'uppercase'
            }}>
              Scent Families
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {scents.map((scent) => (
                <li key={scent.value} style={{ marginBottom: '0.8rem' }}>
                  <Link
                    to={`/scent/${scent.value}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.5rem 0',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      color: '#171515',
                      opacity: 0.7,
                      fontWeight: 400,
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = '#8B7355';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                      e.currentTarget.style.color = '#171515';
                    }}
                  >
                    {scent.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          {/* Header with count */}
          <div style={{
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(139, 115, 85, 0.2)'
          }}>
            <h2 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: '#171515',
              margin: 0
            }}>
              Showing all {productCount} results
            </h2>
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
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
                  {/* Product Image */}
                  <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div
                      className="product-image-container"
                      style={{
                        width: '100%',
                        height: '320px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#CFC7BE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem'
                      }}
                    >
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
                        <div>{product.emoji || '🕯️'}</div>
                      )}

                      {/* Quick View Overlay */}
                      <button
                        className="quick-view-overlay"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuickViewProduct(product);
                          setSelectedImageIndex(0);
                        }}
                        style={{
                          position: 'absolute',
                          bottom: '0.8rem',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: '0.7rem 1.5rem',
                          background: 'rgba(17, 17, 17, 0.9)',
                          color: '#F6F1EB',
                          border: 'none',
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          letterSpacing: '0.5px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: 400,
                          opacity: 0,
                          zIndex: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(156, 122, 78, 0.95)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(17, 17, 17, 0.9)';
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Quick View
                      </button>
                    </div>
                  </Link>

                  <style>{`
                    .product-image-container:hover .quick-view-overlay {
                      opacity: 1;
                    }
                  `}</style>

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
                      zIndex: 3,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
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

                    <button
                      onClick={() => onAddToCart(product)}
                      style={{
                        width: '100%',
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
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

            <div style={{ padding: '2rem' }}>
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

              <div style={{ display: 'flex', gap: '1rem' }}>
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
          </motion.div>
        </div>
      )}

      <style>{`
        @media (max-width: 968px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: static !important;
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Products;
