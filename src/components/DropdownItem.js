import React from 'react';
import './DropdownItem.css';

const DropdownItem = props => {
  return (
    <div className={props.className}>
      <label className='label'>
        <input type='checkbox' checked={props.checked}
          name={props.name} onChange={(event) => props.onChange(event)}
        />
        {props.text}
      </label>
      <span className='bonus'>+{props.attempts} попытки</span>
    </div>
  );
};

export default DropdownItem;
