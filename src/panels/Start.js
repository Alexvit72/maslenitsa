import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const Start = props => {

	return (
		<Panel id={props.id}>
			<PanelHeader>
				Maslenitsa
			</PanelHeader>
			<Card mode='shadow'>
				<ol>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ol>
			</Card>
			<Div>
				<Button size="l" mode="secondary"	onClick={props.go} data-to='main'>
					Start
				</Button>
			</Div>
		</Panel>
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Start;
