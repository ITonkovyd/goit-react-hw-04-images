import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyle, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target.tagName !== 'IMG') {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyle>{children}</ModalStyle>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
