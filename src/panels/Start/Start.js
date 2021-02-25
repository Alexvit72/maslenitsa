import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

import './Start.css';

const Start = props => {
	const list = [
		`1. Испытай удачу в нашей игре! Вращай барабан и выигрывай скидочные купоны в Дикси.`,
		`2. Чтобы раскрутить барабан сильнее, зажми кнопку крутить, пока шкала силы не заполнится до нужного уровня.`,
		`3. Ты можешь получить дополнительные попытки в игре. Для этого кликни по кнопке “+” в верхней части экрана и выбери задание из выпадающего списка.`,
		`4. В случае выигрыша бот отправит скидку в личные сообщения . Для этого нужно разрешить сообществу отправлять сообщения. Приступим?`
	].map((item, index) => {
		return <p className='list-item' key={index}>{item}</p>;
	});

	return (
		<Panel id={props.id}>
			<div className={props.className}>
				<Card className='Card' title='Как играть?' img={logo} text={list} label='Начать' onClick={props.fetchData} />
			</div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
