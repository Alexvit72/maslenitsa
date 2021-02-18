import React from 'react';
import icon from '../img/power.svg';
import './Power.css';

const Power = props => {

  const styleObject = {width: `${props.value}%`};

  return (
      <div className={props.className}>
        <img className={props.className + '_icon'} src={icon} alt='power' />
        <div className={props.className + '_max'}>
          <div className={props.className + '_slider'} style={styleObject}>
          </div>
        </div>
      </div>
  );
};

export default Power;
