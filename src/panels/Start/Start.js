import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

const Start = props => {

	useEffect(() => {
		props.fetchData();
	}, []);

	function start() {
		props.fetchData();
		bridge.subscribe((e) => {
			if (e.detail.type === 'VKWebAppAllowMessagesFromGroupResult') {
				props.setActivePanel('main');
			}

		});
		bridge.send('VKWebAppAllowMessagesFromGroup',
			{ 'group_id': 49256266 });
	}

	const list = [
		`1. Испытай удачу в нашей игре! Получи возможность выиграть скидочные купоны в Дикси.`,
		`2. Чтобы регулировать силу вращения барабана, нажми кнопку «крутить», когда шкала силы заполнится до нужного уровня.`,
		`3. Ты можешь получить дополнительные попытки. Для этого или кликни по кнопке “+” вверху и выполняй задания, или дождись паузы в 5 часов.`,
		`4. В случае выигрыша купон со скидкой будет отправлен в личные сообщения. Для этого нужно разрешить сообществу Дикси отправлять сообщения. Приступим ?`
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
