import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Empty } from '../';

import './List.scss';

const List = ({ mt, style, className, dataSource, renderItem, emptyDescription = 'Немає даних' }) => {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return <Empty description={emptyDescription} w={350} h={250} />;
  }

  const renderList = dataSource.map((item, index) => {
    const _key = item._id ?? dayjs().valueOf() + index;

    return (
      <li key={_key} className="list-item">
        {renderItem(item)}
      </li>
    );
  });

  return (
    <ul
      className={clsx('list-component', className)}
      style={{
        marginTop: mt ?? 0,
        ...style,
      }}
    >
      {renderList}
    </ul>
  );
};

export default List;
