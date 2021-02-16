import React from 'react';

const Attempts = props => {
  return (
    <div className={props.className}>
      <div className='like'></div>
      <div className='count'>
        {props.attempts} попыток
      </div>
      <div className='add'></div>
    </div>
  );
};

export default Attempts;
