import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Card from '@vkontakte/vkui/dist/components/Card/Card';

import prize from '../img/prize.png';
import cat from '../img/cat.png';
//import './Final.css';

const Final = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="main" />}
		>
			MaslenitsaWheel
		</PanelHeader>
		{props.result ?
			<Card mode='shadow'>
				<img className="prize" src={prize} alt="prize"/>
				<p>Победа! Вы выиграли приз</p>
				<p>Проверьте личные сообщения вконтакте</p>
			</Card> :
			<Card mode='shadow'>
				<img className="cat" src={cat} alt="cat"/>
				<p>Не расстраивайся, может, повезет в следующий раз</p>
			</Card>
		}
	</Panel>
);

Final.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	//result: PropTypes.boolean.isRequired
};

export default Final;
