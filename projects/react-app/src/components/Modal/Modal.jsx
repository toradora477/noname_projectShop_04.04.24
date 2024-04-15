import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import './Modal.scss';

import { setModal } from '../../store/commonReducer';

const Modal = ({ children, position, btnClose = true }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setModal());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={clsx(
        'modal',
        { centerPosition: position === 'center' || !position },
        { leftPosition: position === 'left' },
        { rightPosition: position === 'right' },
      )}
    >
      <div className="modal-content">
        {btnClose && (
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
