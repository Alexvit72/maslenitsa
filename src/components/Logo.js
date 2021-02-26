import React from 'react';
import logoImg from '../img/logo.png';

const Logo = props => {
  return (
    <div className={props.className}>

      <svg viewBox="0 0 635 643" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M550.427 337.036L341.895 189.524L546.685 451.999L542.944 549.616L319.107 196.802L493.285 669H366.758L311.488 198.503L227.307 666.279L87.8547 664.578L296.216 193.095L87.8547 400.3L85.1337 335.336L284.448 181.939L85.5078 255.44L70.4062 215.237L277.951 166.939L66.0186 153.198V117.859L278.394 150.715L23.4007 61.398L0 -13.3278L285.638 136.09L51.189 -182.711L89.8954 -241.178L297.985 125.58L217.171 -293.626L283.087 -299L313.563 120.954L445.328 -296.279L515.054 -299L329.617 123.097L581.922 -103.529L611.173 -84.0401L343.46 131.566L611.173 7.59003L619.949 41.3646L352.643 144.933L619.949 116.941L634.54 138.845L355.568 160.885L569.338 180.306L559.746 218.332L351.793 176.667L534.577 284.827L550.427 337.036Z" fill="url(#paint0_radial)" fill-opacity="0.6" />
        <path opacity="0.8" d="M277.271 162.96L243.973 173.606C273.394 172.143 302.815 170.579 332.27 169.762L327.508 167.279L513.863 154.695L327.066 155.137L513.863 39.1878L321.045 144.559L482.435 -107.237L310.808 137.995L337.235 -136.42L298.699 136.974L189.723 -141.657L287.475 141.702L94.181 -10.7088L279.754 151.089L95.8136 118.709L277.271 162.96Z" fill="url(#paint1_radial)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(317.278 185) scale(409.22)">
            <stop stop-color="#C5DCFE" />
            <stop offset="1" stop-color="#C5DCFE" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(304.018 155.979) scale(210.52)">
            <stop stop-color="#C5DCFE" />
            <stop offset="1" stop-color="#EBF3FF" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <img className='logo_img' src={logoImg} alt='logo' />
    </div>
  );
}

export default Logo;
