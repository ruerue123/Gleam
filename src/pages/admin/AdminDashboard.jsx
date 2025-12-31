import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminStats from './AdminStats';
import AdminScentFamily from './AdminScentFamily';
import AdminRequests from './AdminRequests';

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
    { id: 'scents', label: 'Scent Family', icon: '🌸' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'requests', label: 'Requests', icon: '📩' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Sidebar */}
      <div style={{ width: 'clamp(200px, 20vw, 280px)', background: '#171515', color: '#EDECE4', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderBottom: '1px solid rgba(237, 236, 228, 0.1)' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/logo.svg"
              alt="gleam"
              style={{
                height: 'clamp(50px, 8vw, 70px)',
                width: 'auto',
                marginBottom: '0.5rem'
              }}
            />
          </Link>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#8B7355', margin: '0.5rem 0 0 0', fontStyle: 'italic', textAlign: 'center' }}>Admin Panel</p>
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
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = '#EDECE4';
                  e.currentTarget.style.background = 'rgba(139, 115, 85, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = 'rgba(237, 236, 228, 0.6)';
                  e.currentTarget.style.background = 'transparent';
                }
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8B7355';
              e.currentTarget.style.borderColor = '#8B7355';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(237, 236, 228, 0.2)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 'clamp(2rem, 4vw, 3rem)', overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'scents' && <AdminScentFamily />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'requests' && <AdminRequests />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
