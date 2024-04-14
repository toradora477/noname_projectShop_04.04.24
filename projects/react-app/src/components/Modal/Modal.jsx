import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import './Modal.scss';

import { setModal } from '../../store/commonReducer';

const Modal = ({ children, position }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setModal());
  };

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
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
