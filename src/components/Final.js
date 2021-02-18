import React from 'react';
import PropTypes from 'prop-types';

import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Card from './Card';

import win from '../img/prezentWin.svg';
import lose from '../img/prezentLose.png';
//import './Final.css';

const Final = props => {

function handleClick() {
	props.setResult('');
	props.setActivePanel('start');
}

	return <PopoutWrapper alignX='center' alignY='center'>
		{props.result ?
			<Card className='Card'
				img={win}
				title='Победа!'
				text='Проверьте личные сообщения, мы отправили вам подарок'
				label={<a href={props.link}>Забрать</a>}
				onClick={handleClick}
			/> :
			<Card className='Card'
				img={lose}
				title='Попробуй ещё'
				text='Не расстраивайся, может, повезет в следующий раз'
				label='Еще раз'
				onClick={handleClick}
			/>
		}
	</PopoutWrapper>;

}

/*Final.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	//result: PropTypes.boolean.isRequired
};*/

export default Final;
