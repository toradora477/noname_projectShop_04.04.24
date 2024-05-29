import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import './SelectNew.scss';

const SelectNew = ({ options, control, name, className, onChange: onChangeProp, ...props }) => {
  const [uniqueId] = useState(() => 'select_' + Math.random().toFixed(5).slice(2));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenuHandler = async () => {
    await setIsMenuOpen(true);
    const select = document.querySelector(`#${uniqueId} > div:last-of-type`);
    select.classList.add('select-opening');
    select.classList.remove('select-closing');
  };

  const closeMenuHandler = () => {
    const select = document.querySelector(`#${uniqueId} > div:last-of-type`);
    select.classList.remove('select-opening');
    select.classList.add('select-closing');
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 400);
  };

  return (
    
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          {...props}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: props.disabled ? 'transparent' : 'white',
              borderRadius: 32,
              paddingLeft: 5,
              paddingRight: 5,
            }),
          }}
          id={uniqueId}
          menuIsOpen={isMenuOpen}
          onMenuOpen={() => {
            openMenuHandler();
          }}
          onMenuClose={() => {
            closeMenuHandler();
          }}
          className={`new-select ${className}`}
          value={options.find((c) => c.value === value) ?? ''}
          isSearchable={false}
          onChange={(val) => {
            onChange(val.value)
            onChangeProp?.(val.value)
            }}
          options={options}
        />
      )}
    />
  );
};

export default SelectNew;
