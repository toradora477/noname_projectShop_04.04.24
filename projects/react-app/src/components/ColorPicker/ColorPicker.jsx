import React, { useState } from 'react';
import './ColorPicker.scss';

const ColorPicker = ({ initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    if (onChange) {
      onChange(color.hex);
    }
  };

  const predefinedColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#FFFFFF',
    '#000000',
  ];

  return (
    <div className="color-picker">
      <div
        className="color-picker__selected"
        style={{ backgroundColor: color }}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
      />
      {showPicker && (
        <div className="color-picker__palette">
          <div className="color-picker__palette-overlay" onClick={(e) => e.stopPropagation()}>
            {predefinedColors.map((color, index) => (
              <div
                key={index}
                className="color-picker__color"
                style={{
                  backgroundColor: color,
                  border: color === '#FFFFFF' || color === '#000000' ? '1px solid #ccc' : 'none',
                }}
                onClick={() => {
                  handleChangeComplete({ hex: color });
                  setShowPicker(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
