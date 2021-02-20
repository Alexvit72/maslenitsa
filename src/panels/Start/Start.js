import React from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

import './Start.css';

const Start = props => {

const list = (
	<ol>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ol>
);

	return (
		<Panel id={props.id}>
			<div className={props.className}>
				<Card className='Card' title='Как играть?' img={logo} text={list} label='Начать' onClick={() => props.setActivePanel('main')} />
			</div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
