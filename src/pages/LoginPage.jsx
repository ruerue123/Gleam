import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{
      paddingTop: 'clamp(5rem, 10vw, 7rem)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#FAFAF8',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        margin: '0 5%',
        background: '#ffffff',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '4px',
        border: '1px solid #EDECE4',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
      }}>
        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 400,
          marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
          letterSpacing: '0.5px',
          color: '#171515',
          textAlign: 'center'
        }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
          color: '#171515',
          opacity: 0.7,
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          textAlign: 'center'
        }}>
          {isLogin ? 'Sign in to your account' : 'Join our community'}
        </p>

        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1.2rem, 2.5vw, 1.5rem)'
        }}>
          {!isLogin && (
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
                placeholder="Enter your name"
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
          )}

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
              placeholder="your.email@example.com"
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
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
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

          {isLogin && (
            <Link
              to="/forgot-password"
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                color: '#8B7355',
                textDecoration: 'none',
                alignSelf: 'flex-end',
                fontStyle: 'italic'
              }}
            >
              Forgot password?
            </Link>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 'clamp(0.9rem, 2vw, 1.1rem)',
              background: '#8B7355',
              color: '#ffffff',
              border: '1px solid #8B7355',
              borderRadius: '2px',
              fontSize: 'clamp(1rem, 1.6vw, 1.05rem)',
              fontFamily: "'Cormorant', serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '0.5rem'
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
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{
          marginTop: 'clamp(1.5rem, 3vw, 2rem)',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
            color: '#171515',
            opacity: 0.7
          }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B7355',
                cursor: 'pointer',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                fontWeight: 500,
                textDecoration: 'underline',
                padding: 0
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
