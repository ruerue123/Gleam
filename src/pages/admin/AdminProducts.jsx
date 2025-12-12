import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ stock: parseInt(newStock) })
      });

      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', margin: 0 }}>
          Products Management
        </h1>
        <div style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#8B7355', fontWeight: 600 }}>
          Total: {products.length} products
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #EDECE4', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#FAFAF8', borderBottom: '2px solid #EDECE4' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Product</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Collection</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Price</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Stock</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #EDECE4' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', background: '#FAFAF8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                        {product.emoji}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Cardo', serif", fontSize: '1rem', color: '#171515', fontWeight: 500 }}>
                          {product.name}
                        </div>
                        <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.6 }}>
                          {product.scent}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515' }}>
                    {product.collection}
                  </td>
                  <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', fontWeight: 600 }}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {editingProduct === product._id ? (
                      <input
                        type="number"
                        defaultValue={product.stock}
                        onBlur={(e) => handleStockUpdate(product._id, e.target.value)}
                        autoFocus
                        style={{
                          width: '60px',
                          padding: '0.5rem',
                          border: '1px solid #8B7355',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.95rem'
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => setEditingProduct(product._id)}
                        style={{
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.95rem',
                          color: product.stock < 10 ? '#C53030' : '#171515',
                          cursor: 'pointer',
                          fontWeight: product.stock < 10 ? 600 : 400
                        }}
                      >
                        {product.stock} units
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontFamily: "'Cormorant', serif",
                      background: product.stock > 0 ? '#D4EDDA' : '#F8D7DA',
                      color: product.stock > 0 ? '#155724' : '#721C24'
                    }}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => setEditingProduct(product._id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#8B7355',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#6F5943'}
                      onMouseLeave={(e) => e.target.style.background = '#8B7355'}
                    >
                      Edit Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
