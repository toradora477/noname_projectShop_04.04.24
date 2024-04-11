// import React, { useState } from 'react';
// import clsx from 'clsx';
// import './Modal.scss';

// const Modal = ({ children, position }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const modalStyle = {
//     width: '20%', // Ширина модального вікна (1/5 від ширини екрану)
//     height: '100%', // Висота модального вікна (вся висота екрану)
//     left: position === 'left' ? 0 : 'auto', // Позиція модального вікна (зліва або справа)
//     right: position === 'right' ? 0 : 'auto', // Позиція модального вікна (зліва або справа)
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Open Modal</button>
//       {isOpen && (
//         <div className={clsx('modal')}>
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Modal;

import React, { useState } from 'react';
import clsx from 'clsx';
import './Modal.scss';

const Modal = ({ children, position }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
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
      )}
    </div>
  );
};

export default Modal;
