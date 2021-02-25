import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';

import './Start.css';

const Start = props => {

	const list = ['1. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	'2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
	'3. Lorem ipsum dolor sit amet, consectetur ad',
	'4. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
	'3. Lorem ipsum dolor sit amet, consectetur ad'].map((item, index) => {
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
