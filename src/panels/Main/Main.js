import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js'

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import Power from '../../components/Power';
import Headline from '../../components/Headline';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Scene from '../../components/Scene';
import Attempts from '../../components/Attempts';
import Dropdown from '../../components/Dropdown';

import './Main.css';

const Main = ({ id, className, go, setResult, attempts, decreaseAttempts}) => {

	const [progress, setProgress] = useState(1);
	const [render, setRender] = useState(null);
	const [timerId, setTimerId] = useState('');
	const [isRotating, setIsRotaiting] = useState(false);
	const [startPositionX, setstartPositionX] = useState(170.25);
	const [startPositionY, setStartPositionY] = useState(336.5);

	function powerCountStart() {
		let count = 0;
		let timerId = setInterval(() => {
			if (count < 20) {
				setProgress(count);
				count++;
			} else {
				setProgress(20)
				clearInterval(timerId);
			}
		}, 50);
		setTimerId(timerId);
	}

	function rotate() {
		let composites = render.engine.world.composites;
		let outputCover = composites[2].bodies[2];
		let outputBody = composites[2].bodies[3];
		//let startPositionX = outputBody.position.x;
		//let startPositionY = outputBody.position.y;
		console.log(outputBody.position.x, outputBody.position.y);
		clearInterval(timerId);
		console.log(progress);
		let currentRotation = progress / 10;
		setProgress(0);
		setIsRotaiting(true);
		decreaseAttempts();
		Matter.Events.on(render.engine, 'afterUpdate', function bar()  {
			if (currentRotation > 0.01) {
				Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
				Matter.Composite.rotate(composites[2], currentRotation, {x: 200, y: 200});
				Matter.Composite.rotate(composites[1], currentRotation / 2, {x: 200, y: 200});
				currentRotation *= 0.99;
			} else {
				if (outputBody.position.x - startPositionX > 0.5 || outputBody.position.y - startPositionY > 0.5 || startPositionX - outputBody.position.x > 10 || startPositionY - outputBody.position.y > 10) {
					Matter.Composite.remove(composites[2], outputCover);
					Matter.Composite.rotate(composites[0], currentRotation, {x: 200, y: 200});
					Matter.Composite.rotate(composites[2], currentRotation, {x: 200, y: 200});
				} else {
					Matter.Events.off(render.engine, 'afterUpdate', bar);
					showResult();
				}
			}
		});
	}

	function showResult() {

		let balls = render.engine.world.composites[1].bodies;
		let selectedBall = balls[0];
		for (let ball of balls) {
			if (ball.position.y > selectedBall.position.y) {
				selectedBall = ball;
			}
		}
		console.log(selectedBall);
		let index = balls.indexOf(selectedBall);
		let otherBalls = [].concat(balls.slice(0, index), balls.slice(index + 1));
		for (let ball of otherBalls) {
			Matter.Body.setStatic(ball, true);
		}
		let output = render.engine.world.composites[2];
		let outputBody = output.bodies[2];

		const scale = () => {
			Matter.Composite.remove(output, outputBody);
			Matter.Body.setStatic(selectedBall, true);
			Matter.Events.on(render.engine, 'afterUpdate', function(event) {
				if (selectedBall.position.y < 380) {
					Matter.Body.setPosition(selectedBall, {x: selectedBall.position.x, y: selectedBall.position.y + 1});
				} else {
					Matter.Events.off(render.engine, 'afterUpdate');
					setResult(selectedBall.label);
					setIsRotaiting(false);
				}
			});
		};
		setTimeout(scale, 500);
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
					<Headline className='Headline' text='Испытай удачу!' />
					<div className='scene-container'>
						<Scene className='Scene' setRender={setRender} />
					</div>
					<div>
						<Power className='Power' value={progress * 5} />
						<Button className='Button'
							disabled={/*count === 0 ||*/ isRotating}
							onMouseDown={powerCountStart}
							onMouseUp={rotate}
							label='Крутить'
						/>
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
