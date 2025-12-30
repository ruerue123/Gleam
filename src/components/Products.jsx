import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('All');

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
            {products.map((product) => (
              <Link
                key={product._id || product.id}
                to={`/product/${product.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#ffffff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  border: '1px solid rgba(139, 115, 85, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Product Image */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(to bottom, #F6F1EB 0%, #EDECE4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                    <div style={{ fontSize: '3rem' }}>
                      {product.emoji || '🕯️'}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div style={{
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  {/* Collection Badge */}
                  {product.collection && (
                    <div style={{
                      fontSize: '0.75rem',
                      fontFamily: "'Raleway', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: '#8B7355',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      {product.collection}
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                    letterSpacing: '0.5px',
                    color: '#171515'
                  }}>
                    {product.name}
                  </h3>

                  {/* Colors Available */}
                  {product.colors && product.colors.length > 0 && (
                    <div style={{
                      fontSize: '0.8rem',
                      fontFamily: "'Raleway', sans-serif",
                      color: '#171515',
                      opacity: 0.6,
                      marginBottom: '0.8rem'
                    }}>
                      {product.colors.length} Colours
                    </div>
                  )}

                  {/* Price */}
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    color: '#171515'
                  }}>
                    ${product.price.toFixed(2)}
                  </div>

                  {/* Select Options Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      background: 'transparent',
                      color: '#8B7355',
                      border: '1px solid #8B7355',
                      borderRadius: '2px',
                      fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: 500,
                      fontFamily: "'Raleway', sans-serif",
                      textTransform: 'uppercase'
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
                    Select Options
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

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
