import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import tokens from '../styles/tokens';

/**
 * Accessible Modal Component
 * Replaces native alert() and confirm() dialogs
 */
function Modal({ isOpen, onClose, title, message, type = 'info', actions, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Focus the modal
      setTimeout(() => {
        document.querySelector('[role="dialog"]')?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    info: {
      icon: 'ℹ️',
      color: tokens.colors.status.info.text,
      bg: tokens.colors.status.info.bg,
    },
    success: {
      icon: '✓',
      color: tokens.colors.status.success.text,
      bg: tokens.colors.status.success.bg,
    },
    error: {
      icon: '✕',
      color: tokens.colors.status.error.text,
      bg: tokens.colors.status.error.bg,
    },
    warning: {
      icon: '⚠',
      color: tokens.colors.status.warning.text,
      bg: tokens.colors.status.warning.bg,
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: tokens.colors.background.overlay,
              zIndex: tokens.zIndex.overlay,
            }}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: tokens.zIndex.modal,
              padding: tokens.spacing.md,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              tabIndex={-1}
              style={{
                background: tokens.colors.background.primary,
                borderRadius: tokens.borderRadius.md,
                boxShadow: tokens.shadows.xl,
                maxWidth: '500px',
                width: '100%',
                pointerEvents: 'auto',
                border: `1px solid ${tokens.colors.border.light}`,
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: tokens.spacing.lg,
                  borderBottom: `1px solid ${tokens.colors.border.light}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: tokens.borderRadius.full,
                    background: currentStyle.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: tokens.typography.fontSize.xl,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {currentStyle.icon}
                </div>
                <h2
                  id="modal-title"
                  style={{
                    fontFamily: tokens.typography.fontFamily.heading,
                    fontSize: tokens.typography.fontSize.xl,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.colors.text.primary,
                    margin: 0,
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* Body */}
              <div
                id="modal-description"
                style={{
                  padding: tokens.spacing.lg,
                  fontFamily: tokens.typography.fontFamily.body,
                  fontSize: tokens.typography.fontSize.base,
                  color: tokens.colors.text.primary,
                  lineHeight: tokens.typography.lineHeight.relaxed,
                }}
              >
                {message || children}
              </div>

              {/* Footer */}
              {actions && (
                <div
                  style={{
                    padding: tokens.spacing.lg,
                    borderTop: `1px solid ${tokens.colors.border.light}`,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: tokens.spacing.sm,
                  }}
                >
                  {actions}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Accessible Button Component for Modal Actions
 */
export function ModalButton({ onClick, variant = 'primary', children, autoFocus = false }) {
  const keyboardProps = useKeyboardNav(onClick);

  const variants = {
    primary: {
      background: tokens.colors.primary,
      color: '#ffffff',
      border: `1px solid ${tokens.colors.primary}`,
    },
    secondary: {
      background: 'transparent',
      color: tokens.colors.primary,
      border: `1px solid ${tokens.colors.border.light}`,
    },
    danger: {
      background: tokens.colors.status.error.text,
      color: '#ffffff',
      border: `1px solid ${tokens.colors.status.error.text}`,
    },
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      {...keyboardProps}
      autoFocus={autoFocus}
      style={{
        ...style,
        padding: `${tokens.spacing.xs} ${tokens.spacing.lg}`,
        borderRadius: tokens.borderRadius.sm,
        fontFamily: tokens.typography.fontFamily.body,
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        cursor: 'pointer',
        transition: `all ${tokens.transitions.fast}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}

export default Modal;
