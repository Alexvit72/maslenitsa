import React from 'react';
import './Button.css';

const Button = props => {

  return <div className={props.className}>
    <button className='Button_item'
      disabled={props.disabled}
      onClick={((event) => props.onClick(event))} //props.play && 
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      type={props.type}
      form={props.form}
    >
      {props.label}
    </button>
  </div>

};

export default Button;
