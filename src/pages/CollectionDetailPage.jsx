import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

function CollectionDetailPage({ onAddToCart }) {
  const { slug } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const scents = {
    'ember': {
      name: 'EMBER',
      image: '/images/Ember.jpg',
      description: 'Warm notes that wrap your space in calm and comfort',
      color: 'linear-gradient(135deg, #A96A7B 0%, rgba(169, 106, 123, 0.7) 100%)',
      subtitle: 'Spicy sweet notes made to bring warmth to your space'
    },
    'zest': {
      name: 'ZEST',
      image: '/images/Zest.jpg',
      description: 'Clean, vibrant fragrances that brighten your space and mood.',
      color: 'linear-gradient(135deg, #9C7A4E 0%, rgba(156, 122, 78, 0.7) 100%)',
      subtitle: 'Energizing citrus scents that uplift and invigorate'
    },
    'serene': {
      name: 'SERENE',
      image: '/images/Serene.jpg',
      description: 'Soft, therapeutic blends designed for peace and relaxation.',
      color: 'linear-gradient(135deg, #E7CFC3 0%, rgba(231, 207, 195, 0.7) 100%)',
      subtitle: 'Gentle aromas that create a sanctuary of calm'
    },
    'root': {
      name: 'ROOT',
      image: '/images/Root.jpg',
      description: 'Rich aromas that ground your space and linger beautifully.',
      color: 'linear-gradient(135deg, #C6A75E 0%, rgba(198, 167, 94, 0.7) 100%)',
      subtitle: 'Earthy tones that anchor and center your environment'
    }
  }

  const scent = scents[slug]

  const fetchScentProducts = useCallback(async () => {
    if (!scent) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/products?scentFamily=${encodeURIComponent(scent.name)}`)
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching scent products:', error)
    } finally {
      setLoading(false)
    }
  }, [API_URL, scent])

  useEffect(() => {
    fetchScentProducts()
  }, [fetchScentProducts])

  if (!scent) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '120px', textAlign: 'center' }}>
        <h1>Scent family not found</h1>
        <Link to="/">Return Home</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero Section - Full Width with Image */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '500px',
        background: scent.color
      }}>
        {/* Left: Image */}
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '400px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <img
              src={scent.image}
              alt={scent.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 4rem)',
          color: '#171515'
        }}>
          <h1 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 400,
            letterSpacing: '1px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            lineHeight: 1.1
          }}>
            {scent.name}
          </h1>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.7,
            marginBottom: '1rem',
            fontStyle: 'italic',
            fontWeight: 300,
            opacity: 0.9
          }}>
            {scent.subtitle}
          </p>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.6,
            fontWeight: 300,
            opacity: 0.85,
            maxWidth: '500px'
          }}>
            {scent.description}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .scent-hero {
            grid-template-columns: 1fr !important;
          }
          .scent-hero-image {
            min-height: 350px !important;
          }
        }
      `}</style>

      {/* Products Grid */}
      {loading ? (
        <div style={{
          padding: 'clamp(3rem, 6vw, 5rem) 5%',
          textAlign: 'center',
          fontFamily: "'Cormorant', serif",
          fontSize: '1.2rem',
          color: '#8B7355'
        }}>
          Loading products...
        </div>
      ) : (
        <div style={{
          padding: 'clamp(3rem, 6vw, 5rem) 5%',
          background: '#FAFAF8'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
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
                  display: 'block'
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
                <div style={{
                  width: '100%',
                  height: '320px',
                  background: 'linear-gradient(to bottom, #F6F1EB 0%, #EDECE4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
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
                    <div>{product.emoji}</div>
                  )}
                </div>

                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 400,
                    marginBottom: '0.5rem',
                    letterSpacing: '0.5px',
                    color: '#171515'
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
                    fontFamily: "'Cormorant', serif"
                  }}>
                    {product.description}
                  </p>

                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
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
                      onAddToCart(product);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      background: '#171515',
                      color: '#ffffff',
                      border: 'none',
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
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#171515';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionDetailPage
