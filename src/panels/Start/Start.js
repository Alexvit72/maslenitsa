import React from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

import './Start.css';

const Start = props => {

	function clickHandler() {
		async function fetchAllowMessage() {
			const response = await bridge.send('VKWebAppAllowMessagesFromGroup', {'group_id': 49256266});
			console.log(response);
			if (response.result) {
				props.setActivePanel('main');
			}
		}
		fetchAllowMessage();
	}

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
				<Card className='Card' title='Как играть?' img={logo} text={list} label='Начать' onClick={clickHandler} />
			</div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
