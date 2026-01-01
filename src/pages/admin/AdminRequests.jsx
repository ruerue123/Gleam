import { useState } from 'react';

function AdminRequests() {
  // Sample requests data - replace with actual API calls
  const [requests] = useState([
    {
      id: 1,
      type: 'contact',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      subject: 'Custom Order Inquiry',
      message: 'Hi, I\'m interested in ordering custom scented candles for my wedding. Do you offer bulk discounts?',
      date: '2025-12-30',
      status: 'new'
    },
    {
      id: 2,
      type: 'support',
      name: 'Michael Chen',
      email: 'mchen@example.com',
      subject: 'Shipping Question',
      message: 'When will my order #1234 be shipped? It\'s been 3 days since I placed the order.',
      date: '2025-12-29',
      status: 'pending'
    },
    {
      id: 3,
      type: 'feedback',
      name: 'Emma Williams',
      email: 'emma.w@example.com',
      subject: 'Product Feedback',
      message: 'Love the Ember collection! The vanilla scent is amazing. Would love to see more variations.',
      date: '2025-12-28',
      status: 'resolved'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return { bg: '#FFF3CD', text: '#856404' };
      case 'pending':
        return { bg: '#D1ECF1', text: '#0C5460' };
      case 'resolved':
        return { bg: '#D4EDDA', text: '#155724' };
      default:
        return { bg: '#EDECE4', text: '#171515' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'contact':
        return '📧';
      case 'support':
        return '🛠️';
      case 'feedback':
        return '⭐';
      default:
        return '📩';
    }
  };

  return (
    <div style={{ paddingTop: '0.5rem' }}>
      <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '0.5rem' }}>
        Customer Requests
      </h1>
      <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#171515', opacity: 0.7, marginBottom: '2rem', fontStyle: 'italic' }}>
        Manage customer inquiries, support requests, and feedback
      </p>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🆕</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            New Requests
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            1
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            Pending
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            1
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            Resolved
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            1
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #EDECE4' }}>
        <h2 style={{ fontFamily: "'Cardo', serif", fontSize: '1.5rem', color: '#171515', marginBottom: '1.5rem' }}>
          All Requests
        </h2>

        {requests.length === 0 ? (
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
            No requests yet
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {requests.map((request) => {
              const statusColor = getStatusColor(request.status);
              return (
                <div
                  key={request.id}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid #EDECE4',
                    borderRadius: '8px',
                    background: '#FAFAF8',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(request.type)}</span>
                      <div>
                        <h3 style={{
                          fontFamily: "'Cardo', serif",
                          fontSize: '1.2rem',
                          color: '#171515',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {request.subject}
                        </h3>
                        <p style={{
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.9rem',
                          color: '#171515',
                          opacity: 0.7,
                          margin: 0
                        }}>
                          From: {request.name} ({request.email})
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontFamily: "'Cormorant', serif",
                        fontWeight: 500,
                        background: statusColor.bg,
                        color: statusColor.text,
                        textTransform: 'capitalize'
                      }}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Message */}
                  <p style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: '1rem',
                    color: '#171515',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: '#fff',
                    borderRadius: '4px',
                    border: '1px solid #EDECE4'
                  }}>
                    {request.message}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <span style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: '0.9rem',
                      color: '#171515',
                      opacity: 0.6
                    }}>
                      {new Date(request.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        style={{
                          padding: '0.5rem 1.25rem',
                          background: '#8B7355',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#6F5943';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#8B7355';
                        }}
                      >
                        Reply
                      </button>
                      <button
                        style={{
                          padding: '0.5rem 1.25rem',
                          background: 'transparent',
                          color: '#8B7355',
                          border: '1px solid #8B7355',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#8B7355';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#8B7355';
                        }}
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRequests;
