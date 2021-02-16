import React from 'react';
import logoImg from '../img/logo.png';

const Logo = props => {
  return (
    <div className={props.className}>
      <img className='logo_img' src={logoImg} alt='logo' />
    </div>
  );
}

export default Logo;
