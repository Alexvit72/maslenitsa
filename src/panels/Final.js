import React from 'react';
import PropTypes from 'prop-types';

import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Card from '@vkontakte/vkui/dist/components/Card/Card';

import prize from '../img/prize.png';
import cat from '../img/cat.png';
//import './Final.css';

const Final = props => {

function close() {
	props.setResult('');
}

	const dissMiss = <div className='close' onClick={close}>X</div>;

	return <PopoutWrapper alignX='center' alignY='center'>
		{props.result ?
			<Card mode='shadow'>
				<img className="prize" src={prize} alt="prize"/>
				<p>Победа! Вы выиграли приз</p>
				<p>Проверьте личные сообщения вконтакте</p>
				{dissMiss}
			</Card> :
			<Card mode='shadow'>
				<img className="cat" src={cat} alt="cat"/>
				<p>Не расстраивайся, может, повезет в следующий раз</p>
				{dissMiss}
			</Card>
		}
	</PopoutWrapper>;
	
}

/*Final.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	//result: PropTypes.boolean.isRequired
};*/

export default Final;
