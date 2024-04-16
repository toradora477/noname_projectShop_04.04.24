import React from 'react';
import './Error404.scss';
import error404 from '../../images/Error404.svg';

const Error404 = () => {
  return (
    <div className="error404">
      <img className="error-img" src={error404} alt="error img" />
      <span className="error404-text">Сторінку не знайдено</span>
      <span className="error404-text">Перевірте правильність введеної інформації</span>
    </div>
  );
};

export default Error404;
