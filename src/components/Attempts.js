import React from 'react';
import './Attempts.css';
import heart from '../img/heart.svg';
import add from '../img/plus.svg';

const Attempts = props => {
  return (
    <div className={props.className}>
      <div className='Attempts_item'>
        <div className='heart'>
          <img src={heart} />
        </div>
        <div className='count'>
          {props.attempts}<span>попыток</span>
        </div>
        <div className='add' onClick={props.clickHandler}>
          <img src={add} />
        </div>
      </div>
    </div>
  );
};

export default Attempts;
