import React, { useState } from 'react';

import { SketchPicker } from 'react-color';

const ColorPicker = ({ initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    if (onChange) {
      onChange(color.hex);
    }
  };

  return (
    <div>
      <div
        style={{
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          backgroundColor: color,
          border: '1px solid #000',
          cursor: 'pointer',
        }}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={() => setShowPicker(false)}
          />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
