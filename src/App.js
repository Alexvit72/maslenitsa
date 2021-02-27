import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Loading from './panels/Loading/Loading';
import Start from './panels/Start/Start';
import Main from './panels/Main/Main';
import Form from './panels/Form/Form';
import Final from './components/Final';
import Send from './components/Send';

import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';

import './reset.css';
import './App.scss';

const App = () => {

	const [activePanel, setActivePanel] = useState('loading');
	const [popout, setPopout] = useState('');
	const [fetchedUser, setUser] = useState(null);
	const [userActivity, setUserActivity] = useState(null);
	const [percentIndex, setPercentIndex] = useState(0);

	useEffect(() => {
		showLoading();
	}, []);

	useEffect(() => {
		// setUser('')
		async function fetchUser() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchUser();
		console.log(fetchedUser);
	}, []);

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

		let token = await bridge.send("VKWebAppGetAuthToken", { "app_id": 7763188, "scope": "wall" }); //7763188

		let repost = await bridge.send("VKWebAppCallAPIMethod", { "method": "wall.getById", "params": { "posts": `${fetchedUser.id}_18`, "v": "5.130", "access_token": token.access_token } }); //295661
		const response = await fetch(`https://maslenitsa.promo-dixy.ru/api/user?vk_id=${fetchedUser.id}&exist_repost=${repost.response.length ? 1 : 0}`);

		if (response.ok) {
			let data = await response.json();
			setUserActivity(data.data);
		}
		console.log(userActivity)
	}

	function closeSend() {
		setPopout('');
		setActivePanel('main');
	}


	async function sendData(values) {
		let dataObject = Object.assign(values, { vk_id: userActivity.vk_id })
		let response = await fetch('https://maslenitsa.promo-dixy.ru/api/user/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(dataObject)
		});

		setPopout(<Send onClick={closeSend} />);
		let result = await response.json();
		if (result.success) {
			fetchData();
		}
	}

	let images = [img1, img2, img3, img4, img5, img6, img7];
	let percents = [0, 15, 27, 48, 63, 84, 100];

	return (
		<View activePanel={percentIndex == 6 && fetchedUser != null ? activePanel : 'loading'} popout={popout}>
			<Loading
				id='loading'
				img={images[percentIndex]}
				className='Loading'
				percent={percents[percentIndex]} />
			<Start
				id='start'
				className='Start'
				setActivePanel={setActivePanel}
				userActivity={userActivity}
				fetchData={fetchData} />
			<Main id='main'
				className='Main'
				setActivePanel={setActivePanel}
				userActivity={userActivity}
				setPopout={setPopout}
				fetchData={fetchData}
				setUserActivity={setUserActivity} />
			<Form id='form'
				className='Form'
				sendData={sendData}
				setActivePanel={setActivePanel} />
		</View>
	);
}

export default App;