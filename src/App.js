import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Loading from './panels/Loading/Loading';
import Start from './panels/Start/Start';
import Main from './panels/Main/Main';
import Form from './panels/Form/Form';
import Final from './components/Final';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';

import './App.css';
import './reset.css';

const App = () => {

	const [activePanel, setActivePanel] = useState('loading');
	const [result, setResult] = useState('');
	const [fetchedUser, setUser] = useState({});
	const [userActivity, setUserActivity] = useState({attempts: 10});
	const [attempts, setAttempts] = useState(10);
	const [percentIndex, setPercentIndex] = useState(0);

	useEffect(() => {
		showLoading();
	}, []);

	useEffect(() => {
		fetchData();
		console.log(fetchedUser);
		console.log(userActivity);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	function decreaseAttempts() {
		setAttempts(attempts => attempts - 1);
	}

	function showLoading() {
		let index = 0;
		let timerId = setInterval(() => {
			if (index < 6) {
				index++;
				setPercentIndex(index);
			} else {
				setActivePanel('start');
				clearInterval(timerId);
			}
		}, 500);
	}

	async function fetchData() {
		const user = await bridge.send('VKWebAppGetUserInfo');
		setUser(user);
		const response = await fetch(`https://maslenitsa.promo-dixy.ru/api/user?vk_id=${user.id}`);
		setUserActivity(response);
	}

	let images = [img1, img2, img3, img4, img5, img6, img7];
	let percents = [0, 15, 27, 48, 63, 84, 100];

	return (
		<View activePanel={percentIndex == 6 && fetchedUser != null ? activePanel : 'loading'}
			popout={result === '' ? '' :
			<Final result={result}
			 setResult={setResult} setActivePanel={setActivePanel}
			 link={'https://vk.com/im?sel=-49256266'} />}
		>
			<Loading id='loading' img={images[percentIndex]} className='Loading' percent={percents[percentIndex]} />
			<Start id='start' className='Start' setActivePanel={setActivePanel} />
			<Main id='main' className='Main' go={go} setResult={setResult} setActivePanel={setActivePanel} vk_id={fetchedUser.id} decreaseAttempts={decreaseAttempts} userActivity={userActivity} />
			<Form id='form' className='Form' go={go} />
		</View>
	);
}

export default App;
