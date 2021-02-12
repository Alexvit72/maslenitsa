import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import prizePointer from '../img/basic_pointer.png';
import { Winwheel } from '../Winwheel';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import './Main.css';

const Main = ({ id, go, setResult, setActivePanel, count }) => {

	const [canvasId, setCanvasId] = useState('');

	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		setCanvasId(canvas.id);
	}, []);

	const segments = [];
	for (let i = 0; i < 12; i++) {
		if (i % 2) {
			segments.push({'fillStyle': '#f00'});
		} else {
			segments.push({'fillStyle': '#fff', 'text': 'prize'});
		}
	}
	let theWheel = new Winwheel({
		'canvasId': canvasId,
		'numSegments': 12,
		'segments': segments,
		'lineWidth': 0,
		'strokeStyle': null,
		'innerRadius': 20,
		'animation': {
			'type': 'spinToStop',
			'duration': 5,
			'spins': 8,
			'callbackFinished': showResult
		}
	});

	function showResult() {
    let winningSegment = theWheel.getIndicatedSegment();
		if (winningSegment.text) {
			setResult(true);
		} else {
			setResult(false);
		}
		setActivePanel('final');
	}

	function spin() {
		theWheel.startAnimation();
	}

	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="start" />}
			>
				MaslenitsaWheel
			</PanelHeader>
			<Header>Испытай удачу</Header>
			<Div className='canvas-conteiner'>
				<canvas id='myCanvas' ref={canvasRef} width='880' height='300'>
						Canvas not supported, use another browser.
				</canvas>
    		<img id="prizePointer" src={prizePointer} alt="V" />
			</Div>
			<Div>
				<Button size="l" mode="secondary" onClick={spin}>
					Вращать Колесо
				</Button>
				<Header mode='tertiary'>Вращать можно через {count}</Header>
			</Div>
		</Panel>
	);

};



Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	//count: PropTypes.number.isRequired
};

export default Main;
