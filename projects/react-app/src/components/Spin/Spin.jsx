import React, { Fragment } from 'react';
import './Spin.scss';

const Spin = ({ children, spinning, tip }) => {
  return (
    <div className="spin-wrapper">
      <div className="children-container">{children}</div>

      {spinning && (
        <Fragment>
          <div className="half-transparent-layout"></div>
          <div className="main-cube">
            <div className="cube-container cube1">
              <div className="inner-cube"></div>
            </div>
            <div className="cube-container cube2">
              <div className="inner-cube"></div>
            </div>
            <div className="cube-container cube3">
              <div className="inner-cube"></div>
            </div>
            <div className="cube-container cube4">
              <div className="inner-cube"></div>
            </div>
          </div>
          {tip && <div className="loading-text">{tip}</div>}
        </Fragment>
      )}
    </div>
  );
};

export default Spin;
