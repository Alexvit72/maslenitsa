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

const Main = ({ id, className, setResult, setActivePanel, showFinal, userActivity, setWin, getResult }) => {

	const [progress, setProgress] = useState(1);
	const [render, setRender] = useState(null);
	const [timerId, setTimerId] = useState('');
	const [isRotaiting, setIsRotaiting] = useState(false);
	const [startPositionX, setstartPositionX] = useState(0);
	const [startPositionY, setStartPositionY] = useState(0);
	const [isDrop, setIsDrop] = useState(false);
	const [attempts, setAttempts] = useState(0);

	function changePower() {
		if (!isRotaiting && userActivity.attempts > 0) {
			let count = 1;
			let isRising = true;
			let timerId = setInterval(() => {
				if (count < 20 && count > 1) {
					if (isRising) {
						count++;
					} else {
						count--;
					}
				} else if (count == 20) {
					isRising = false;
					count--;
				} else if (count == 1) {
					isRising = true;
					count++;
				}
				setProgress(count);
			}, 10);
			setTimerId(timerId);
		}
	}

	useEffect(() => {
		changePower();
		return function() {clearInterval(timerId)};
	}, []);

	useEffect(() => {
		setAttempts(userActivity.attempts);
	}, []);

	function rotate() {

		setIsRotaiting(true);

		clearInterval(timerId);

		getResult();

		let composites = render.engine.world.composites;
		let outputCover = composites[2].bodies[2];
		let outputBody = composites[2].bodies[3];
		let startPositionX = outputBody.position.x;
		let startPositionY = outputBody.position.y;

		let currentRotation = progress / 10;

		Matter.Events.on(render.engine, 'afterUpdate', function bar()  {
			if (currentRotation > 0.01) {
				Matter.Composite.rotate(composites[0], currentRotation, {x: 150, y: 200});
				Matter.Composite.rotate(composites[2], currentRotation, {x: 150, y: 200});
				Matter.Composite.rotate(composites[1], currentRotation / 2, {x: 150, y: 200});
				currentRotation *= 0.99;
			} else {
				if (outputBody.position.x - startPositionX > 0.5 || outputBody.position.y - startPositionY > 0.5 || startPositionX - outputBody.position.x > 10 || startPositionY - outputBody.position.y > 10) {
					Matter.Composite.remove(composites[2], outputCover);
					Matter.Composite.rotate(composites[0], currentRotation, {x: 150, y: 200});
					Matter.Composite.rotate(composites[2], currentRotation, {x: 150, y: 200});
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
		let index = balls.indexOf(selectedBall);
		let otherBalls = [].concat(balls.slice(0, index), balls.slice(index + 1));
		for (let ball of otherBalls) {
			Matter.Body.setStatic(ball, true);
		}
		let output = render.engine.world.composites[2];
		let outputBody = output.bodies[2];

		const moveBall = () => {
			Matter.Composite.remove(output, outputBody);
			Matter.Body.setStatic(selectedBall, true);
			Matter.Events.on(render.engine, 'afterUpdate', function(event) {
				if (selectedBall.position.y < 360) {
					Matter.Body.setPosition(selectedBall, {x: selectedBall.position.x, y: selectedBall.position.y + 1});
				} else {
					Matter.Events.off(render.engine, 'afterUpdate');
					setTimeout(showFinal, 1000);
				}
			});
		};

		setTimeout(moveBall, 500);

		setIsRotaiting(false);

	}

	function toggleDrop() {
		setIsDrop((isDrop) => !isDrop);
	}

	return (
		<Panel id={id}>
			<div className={className}>
				<header>
					<Logo className='Logo' />
					<Attempts className='Attempts' attempts={attempts} clickHandler={toggleDrop} />
				</header>
				<Dropdown className={'Dropdown' + (isDrop ? ' visible' : ' hidden')} userActivity={userActivity} setAttempts={setAttempts} setActivePanel={setActivePanel} />
				<div className='game-container'>
					<Headline className='Headline' text='Испытай удачу!' />
					<div className='scene-container'>
						<Scene className='Scene' setRender={setRender} />
					</div>
					<div>
						<Power className='Power' value={progress * 5} />
						<Button className='Button'
							disabled={userActivity.attempts <= 0 || isRotaiting}
							onClick={rotate}
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
};

export default Main;
