import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../hooks/useModal';
import Modal, { ModalButton } from './Modal';

function ProductReviews({ productId }) {
  const { user } = useAuth();
  const modal = useModal();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      modal.alert('Please login to submit a review', 'Login Required', 'warning');
      return;
    }

    if (!comment.trim()) {
      modal.alert('Please write a comment', 'Comment Required', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ rating, comment })
      });

      const data = await response.json();

      if (data.success) {
        modal.alert('Review submitted successfully!', 'Success', 'success');
        setRating(5);
        setComment('');
        // Optionally refresh reviews
        fetchReviews();
      } else {
        modal.alert(data.message || 'Failed to submit review', 'Error', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      modal.alert('Failed to submit review', 'Error', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}/reviews`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div style={{
      background: '#FAFAF8',
      borderRadius: '8px',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      marginTop: 'clamp(2rem, 4vw, 3rem)'
    }}>
      <h3 style={{
        fontFamily: "'Cardo', serif",
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 600,
        color: '#171515',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
      }}>
        Customer Reviews
      </h3>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} style={{
        background: '#ffffff',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        borderRadius: '8px',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        border: '1px solid #EDECE4'
      }}>
        <h4 style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontWeight: 600,
          color: '#171515',
          marginBottom: '1rem'
        }}>
          Write a Review
        </h4>

        {/* Star Rating */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontFamily: "'Cormorant', serif",
            fontSize: '1rem',
            color: '#171515',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Rating
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: star <= rating ? '#F59E0B' : '#D1D5DB',
                  transition: 'color 0.2s'
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontFamily: "'Cormorant', serif",
            fontSize: '1rem',
            color: '#171515',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this candle..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontFamily: "'Cormorant', serif",
              fontSize: '1rem',
              border: '1px solid #EDECE4',
              borderRadius: '4px',
              outline: 'none',
              resize: 'vertical'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#8B7355'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#EDECE4'}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem 1.5rem',
            background: isSubmitting ? '#A89584' : '#8B7355',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: "'Cormorant', serif",
            fontSize: '1rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = '#6F5943';
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = '#8B7355';
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                padding: 'clamp(1rem, 2vw, 1.5rem)',
                borderRadius: '8px',
                border: '1px solid #EDECE4'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#171515'
                  }}>
                    {review.userName || 'Anonymous'}
                  </span>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          color: star <= (review.rating || 5) ? '#F59E0B' : '#D1D5DB',
                          fontSize: '0.9rem'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: '0.9rem',
                  color: '#8B7355',
                  fontStyle: 'italic'
                }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1rem',
                color: '#171515',
                lineHeight: 1.6,
                margin: 0
              }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: '1rem',
          color: '#8B7355',
          textAlign: 'center',
          padding: '2rem',
          fontStyle: 'italic'
        }}>
          No reviews yet. Be the first to review this product!
        </p>
      )}

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.hideModal}
        title={modal.modalConfig.title}
        message={modal.modalConfig.message}
        type={modal.modalConfig.type}
        actions={
          <ModalButton variant="primary" onClick={modal.hideModal} autoFocus>
            OK
          </ModalButton>
        }
      />
    </div>
  );
}

export default ProductReviews;
