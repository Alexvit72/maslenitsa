import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

import './Start.css';

const Start = props => {

	useEffect(() => {
		props.fetchData();
	}, []);

	function start() {
		bridge.subscribe((event) => {
			const { type, data } = event.detail;
			if (type === 'VKWebAppAllowMessagesFromGroupResult') {
				props.setActivePanel('main');
			}
			/*if (type === 'VKWebAppAllowMessagesFromGroupFailed') {
				// Catching the error
				console.log(data.error_type, data.error_data);
			}*/
		});
		bridge.send('VKWebAppAllowMessagesFromGroup',
			{'group_id': 49256266});
	}

	const list = [
		`1. Испытай удачу в нашей игре! Вращай барабан и выигрывай скидочные купоны в Дикси.`,
		`2. Чтобы раскрутить барабан сильнее, зажми кнопку крутить, пока шкала силы не заполнится до нужного уровня.`,
		`3. Ты можешь получить дополнительные попытки. Для этого кликни по кнопке “+” вверху и выбери задание из списка.`,
		`4. В случае выигрыша бот отправит скидку в сообщения . Для этого нужно разрешить сообществу отправлять сообщения. Приступим?`
	].map((item, index) => {
		return <p className='list-item' key={index}>{item}</p>;
	});

	return (
		<Panel id={props.id}>
			<div className={props.className}>
				<Card className='Card' title='Как играть?' img={logo} text={list} label='Начать' onClick={start} />
			</div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
