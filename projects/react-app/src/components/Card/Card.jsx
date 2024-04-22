import React, { Fragment } from 'react';
import './Card.scss';
import { Typography, FlexBox, Product } from '../';

const Card = ({ title, list, mt, style }) => {
  return (
    <div
      className="card-component"
      style={{
        marginTop: mt ?? 8,
        ...style,
      }}
    >
      <div className="card-content">{title && <Typography fs={20} fw={500} children={title} />}</div>
      {list?.length > 0 && (
        <Fragment>
          {list.reduce((acc, item, index) => {
            if (index % 5 === 0) {
              acc.push(
                <FlexBox key={`flexbox-${index}`} style={{ flexWrap: 'wrap' }}>
                  {list.slice(index, index + 5).map((product) => (
                    <Product key={product._id} item={product} />
                  ))}
                </FlexBox>,
              );
              acc.push(<br key={`br-${index}`} />);
            }
            return acc;
          }, [])}
        </Fragment>
      )}
    </div>
  );
};

export default Card;