import React from 'react';

const PrymaryIconBackground = ({ image, size = 40, backgroundColor }) => {
  const primary = '#8fb53f';
  const gray = '#edeef2';
  const _backgroundColor = { primary: primary, gray: gray }[backgroundColor] || gray;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} rx="12" fill={_backgroundColor} />
      {image && <image x="10" y="10" width="20" height="20" xlinkHref={image} />}
    </svg>
  );
};

export default PrymaryIconBackground;
