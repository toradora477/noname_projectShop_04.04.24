import React from 'react';
import './List.scss';

const List = ({ dataSource, renderItem }) => {
  return (
    <ul className="list-component">
      {dataSource.map((item) => (
        <li key={item._id} className="ant-list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
