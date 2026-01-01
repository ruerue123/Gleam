import { useState, useCallback } from 'react';

/**
 * Custom hook to manage modal state
 * Simplifies modal usage throughout the app
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const showModal = useCallback((config) => {
    setModalConfig({
      title: config.title || '',
      message: config.message || '',
      type: config.type || 'info',
      onConfirm: config.onConfirm,
    });
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModalConfig({
        title,
        message,
        type: 'warning',
        onConfirm: () => {
          setIsOpen(false);
          resolve(true);
        },
        onCancel: () => {
          setIsOpen(false);
          resolve(false);
        },
      });
      setIsOpen(true);
    });
  }, []);

  const alert = useCallback((message, title = 'Notice', type = 'info') => {
    showModal({
      title,
      message,
      type,
      onConfirm: hideModal,
    });
  }, [showModal, hideModal]);

  return {
    isOpen,
    modalConfig,
    showModal,
    hideModal,
    confirm,
    alert,
  };
};

export default useModal;
