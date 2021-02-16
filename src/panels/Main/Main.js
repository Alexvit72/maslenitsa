import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js'

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
/*import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';*/
import Power from '../../components/Power';
import Headline from '../../components/Headline';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Scene from '../../components/Scene';
import Attempts from '../../components/Attempts';
import Dropdown from '../../components/Dropdown';

import './Main.css';

const Main = ({ id, className, go, setResult, attempts, decreaseAttempts}) => {

	const [timer, setTimer] = useState('');
	const [progress, setProgress] = useState(1);
	const [render, setRender] = useState(null);
	const [timerId, setTimerId] = useState('');
	const [isRotating, setIsRotaiting] = useState(false);
	const [startPositionX, setstartPositionX] = useState(168.5);
	const [startPositionY, setStartPositionY] = useState(329.5);

	function powerCountStart() {
		console.log('down');
		let timerId = setInterval(() => {
			if (progress < 10) {
				setProgress(progress => progress + 1);
			} else {
				clearInterval(timerId);
			}
			console.log(progress);
		}, 130);
		setTimerId(timerId);
	}

	function rotate() {
		let composites = render.engine.world.composites;
		//console.log(composites);
		let outputBody = composites[2].bodies[0];
		//let startPositionX = outputBody.position.x;
		//let startPositionY = outputBody.position.y;
		console.log(startPositionX, startPositionY);
		clearInterval(timerId);
		let currentRotation = progress / 10;
		setProgress(0);
		//setIsRotaiting(true);
		decreaseAttempts();
		//console.log(progress);
		Matter.Events.on(render.engine, 'afterUpdate', function(event) {
			if (currentRotation > 0.01) {
				Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
				Matter.Composite.rotate(composites[2], currentRotation, {x: 200, y: 200});
				Matter.Composite.rotate(composites[1], currentRotation / 2, {x: 200, y: 200});
				currentRotation *= 0.99;
			} else {
				//currentRotation = 0.01
				if (outputBody.position.x - startPositionX > 0.5 || outputBody.position.y - startPositionY > 0.5 || startPositionX - outputBody.position.x > 10 || startPositionY - outputBody.position.y > 10) {
					Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
					Matter.Composite.rotate(composites[2], currentRotation, {x: 200, y: 200});
				} else {/*
					if (outputBody.position.x - startPositionX > 0.5 || outputBody.position.y - startPositionY > 0.5) {
						currentRotation = 0.002;
						Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
						Matter.Composite.rotate(composites[2], currentRotation, {x: 200, y: 200});
					} else {*/
						console.log(outputBody.position);
						Matter.Events.off(render.engine);
						showResult();
				}
			}

		});
	}

	function showResult() {
		let balls = render.engine.world.composites[1].bodies;
		let selectedBall = balls[0];
		for (let ball of balls) {
			if (ball.position.y < selectedBall.position.y) {
				if (Math.abs(startPositionX - ball.position.x) < Math.abs(startPositionX - selectedBall.position.x)) {
					selectedBall = ball;
				}
			}
		}
		//Matter.Body.translate(selectedBall, {x: 20, y: 20});
		//console.log(selectedBall);
		Matter.Body.setPosition(selectedBall, {x: 50, y: 350});
		Matter.Body.setStatic(selectedBall, true);
		setResult(selectedBall.label);
		setIsRotaiting(false);
	}

	return (
		<Panel id={id}>
			<div className={className}>
				<header>
					<Logo className='Logo' />
					<Attempts className='Attempts' attempts={attempts} />
				</header>
				<Dropdown className='Dropdown' />
				<div className='game-container'>
					<Headline text='Испытай удачу' />
					<div className='scene-container'>
						<Scene setRender={setRender} />
						<Power className='Power' value={progress * 10} />
					</div>
					<div>
						<Button
							disabled={/*count === 0 ||*/ isRotating}
							onMouseDown={powerCountStart}
							onMouseUp={rotate}
							label='Крутить'
						/>
						<p>Повтор через {timer}</p>
					</div>
				</div>
			</div>
		</Panel>
	);

};

Main.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	//count: PropTypes.number.isRequired
};

export default Main;
