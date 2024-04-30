import React from 'react';
import './Spin.scss';

const Spin = (props) => {
    return (
      <div className="spin-wrapper">
        <div className="children-container">{props.children}</div>

        {props.spinning && <div className="half-transparent-layout"></div>}
        {props.spinning && (
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
        )}
      </div>
    );
};

export default Spin;
