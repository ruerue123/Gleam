import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/myorders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#155724';
      case 'shipped':
        return '#004085';
      case 'processing':
        return '#856404';
      case 'cancelled':
        return '#721c24';
      default:
        return '#8B7355';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!user) {
    return (
      <div style={{
        paddingTop: 'clamp(6rem, 12vw, 8rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
          Please Login
        </h1>
        <Link to="/login" style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#8B7355', textDecoration: 'underline' }}>
          Login to view your orders
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        paddingTop: 'clamp(6rem, 12vw, 8rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: 'clamp(5rem, 10vw, 7rem)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#FAFAF8',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5%'
      }}>
        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 400,
          marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
          letterSpacing: '0.5px',
          color: '#171515'
        }}>
          My Orders
        </h1>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          color: '#171515',
          opacity: 0.75,
          marginBottom: 'clamp(3rem, 6vw, 4rem)',
          fontStyle: 'italic',
          fontWeight: 300
        }}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </p>

        {orders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'clamp(3rem, 6vw, 4rem)',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #EDECE4'
          }}>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#171515',
              marginBottom: '1.5rem'
            }}>
              You haven't placed any orders yet
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-block',
                padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.2rem, 5vw, 3rem)',
                background: '#8B7355',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '2px',
                fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                fontFamily: "'Cormorant', serif",
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: '#ffffff',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '8px',
                  border: '1px solid #EDECE4',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Cardo', serif",
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                      color: '#171515'
                    }}>
                      Order {order.orderNumber}
                    </h3>
                    <p style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
                      color: '#171515',
                      opacity: 0.7
                    }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div style={{
                    padding: '0.5rem 1rem',
                    background: `${getStatusColor(order.orderStatus)}15`,
                    color: getStatusColor(order.orderStatus),
                    borderRadius: '4px',
                    fontFamily: "'Cormorant', serif",
                    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    {getStatusText(order.orderStatus)}
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #EDECE4',
                  paddingTop: '1rem',
                  marginBottom: '1rem'
                }}>
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                        fontFamily: "'Cormorant', serif",
                        fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                      }}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontWeight: 500 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid #EDECE4',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 500,
                    color: '#171515'
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontFamily: "'Cardo', serif",
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
                    fontWeight: 600,
                    color: '#8B7355'
                  }}>
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
