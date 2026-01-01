import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';

function ProductDetailPage({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Try fetching by slug first
      let response = await fetch(`${API_URL}/api/products?slug=${id}`);
      let data = await response.json();

      if (data.data && data.data.length > 0) {
        setProduct(data.data[0]);
      } else {
        // Try fetching by ID
        response = await fetch(`${API_URL}/api/products/${id}`);
        data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
    }
  };

  const handleAddToFavourites = () => {
    if (product && onAddToFavourites) {
      onAddToFavourites(product);
    }
  };

  const isFavourite = favourites.some(fav => fav._id === product?._id || fav.id === product?.id);

  if (loading) {
    return (
      <div style={{ paddingTop: 'clamp(90px, 10vw, 110px)', paddingBottom: 'clamp(4rem, 10vw, 8rem)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: 'clamp(90px, 10vw, 110px)', paddingBottom: 'clamp(4rem, 10vw, 8rem)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
          Product Not Found
        </h1>
        <Link to="/products" style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#8B7355', textDecoration: 'underline' }}>
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'clamp(90px, 10vw, 110px)', paddingBottom: 'clamp(4rem, 10vw, 8rem)', background: '#FAFAF8' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', opacity: 0.7 }}>
          <Link to="/" style={{ color: '#8B7355', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link to="/products" style={{ color: '#8B7355', textDecoration: 'none' }}>Products</Link>
          {' / '}
          <span>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: 'clamp(3rem, 6vw, 5rem)' }}>
          {/* Product Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #EDECE4', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)', marginBottom: '1rem' }}>
              <div style={{
                width: '100%',
                height: 'clamp(400px, 60vw, 600px)',
                background: '#F6F1EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(6rem, 12vw, 8rem)',
                overflow: 'hidden'
              }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImageIndex]}
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
                  <div>{product.emoji || '🕯️'}</div>
                )}
              </div>
            </div>

            {/* Thumbnail Scroll */}
            {product.images && product.images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                scrollbarWidth: 'thin',
                scrollbarColor: '#8B7355 #EDECE4'
              }}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    style={{
                      flex: '0 0 auto',
                      width: '80px',
                      height: '80px',
                      border: selectedImageIndex === index ? '2px solid #8B7355' : '2px solid #EDECE4',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#F6F1EB',
                      padding: 0,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      decoding="async"
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
          <div>
            {/* Scent Family Badge */}
            {product.scent && (
              <Link
                to={`/products?scent=${product.scent}`}
                style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                  fontFamily: "'Cormorant', serif",
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#8B7355',
                  marginBottom: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {product.scent} FAMILY
              </Link>
            )}

            {/* Product Name */}
            <h1 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 500,
              marginBottom: '2rem',
              color: '#8B7355'
            }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: 1.8,
              color: '#171515',
              marginBottom: '2rem',
              fontWeight: 300
            }}>
              {product.description || `Indulge in the essence of ${product.scent}. ${product.name} brings warmth and elegance to any space.`}
            </p>

            {/* Product Details Grid */}
            <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #EDECE4' }}>
              <h3 style={{ fontFamily: "'Cardo', serif", fontSize: '1.2rem', marginBottom: '1rem', color: '#171515' }}>
                Product Details
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {product.scent && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Cormorant', serif", fontSize: '1rem' }}>
                    <span style={{ opacity: 0.7 }}>Scent:</span>
                    <span style={{ fontWeight: 500 }}>{product.scent}</span>
                  </div>
                )}
                {product.burnTime && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Cormorant', serif", fontSize: '1rem' }}>
                    <span style={{ opacity: 0.7 }}>Burn Time:</span>
                    <span style={{ fontWeight: 500 }}>{product.burnTime}</span>
                  </div>
                )}
                {product.size && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Cormorant', serif", fontSize: '1rem' }}>
                    <span style={{ opacity: 0.7 }}>Size:</span>
                    <span style={{ fontWeight: 500 }}>{product.size}</span>
                  </div>
                )}
                {(product.countInStock !== undefined || product.stock !== undefined) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Cormorant', serif", fontSize: '1rem' }}>
                    <span style={{ opacity: 0.7 }}>Availability:</span>
                    <span style={{ fontWeight: 500, color: (product.countInStock || product.stock || 0) > 0 ? '#155724' : '#C53030' }}>
                      {(product.countInStock || product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#EDECE4',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#D8D6CE'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#EDECE4'}
                >
                  −
                </button>
                <span style={{ fontFamily: "'Cardo', serif", fontSize: '1.2rem', fontWeight: 500, minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#EDECE4',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#D8D6CE'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#EDECE4'}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                disabled={!(product.countInStock || product.stock) || (product.countInStock || product.stock || 0) === 0}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1.2rem 2rem',
                  background: (product.countInStock || product.stock || 0) > 0 ? '#8B7355' : '#D8D6CE',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '1.1rem',
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  cursor: (product.countInStock || product.stock || 0) > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if ((product.countInStock || product.stock || 0) > 0) {
                    e.currentTarget.style.background = '#6F5943';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = (product.countInStock || product.stock || 0) > 0 ? '#8B7355' : '#D8D6CE';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {(product.countInStock || product.stock || 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={handleAddToFavourites}
                style={{
                  padding: '1.2rem',
                  background: isFavourite ? '#8B7355' : 'transparent',
                  color: isFavourite ? '#ffffff' : '#8B7355',
                  border: '2px solid #8B7355',
                  borderRadius: '2px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isFavourite) {
                    e.currentTarget.style.background = '#8B7355';
                    e.currentTarget.style.color = '#ffffff';
                  }
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isFavourite ? '#8B7355' : 'transparent';
                  e.currentTarget.style.color = isFavourite ? '#ffffff' : '#8B7355';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isFavourite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Product Reviews Section */}
          <ProductReviews productId={product._id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
