import { Link } from 'react-router-dom'

function ProfilePage() {
  return (
    <div style={{
      paddingTop: 'clamp(130px, 14vw, 150px)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#FAFAF8',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '900px',
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
          My Account
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
          Manage your profile and preferences
        </p>

        <div style={{
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {/* Profile Information */}
          <div style={{
            background: '#ffffff',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '4px',
            border: '1px solid #EDECE4',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <h2 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
              fontWeight: 400,
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#171515'
            }}>
              Profile Information
            </h2>

            <div style={{
              display: 'grid',
              gap: 'clamp(1.2rem, 2.5vw, 1.5rem)'
            }}>
              <div>
                <label style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                  color: '#171515',
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontWeight: 500
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Sarah Johnson"
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                    fontFamily: "'Cormorant', serif",
                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                    border: '1px solid #EDECE4',
                    borderRadius: '2px',
                    background: '#FAFAF8',
                    color: '#171515'
                  }}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                  color: '#171515',
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontWeight: 500
                }}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="sarah.johnson@example.com"
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                    fontFamily: "'Cormorant', serif",
                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                    border: '1px solid #EDECE4',
                    borderRadius: '2px',
                    background: '#FAFAF8',
                    color: '#171515'
                  }}
                />
              </div>

              <button
                style={{
                  width: 'fit-content',
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 2.5rem)',
                  background: '#8B7355',
                  color: '#ffffff',
                  border: '1px solid #8B7355',
                  borderRadius: '2px',
                  fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#6F5943';
                  e.currentTarget.style.borderColor = '#6F5943';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8B7355';
                  e.currentTarget.style.borderColor = '#8B7355';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            <Link
              to="/cart"
              style={{
                background: '#ffffff',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '4px',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                fontWeight: 400,
                marginBottom: '0.5rem',
                color: '#171515'
              }}>
                My Cart
              </h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                color: '#171515',
                opacity: 0.7,
                fontStyle: 'italic'
              }}>
                View items in your cart
              </p>
            </Link>

            <Link
              to="/favourites"
              style={{
                background: '#ffffff',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '4px',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                fontWeight: 400,
                marginBottom: '0.5rem',
                color: '#171515'
              }}>
                My Favourites
              </h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                color: '#171515',
                opacity: 0.7,
                fontStyle: 'italic'
              }}>
                Your saved items
              </p>
            </Link>

            <div
              style={{
                background: '#ffffff',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '4px',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                fontWeight: 400,
                marginBottom: '0.5rem',
                color: '#171515'
              }}>
                Order History
              </h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                color: '#171515',
                opacity: 0.7,
                fontStyle: 'italic'
              }}>
                View past orders
              </p>
            </div>
          </div>

          {/* Sign Out */}
          <button
            style={{
              width: 'fit-content',
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 2.5rem)',
              background: 'transparent',
              color: '#8B7355',
              border: '1px solid #8B7355',
              borderRadius: '2px',
              fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
              fontFamily: "'Cormorant', serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8B7355';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#8B7355';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
