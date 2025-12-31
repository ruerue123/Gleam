import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
        Loading orders...
      </div>
    );
  }

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered'];
  const filters = ['all', ...statusOptions];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '1rem' }}>
          Orders Management
        </h1>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                background: filter === f ? '#8B7355' : '#fff',
                color: filter === f ? '#fff' : '#171515',
                border: '1px solid #EDECE4',
                borderRadius: '20px',
                fontFamily: "'Cormorant', serif",
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {f} ({f === 'all' ? orders.length : orders.filter(o => o.status === f).length})
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '8px', border: '1px solid #EDECE4', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#171515', opacity: 0.6 }}>
            No {filter !== 'all' ? filter : ''} orders found
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredOrders.map((order) => (
            <div key={order._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4' }}>
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.2rem', color: '#171515', marginBottom: '0.25rem' }}>
                    Order #{order._id.slice(-8)}
                  </div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.6 }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #EDECE4',
                      borderRadius: '4px',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '0.95rem',
                      background: '#FAFAF8',
                      cursor: 'pointer'
                    }}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.2rem', fontWeight: 600, color: '#8B7355' }}>
                    ${(order.totalPrice || 0).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ padding: '1rem', background: '#FAFAF8', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
                  Customer Details
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515' }}>
                  <strong>{order.user?.name || 'Unknown'}</strong> • {order.user?.email || 'N/A'}
                </div>
                {order.shippingAddress && (
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', marginTop: '0.5rem' }}>
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.75rem' }}>
                  Order Items ({order.orderItems?.length || 0})
                </div>
                {order.orderItems?.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: index > 0 ? '1px solid #EDECE4' : 'none' }}>
                    <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515' }}>
                      {item.name} × {item.quantity}
                    </div>
                    <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', fontWeight: 600 }}>
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
