import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminRequests() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, responded: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setContacts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchContacts();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return { bg: '#FFF3CD', text: '#856404' };
      case 'read':
        return { bg: '#D1ECF1', text: '#0C5460' };
      case 'responded':
        return { bg: '#D4EDDA', text: '#155724' };
      case 'archived':
        return { bg: '#E2E3E5', text: '#383D41' };
      default:
        return { bg: '#EDECE4', text: '#171515' };
    }
  };

  const filteredContacts = filter === 'all'
    ? contacts
    : contacts.filter(contact => contact.status === filter);

  const filters = ['all', 'new', 'read', 'responded', 'archived'];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
        Loading contact requests...
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '0.5rem' }}>
      <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '0.5rem' }}>
        Contact Requests
      </h1>
      <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#171515', opacity: 0.7, marginBottom: '2rem', fontStyle: 'italic' }}>
        Manage customer inquiries and contact form submissions
      </p>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🆕</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            New Requests
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            {stats.new || 0}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👁️</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            Read
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            {stats.read || 0}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            Responded
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            {stats.responded || 0}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #EDECE4', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
          <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.9rem', color: '#171515', opacity: 0.7, marginBottom: '0.5rem' }}>
            Total
          </div>
          <div style={{ fontFamily: "'Cardo', serif", fontSize: '1.8rem', fontWeight: 600, color: '#8B7355' }}>
            {stats.total || 0}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
            {f} ({f === 'all' ? contacts.length : contacts.filter(c => c.status === f).length})
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #EDECE4' }}>
        <h2 style={{ fontFamily: "'Cardo', serif", fontSize: '1.5rem', color: '#171515', marginBottom: '1.5rem' }}>
          {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
        </h2>

        {filteredContacts.length === 0 ? (
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#171515', opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
            No {filter !== 'all' ? filter : ''} requests found
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredContacts.map((contact) => {
              const statusColor = getStatusColor(contact.status);
              return (
                <div
                  key={contact._id}
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
                    <div>
                      <h3 style={{
                        fontFamily: "'Cardo', serif",
                        fontSize: '1.2rem',
                        color: '#171515',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {contact.name}
                      </h3>
                      <a
                        href={`mailto:${contact.email}`}
                        style={{
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.9rem',
                          color: '#8B7355',
                          textDecoration: 'none',
                          margin: 0
                        }}
                      >
                        {contact.email}
                      </a>
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
                      {contact.status}
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
                    border: '1px solid #EDECE4',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {contact.message}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <span style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: '0.9rem',
                      color: '#171515',
                      opacity: 0.6
                    }}>
                      {new Date(contact.createdAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <a
                        href={`mailto:${contact.email}?subject=Re: Your inquiry to Gleam Candles`}
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
                          transition: 'all 0.2s',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#6F5943';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#8B7355';
                        }}
                      >
                        Reply
                      </a>
                      {contact.status !== 'responded' && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'responded')}
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
                          Mark Responded
                        </button>
                      )}
                      {contact.status === 'responded' && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'archived')}
                          style={{
                            padding: '0.5rem 1.25rem',
                            background: 'transparent',
                            color: '#666',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontFamily: "'Cormorant', serif",
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          Archive
                        </button>
                      )}
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
