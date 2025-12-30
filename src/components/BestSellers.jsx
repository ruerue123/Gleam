import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function BestSellers({ onAddToCart }) {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: '#8B7355' }}>★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: '#8B7355' }}>★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: '#D3C4B4' }}>★</span>
      );
    }

    return stars;
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
          gap: clamp(1rem, 2vw, 1.5rem);
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
          flex: 0 0 300px;
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bestseller-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .bestseller-card {
            flex: 0 0 250px;
          }
        }
      `}</style>

      <div className="bestsellers-scroll-container">
        {bestSellers.map((product) => (
          <div key={product._id || product.id} className="bestseller-card">
            <Link
              to={`/product/${product.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '300px',
                background: 'linear-gradient(to bottom, #F6F1EB 0%, #EDECE4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
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
                padding: 'clamp(1.2rem, 2vw, 1.5rem)',
                textAlign: 'center'
              }}>
                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  {renderStars(product.rating || 4.9)}
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.85rem',
                    color: '#171515',
                    marginLeft: '0.3rem'
                  }}>
                    {product.rating || 4.9}
                  </span>
                  {product.numReviews > 0 && (
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '0.75rem',
                      color: '#171515',
                      opacity: 0.6
                    }}>
                      / {product.numReviews} Reviews
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <h3 style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight: 400,
                  marginBottom: '0.8rem',
                  letterSpacing: '0.5px',
                  color: '#171515'
                }}>
                  {product.name}
                </h3>

                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                    fontWeight: 500,
                    color: '#171515'
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: '#171515',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#8B7355';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#171515';
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </Link>
          </div>
        ))}
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
          SHOP ALL BEST SELLERS
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
