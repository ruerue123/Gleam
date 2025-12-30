import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

function Products({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScent, setSelectedScent] = useState(searchParams.get('scent') || 'All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const scents = [
    { value: 'All', label: 'All Scents' },
    { value: 'EMBER', label: 'Ember' },
    { value: 'ZEST', label: 'Zest' },
    { value: 'SERENE', label: 'Serene' },
    { value: 'ROOT', label: 'Root' }
  ];

  const priceRanges = [
    { value: 'All', label: 'All Prices' },
    { value: '0-20', label: 'Under $20' },
    { value: '20-40', label: '$20 - $40' },
    { value: '40-60', label: '$40 - $60' },
    { value: '60+', label: '$60+' }
  ];

  const availabilityOptions = [
    { value: 'All', label: 'All Products' },
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' }
  ];

  // Fetch all products initially
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setAllProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update selected scent when URL changes
  useEffect(() => {
    const scentFromUrl = searchParams.get('scent');
    if (scentFromUrl) {
      setSelectedScent(scentFromUrl);
    }
  }, [searchParams]);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by scent
    if (selectedScent !== 'All') {
      filtered = filtered.filter(product => product.scentFamily === selectedScent);
    }

    // Filter by price
    if (selectedPrice !== 'All') {
      const [min, max] = selectedPrice.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price < max);
      } else {
        // For '60+' case
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    // Filter by availability
    if (selectedAvailability !== 'All') {
      if (selectedAvailability === 'In Stock') {
        filtered = filtered.filter(product => product.countInStock > 0);
      } else {
        filtered = filtered.filter(product => product.countInStock === 0);
      }
    }

    setProducts(filtered);
  }, [allProducts, selectedScent, selectedPrice, selectedAvailability]);

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
      <style>{`
        @media (max-width: 968px) {
          .products-sidebar {
            display: none !important;
          }
          .products-main-content {
            grid-template-columns: 1fr !important;
          }
          .mobile-scent-filters {
            display: flex !important;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (min-width: 969px) {
          .mobile-scent-filters {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Scent Filters */}
      <div className="mobile-scent-filters" style={{
        display: 'none',
        overflowX: 'auto',
        padding: '1rem 5%',
        gap: '0.5rem',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {scents.map((scent) => (
          <button
            key={scent.value}
            onClick={() => setSelectedScent(scent.value)}
            style={{
              padding: '0.6rem 1.2rem',
              background: selectedScent === scent.value ? '#8B7355' : '#ffffff',
              color: selectedScent === scent.value ? '#ffffff' : '#171515',
              border: selectedScent === scent.value ? 'none' : '1px solid #EDECE4',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px'
            }}
          >
            {scent.label}
          </button>
        ))}
      </div>

      <div className="products-main-content" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: 'clamp(2rem, 4vw, 3rem)',
        padding: '0 5%'
      }}>
        {/* Sidebar */}
        <aside className="products-sidebar" style={{
          paddingTop: '2rem',
          position: 'sticky',
          top: '120px',
          alignSelf: 'start',
          height: 'fit-content'
        }}>
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
              Scent Family
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {scents.map((scent) => (
                <li key={scent.value} style={{ marginBottom: '0.8rem' }}>
                  <button
                    onClick={() => setSelectedScent(scent.value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      color: selectedScent === scent.value ? '#8B7355' : '#171515',
                      opacity: selectedScent === scent.value ? 1 : 0.7,
                      fontWeight: selectedScent === scent.value ? 500 : 400,
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
                      if (selectedScent !== scent.value) {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.color = '#171515';
                      }
                    }}
                  >
                    {scent.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
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
              Price
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {priceRanges.map((range) => (
                <li key={range.value} style={{ marginBottom: '0.8rem' }}>
                  <button
                    onClick={() => setSelectedPrice(range.value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      color: selectedPrice === range.value ? '#8B7355' : '#171515',
                      opacity: selectedPrice === range.value ? 1 : 0.7,
                      fontWeight: selectedPrice === range.value ? 500 : 400,
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
                      if (selectedPrice !== range.value) {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.color = '#171515';
                      }
                    }}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
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
              Availability
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {availabilityOptions.map((option) => (
                <li key={option.value} style={{ marginBottom: '0.8rem' }}>
                  <button
                    onClick={() => setSelectedAvailability(option.value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      color: selectedAvailability === option.value ? '#8B7355' : '#171515',
                      opacity: selectedAvailability === option.value ? 1 : 0.7,
                      fontWeight: selectedAvailability === option.value ? 500 : 400,
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
                      if (selectedAvailability !== option.value) {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.color = '#171515';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ paddingTop: '2rem' }}>
          <h2 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
            fontWeight: 400,
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            letterSpacing: '0.5px',
            color: '#171515'
          }}>
            Showing all {productCount} results
          </h2>

          {/* Products Grid */}
          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}>
            {products.map((product) => {
              const isFavourite = favourites.some(fav => (fav.id || fav._id) === (product.id || product._id));

              return (
                <motion.div
                  key={product._id || product.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#F6F1EB',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }}
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
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {/* Product Image with Quick View */}
                    <div className="product-image-container" style={{
                      width: '100%',
                      height: '320px',
                      position: 'relative',
                      overflow: 'hidden'
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
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3rem',
                          background: 'linear-gradient(to bottom, #F6F1EB 0%, #EDECE4 100%)'
                        }}>
                          {product.emoji || '🕯️'}
                        </div>
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
                          background: 'rgba(255, 255, 255, 0.95)',
                          color: '#171515',
                          border: 'none',
                          padding: '0.6rem 1.2rem',
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          fontFamily: "'Raleway', sans-serif",
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          zIndex: 10,
                          letterSpacing: '0.3px'
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
                      padding: 'clamp(1.2rem, 2vw, 1.5rem)',
                      textAlign: 'center'
                    }}>
                      <h3 style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                        fontWeight: 400,
                        marginBottom: '0.5rem',
                        letterSpacing: '0.5px',
                        color: '#171515'
                      }}>
                        {product.name}
                      </h3>

                      <p style={{
                        fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                        fontStyle: 'italic',
                        opacity: 0.6,
                        marginBottom: '1rem',
                        lineHeight: 1.5,
                        fontWeight: 300,
                        fontFamily: "'Cormorant', serif"
                      }}>
                        {product.description}
                      </p>

                      <div style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        color: '#171515'
                      }}>
                        ${product.price.toFixed(2)}
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (product.countInStock > 0) {
                            onAddToCart(product);
                          }
                        }}
                        disabled={product.countInStock === 0}
                        style={{
                          width: '100%',
                          padding: '0.9rem',
                          background: product.countInStock > 0 ? '#111111' : '#CCCCCC',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50px',
                          fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                          letterSpacing: '0.3px',
                          cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
                          transition: 'all 0.3s',
                          fontWeight: 500,
                          fontFamily: "'Raleway', sans-serif"
                        }}
                        onMouseEnter={(e) => {
                          if (product.countInStock > 0) {
                            e.currentTarget.style.background = '#8B7355';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (product.countInStock > 0) {
                            e.currentTarget.style.background = '#111111';
                          }
                        }}
                      >
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 'clamp(3rem, 6vw, 5rem) 2rem',
              fontFamily: "'Cormorant', serif"
            }}>
              <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                color: '#171515',
                opacity: 0.7,
                fontStyle: 'italic'
              }}>
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .product-image-container:hover .quick-view-overlay {
          opacity: 1 !important;
        }
      `}</style>

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

              {quickViewProduct.countInStock === 0 && (
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  color: '#CC0000',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 500
                }}>
                  Out of Stock
                </p>
              )}

              <div style={{
                display: 'flex',
                gap: 'clamp(0.6rem, 2vw, 1rem)',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => {
                    if (quickViewProduct.countInStock > 0) {
                      onAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }
                  }}
                  disabled={quickViewProduct.countInStock === 0}
                  style={{
                    flex: 1,
                    minWidth: 'clamp(120px, 30vw, 150px)',
                    padding: 'clamp(0.8rem, 2.5vw, 1rem)',
                    background: quickViewProduct.countInStock > 0 ? '#111111' : '#CCCCCC',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    cursor: quickViewProduct.countInStock > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (quickViewProduct.countInStock > 0) {
                      e.currentTarget.style.background = '#8B7355';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (quickViewProduct.countInStock > 0) {
                      e.currentTarget.style.background = '#111111';
                    }
                  }}
                >
                  {quickViewProduct.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
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

export default Products;
