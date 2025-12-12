import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminStats from './AdminStats';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Products', icon: '🕯️' },
    { id: 'orders', label: 'Orders', icon: '📦' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Sidebar */}
      <div style={{ width: 'clamp(200px, 20vw, 280px)', background: '#171515', color: '#EDECE4', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderBottom: '1px solid rgba(237, 236, 228, 0.1)' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)', color: '#EDECE4', margin: 0, letterSpacing: '1px' }}>
              gleam
            </h2>
          </Link>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#8B7355', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>Admin Panel</p>
        </div>

        <nav style={{ flex: 1, padding: '2rem 0' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: activeTab === tab.id ? 'rgba(139, 115, 85, 0.2)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === tab.id ? '3px solid #8B7355' : '3px solid transparent',
                color: activeTab === tab.id ? '#EDECE4' : 'rgba(237, 236, 228, 0.6)',
                fontFamily: "'Cormorant', serif",
                fontSize: '1.05rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(237, 236, 228, 0.1)' }}>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: 'rgba(237, 236, 228, 0.6)', marginBottom: '0.5rem' }}>
            Logged in as:
          </div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#EDECE4', marginBottom: '1rem' }}>
            {user.name}
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid rgba(237, 236, 228, 0.2)',
              borderRadius: '2px',
              color: '#EDECE4',
              fontFamily: "'Cormorant', serif",
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 'clamp(2rem, 4vw, 3rem)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
