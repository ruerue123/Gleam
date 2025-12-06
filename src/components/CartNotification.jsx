function CartNotification({ show }) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: '#111111',
      color: '#F6F1EB',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      zIndex: 2000,
      animation: 'slideIn 0.3s ease',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      ✓ Added to cart!
    </div>
  );
}

export default CartNotification;