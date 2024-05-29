import React, { useState } from 'react';
import ColorSquare from '../ColorSquare/index';

const SelectSquare = ({ onSelect, optionsColor, optionsText, mr }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption.value);
  };

  const _options = optionsColor ?? optionsText ?? [];

  const select = _options.map((i, index) => (
    <ColorSquare key={index} color={optionsColor ? i : undefined} text={optionsText ? i : undefined} mr={mr} />
  ));

  return select;
};

export default SelectSquare;
