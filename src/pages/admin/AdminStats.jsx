import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch(`${API_URL}/api/products`),
        fetch(`${API_URL}/api/orders`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      console.log('Products API response:', productsData);
      console.log('Product count:', productsData.count);
      console.log('Orders response:', ordersData);

      // Handle orders data - it might be an array or an object with a data property
      const orders = Array.isArray(ordersData) ? ordersData : (ordersData.data || []);
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

      setStats({
        totalProducts: productsData.count || 0,
        totalOrders: orders.length || 0,
        totalRevenue: totalRevenue || 0,
        recentOrders: orders.slice(0, 5) || []
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
        Loading stats...
      </div>
    );
  }

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: '🕯️', color: '#8B7355' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '📦', color: '#6F5943' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: '💰', color: '#A89584' }
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '2rem' }}>
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((card, index) => (
          <div key={index} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
            <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
              {card.label}
            </div>
            <div style={{ fontFamily: "'Cardo', serif", fontSize: '2rem', fontWeight: 600, color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #EDECE4' }}>
        <h2 style={{ fontFamily: "'Cardo', serif", fontSize: '1.5rem', color: '#171515', marginBottom: '1.5rem' }}>
          Recent Orders
        </h2>

        {stats.recentOrders.length === 0 ? (
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
            No orders yet
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #EDECE4' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Order ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Customer</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Total</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: '#171515' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #EDECE4' }}>
                    <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515' }}>
                      {order._id.slice(-8)}
                    </td>
                    <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515' }}>
                      {order.user?.name || 'Unknown'}
                    </td>
                    <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', fontWeight: 600 }}>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontFamily: "'Cormorant', serif",
                        background: order.status === 'delivered' ? '#D4EDDA' : order.status === 'shipped' ? '#D1ECF1' : '#FFF3CD',
                        color: order.status === 'delivered' ? '#155724' : order.status === 'shipped' ? '#0C5460' : '#856404'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#171515', opacity: 0.7 }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStats;
