import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminBestsellers() {
  const [products, setProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      const productsArray = Array.isArray(data) ? data : (data.products || []);
      setProducts(productsArray);

      // Get current bestsellers
      const currentBestsellers = productsArray
        .filter(p => p.isBestseller)
        .map(p => p._id);
      setBestsellers(currentBestsellers);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBestseller = (productId) => {
    setBestsellers(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const saveBestsellers = async () => {
    setSaving(true);
    try {
      // Update all products
      const updatePromises = products.map(product => {
        const isBestseller = bestsellers.includes(product._id);
        return fetch(`${API_URL}/api/products/${product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...product,
            isBestseller
          })
        });
      });

      await Promise.all(updatePromises);
      alert('Bestsellers updated successfully!');
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating bestsellers:', error);
      alert('Error updating bestsellers');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '0.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '0.5rem' }}>
          Bestsellers Management
        </h1>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', opacity: 0.7 }}>
          Select products to display in the bestsellers section ({bestsellers.length} selected)
        </p>
      </div>

      {/* Save Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={saveBestsellers}
          disabled={saving}
          style={{
            padding: '0.75rem 2rem',
            background: saving ? '#ccc' : '#8B7355',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: "'Cormorant', serif",
            fontSize: '1rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!saving) e.currentTarget.style.background = '#6F5943';
          }}
          onMouseLeave={(e) => {
            if (!saving) e.currentTarget.style.background = '#8B7355';
          }}
        >
          {saving ? 'Saving...' : 'Save Bestsellers'}
        </button>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {products.map((product) => {
          const isSelected = bestsellers.includes(product._id);
          return (
            <div
              key={product._id}
              onClick={() => toggleBestseller(product._id)}
              style={{
                background: '#fff',
                border: `2px solid ${isSelected ? '#8B7355' : '#EDECE4'}`,
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Checkbox */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '24px',
                height: '24px',
                border: `2px solid ${isSelected ? '#8B7355' : '#ccc'}`,
                borderRadius: '4px',
                background: isSelected ? '#8B7355' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {isSelected && '✓'}
              </div>

              {/* Product Image */}
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                  }}
                />
              )}

              {/* Product Info */}
              <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.1rem', color: '#171515', marginBottom: '0.5rem' }}>
                {product.name}
              </div>
              <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
                {product.scentFamily}
              </div>
              <div style={{ fontFamily: "'Cardo', serif", fontSize: '1rem', color: '#8B7355', fontWeight: 600 }}>
                ${product.price?.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '8px', border: '1px solid #EDECE4' }}>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#171515', opacity: 0.6 }}>
            No products found
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminBestsellers;
