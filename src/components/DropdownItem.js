import React from 'react';
import './DropdownItem.css';

const DropdownItem = props => {
  // console.log('props', props)
  return (
    <div className={props.className}>
      <label className='label'>
        <input type='checkbox' className='checkbox'
          name={props.name}
          checked={props.checked}
          //onClick={props.onClick}
          disabled={props.disabled}
          onChange={props.onChange}
        />
        <span className='action' onClick={props.onClick}>{props.text1}</span>
        <span className='bonus'>{props.text2 ? '+' + props.attempts + props.text2 : ''}</span>
      </label>
    </div>
  );
};

export default DropdownItem;
