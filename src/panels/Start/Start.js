import React from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Logo from '../../components/Logo';
import Headline from '../../components/Headline';
import Button from '../../components/Button';

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

	return (
		<Panel id={props.id}>
			<div className={props.className}>
				<Logo className='Logo' />
				<div>
					<Headline className='Headline' text='Как играть?' />
					<ol>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ol>
					<Button className='Button' label='Начать'
						onClick={clickHandler}
					/>
				</div>
			</div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
