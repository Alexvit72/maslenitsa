import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js'

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Scene from './Scene';

import './Main.css';

const Main = ({ id, go, setResult}) => {

	const [progress, setProgress] = useState(1);
	const [render, setRender] = useState(null);
	const [timerId, setTimerId] = useState('');
	const [isRotating, setIsRotaiting] = useState(false);

	function powerCountStart() {
		console.log('down');
		let timerId = setInterval(() => {
			if (progress < 10) {
				setProgress(progress => progress + 1);
			} else {
				clearInterval(timerId);
			}
			console.log(progress);
		}, 150);
		setTimerId(timerId);
	}

	function rotate() {
		clearInterval(timerId);
		let currentRotation = progress / 10;
		setProgress(0);
		setIsRotaiting(true);
		console.log(progress);
		let composites = render.engine.world.composites;
		console.log(composites);
		Matter.Events.on(render.engine, 'afterUpdate', function(event) {
			if (currentRotation > 0.0001) {
				Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
				Matter.Composite.rotate(composites[1], currentRotation / 2, {x: 200, y: 200});
				currentRotation *= 0.99;
			} else {
				console.log(currentRotation);
				showResult();
				Matter.Events.off(render.engine);
			}
		});
	}

	function showResult() {
		let balls = render.engine.world.composites[1].bodies;
		let selectedBall = balls[0];
		for (let ball of balls) {
			if (ball.position.y > selectedBall.position.y) {
				selectedBall = ball;
			} else if (ball.position.y == selectedBall.position.y) {
				if (Math.abs(200 - ball.position.x) < Math.abs(200 - selectedBall.position.x)) {
					selectedBall = ball;
				}
			}
		}
		console.log(selectedBall);
		Matter.Body.setPosition(selectedBall, {x: 50, y: 350});
		Matter.Body.setStatic(selectedBall, true);
		setResult(selectedBall.label);
		setIsRotaiting(false);
	}

	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="start" />}
			>
				Maslenitsa
			</PanelHeader>
			<Div className='game-container'>
				<Header>Испытай удачу</Header>
				<Div className='scene-container'>
					<Scene setRender={setRender} />
					<Progress value={progress * 10} />
				</Div>
				<Div>
					<Button size="l" mode="secondary" disabled={isRotating}
					 	stopPropagation={false}
						onMouseDown={powerCountStart}
						onMouseUp={rotate}
					>
						Вращать
					</Button>
					<Header mode='tertiary'>Вращать можно через</Header>
				</Div>
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
