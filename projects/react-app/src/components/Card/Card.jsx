import React, { Fragment } from 'react';
import './Card.scss';
import clsx from 'clsx';
import { Typography, FlexBox, Product, SubcategoryCard } from '../';

const Card = ({ listProducts, listCategories, children, title, mt, ml, mb, pl, style, className }) => {
  const _list = listProducts ?? listCategories ?? null;
  return (
    <div
      className={clsx('card-component', className)}
      style={{
        marginTop: mt ?? 0,
        marginLeft: ml ?? 0,
        marginBottom: mb ?? 0,
        padding: pl ?? 0,
        ...style,
      }}
    >
      {title && (
        <div className="card-content">
          <Typography fs={20} fw={500} children={title} />
        </div>
      )}

      {_list?.length > 0 && (
        <Fragment>
          {_list.reduce((acc, _, index) => {
            if (index % 5 === 0) {
              acc.push(
                <FlexBox key={`flexbox-${index}`} style={{ flexWrap: 'wrap' }}>
                  {_list
                    .slice(index, index + 5)
                    .map((item, _index) => (listProducts ? <Product key={item._id} item={item} /> : <SubcategoryCard key={_index} item={item} />))}
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
