import React from 'react';

const Button = props => {

  return <button
   className={props.className}
   disabled={props.disabled}
   onClick={props.onClick}
   onMouseUp={props.onMouseUp}
   onMouseDown={props.onMouseDown}
  >
   {props.label}
  </button>;

};

export default Button;
