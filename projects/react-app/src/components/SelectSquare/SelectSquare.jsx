import React, { useState } from 'react';
import ColorSquare from '../ColorSquare';
import './SelectSquare.scss';

const SelectSquare = ({ onSelect, optionsColor, optionsText, mr }) => {
  const [selectedOption, setSelectedOption] = useState({});

  const handleOptionClick = (obj) => {
    onSelect(obj);
    setSelectedOption(obj);
  };

  const _options = optionsColor ?? optionsText ?? [];

  const select = _options.map((i, index) => (
    <button
      type="button"
      key={index}
      className="select-button"
      onClick={() => handleOptionClick({ index: index, color: optionsColor ? i : undefined, text: optionsText ? i : undefined })}
    >
      <ColorSquare isChoiceSelect={selectedOption?.index === index} color={optionsColor ? i : undefined} text={optionsText ? i : undefined} mr={mr} />
    </button>
  ));

  return select;
};

export default SelectSquare;
