import React, { Fragment } from 'react';
import './Card.scss';
import clsx from 'clsx';
import { Typography, FlexBox, Product } from '../';

const Card = ({ title, list, mt, style, children, pl, className }) => {
  return (
    <div
      className={clsx('card-component', className)}
      style={{
        marginTop: mt ?? 8,
        padding: pl ?? 0,
        ...style,
      }}
    >
      {title && (
        <div className="card-content">
          <Typography fs={20} fw={500} children={title} />
        </div>
      )}
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
      {children}
    </div>
  );
};

export default Card;
