import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 'clamp(5rem, 10vw, 7rem)', paddingBottom: 'clamp(4rem, 10vw, 8rem)', background: '#FAFAF8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 5%', background: '#ffffff', padding: 'clamp(2rem, 5vw, 3rem)', borderRadius: '4px', border: '1px solid #EDECE4', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)' }}>
        <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 400, marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)', letterSpacing: '0.5px', color: '#171515', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', color: '#171515', opacity: 0.7, marginBottom: 'clamp(2rem, 4vw, 3rem)', fontStyle: 'italic', fontWeight: 300, textAlign: 'center' }}>
          {isLogin ? 'Sign in to your account' : 'Join our community'}
        </p>
        {error && <div style={{ padding: '0.75rem 1rem', background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '4px', marginBottom: '1.5rem', fontFamily: "'Cormorant', serif", fontSize: '0.95rem', color: '#C53030' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
          {!isLogin && <div><label style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.6vw, 1rem)', color: '#171515', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required={!isLogin} style={{ width: '100%', padding: 'clamp(0.75rem, 1.8vw, 0.9rem)', fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.5vw, 1rem)', border: '1px solid #EDECE4', borderRadius: '2px', background: '#FAFAF8', color: '#171515' }} /></div>}
          <div><label style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.6vw, 1rem)', color: '#171515', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required style={{ width: '100%', padding: 'clamp(0.75rem, 1.8vw, 0.9rem)', fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.5vw, 1rem)', border: '1px solid #EDECE4', borderRadius: '2px', background: '#FAFAF8', color: '#171515' }} /></div>
          <div><label style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.6vw, 1rem)', color: '#171515', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required minLength="6" style={{ width: '100%', padding: 'clamp(0.75rem, 1.8vw, 0.9rem)', fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.5vw, 1rem)', border: '1px solid #EDECE4', borderRadius: '2px', background: '#FAFAF8', color: '#171515' }} /></div>
          {isLogin && <Link to="/forgot-password" style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)', color: '#8B7355', textDecoration: 'none', alignSelf: 'flex-end', fontStyle: 'italic' }}>Forgot password?</Link>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 'clamp(0.9rem, 2vw, 1.1rem)', background: loading ? '#A89584' : '#8B7355', color: '#ffffff', border: '1px solid #8B7355', borderRadius: '2px', fontSize: 'clamp(1rem, 1.6vw, 1.05rem)', fontFamily: "'Cormorant', serif", fontWeight: 500, letterSpacing: '0.5px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.6vw, 1rem)', color: '#171515', opacity: 0.7 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setFormData({ name: '', email: '', password: '' }); }} style={{ background: 'none', border: 'none', color: '#8B7355', cursor: 'pointer', fontFamily: "'Cormorant', serif", fontSize: 'clamp(0.95rem, 1.6vw, 1rem)', fontWeight: 500, textDecoration: 'underline', padding: 0 }}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
