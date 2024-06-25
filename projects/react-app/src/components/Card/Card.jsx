import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Card.scss';
import clsx from 'clsx';
import { Typography, FlexBox, Product, SubcategoryCard } from '../';

const Card = ({ listProducts, listCategories, children, title, mt, ml, mb, pl, style, className }) => {
  const { isDesktopScreen } = useSelector((state) => state.screenSize.deviceType);

  const _list = listProducts ?? listCategories ?? null;

  const getNumberElementsInRow = isDesktopScreen ? 5 : 2;

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
            if (index % getNumberElementsInRow === 0) {
              acc.push(
                <FlexBox key={`flexbox-${index}`} style={{ flexWrap: 'wrap' }}>
                  {_list
                    .slice(index, index + getNumberElementsInRow)
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
