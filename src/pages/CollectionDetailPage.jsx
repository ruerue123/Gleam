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
      image: '/images/Petty.png',
      description: 'Warm notes that wrap your space in calm and comfort',
      color: 'linear-gradient(135deg, #A96A7B 0%, rgba(169, 106, 123, 0.7) 100%)'
    },
    'zest': {
      name: 'ZEST',
      image: '/images/Mood.png',
      description: 'Clean, vibrant fragrances that brighten your space and mood.',
      color: 'linear-gradient(135deg, #9C7A4E 0%, rgba(156, 122, 78, 0.7) 100%)'
    },
    'serene': {
      name: 'SERENE',
      image: '/images/Soft.png',
      description: 'Soft, therapeutic blends designed for peace and relaxation.',
      color: 'linear-gradient(135deg, #E7CFC3 0%, rgba(231, 207, 195, 0.7) 100%)'
    },
    'root': {
      name: 'ROOT',
      image: '/images/Luxe.png',
      description: 'Rich aromas that ground your space and linger beautifully.',
      color: 'linear-gradient(135deg, #C6A75E 0%, rgba(198, 167, 94, 0.7) 100%)'
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
        <div style={{
          background: scent.color,
          padding: '4rem 5%',
          textAlign: 'center',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '300px',
            height: '300px',
            margin: '0 auto 2rem',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
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
          <h1 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '0.5px',
            marginBottom: '1rem',
            color: '#171515'
          }}>
            {scent.name}
          </h1>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto',
            fontStyle: 'italic',
            fontWeight: 300
          }}>
            {scent.description}
          </p>
        </div>
        <div style={{ textAlign: 'center', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading products...
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <div style={{
        background: scent.color,
        padding: '4rem 5%',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          height: '300px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
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
        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          letterSpacing: '0.5px',
          marginBottom: '1rem',
          color: '#171515'
        }}>
          {scent.name}
        </h1>
        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          opacity: 0.8,
          maxWidth: '600px',
          margin: '0 auto',
          fontStyle: 'italic',
          fontWeight: 300
        }}>
          {scent.description}
        </p>
      </div>

      {/* Products Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        justifyContent: 'center'
      }}>
        {products.map((product) => (
          <div
            key={product._id || product.id}
            style={{
              background: '#F6F1EB',
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '100%',
              height: '320px',
              background: '#CFC7BE',
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

            <div style={{ padding: '1.5rem' }}>
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
                fontWeight: 300
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionDetailPage
