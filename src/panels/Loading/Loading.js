import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../components/Logo';
import './Loading.css';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

const Loading = props => (
  <Panel id={props.id} >
    <div className={props.className}>
      <Logo className='Logo' />
      <div className='loading-progress'>
        <img className='loading-progress_img' src={props.img} />
        <p className='loading-progress_percent'>
          <span className='loading-progress_value'>
          {props.percent}</span><span> %</span>
        </p>
      </div>
    </div>
  </Panel>
);

Loading.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Loading;
