import React from 'react';
import './Button.css';

const Button = props => {

  return <div className={props.className}>
    <button className='Button_item'
      disabled={props.disabled}
      onClick={props.onClick}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
    >
      {props.label}
    </button>
  </div>

};

export default Button;
