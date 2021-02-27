import React from 'react';

import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Card from './Card';

import win from '../img/prezentWin.svg';
import lose from '../img/prezentLose.png';
import './Final.scss';

const Final = props => {

async function handleClick() {
	props.setPopout('');
	props.setActivePanel('start');
}

	return <PopoutWrapper alignX='center' alignY='center' className='Final'>
		{props.result ?
			<Card className='Card win'
				img={win}
				title='Победа!'
				text='Проверьте личные сообщения, мы отправили вам подарок'
				label={<a href={props.link} target='_blank'>Забрать</a>}
				onClose={handleClick}
				close={true}
			/> :
			<Card className='Card lose'
				img={lose}
				title='Попробуй ещё'
				text='Не расстраивайся, может, повезет в следующий раз'
				label='Еще раз'
				onClick={handleClick}
			/>
		}
	</PopoutWrapper>;

}

export default Final;
