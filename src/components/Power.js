import React from 'react';

const Power = props => {

  const styleObject = {width: `${props.value}%`};

  return (
    <div className={props.className}>
      <div className='slider' style={styleObject}></div>
    </div>
  );
};

export default Power;
