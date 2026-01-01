import { useCallback } from 'react';

/**
 * Custom hook for keyboard navigation
 * Makes interactive elements accessible via keyboard
 */
export const useKeyboardNav = (callback, options = {}) => {
  const { disabled = false, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) return;

      // Handle Enter and Space as click
      if (event.key === 'Enter' || event.key === ' ') {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }

      // Handle Escape key if provided
      if (options.onEscape && event.key === 'Escape') {
        options.onEscape(event);
      }
    },
    [callback, disabled, preventDefault, options]
  );

  return {
    onKeyDown: handleKeyDown,
    tabIndex: disabled ? -1 : 0,
    role: options.role || 'button',
  };
};

/**
 * Hook for managing focus trap in modals
 */
export const useFocusTrap = (isActive) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!isActive) return;

      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isActive]
  );

  return handleKeyDown;
};

/**
 * Hook for accessible dropdown/menu
 */
export const useDropdownNav = (items, onSelect, onClose) => {
  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;
      const currentIndex = items.findIndex((item) => item.focused);

      switch (key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          // Focus next item
          break;

        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          // Focus previous item
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (currentIndex >= 0) {
            onSelect(items[currentIndex]);
          }
          break;

        case 'Escape':
          event.preventDefault();
          onClose();
          break;

        case 'Home':
          event.preventDefault();
          // Focus first item
          break;

        case 'End':
          event.preventDefault();
          // Focus last item
          break;

        default:
          break;
      }
    },
    [items, onSelect, onClose]
  );

  return handleKeyDown;
};

export default useKeyboardNav;
