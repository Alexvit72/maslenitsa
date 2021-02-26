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
import './fonts/baloo.css'
import './App.css';
import './reset.css';

const App = () => {

	let activity = {attempts: 5, vk_id: 482884100};

	const [activePanel, setActivePanel] = useState('loading');
	const [popout, setPopout] = useState('');
	const [result, setResult] = useState('true');
	const [fetchedUser, setUser] = useState(null);
	const [userActivity, setUserActivity] = useState(activity);
	const [percentIndex, setPercentIndex] = useState(0);

	useEffect(() => {
		showLoading();
	}, []);

	useEffect(() => {
		async function fetchUser() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);

		/*let token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7750445, "scope": "wall"});
			console.log(token);

			let repost = await bridge.send("VKWebAppCallAPIMethod", {"method": "wall.getById", "params": {"posts": `${user.id}_133`, "v": "5.130", "access_token": token.access_token}});
			console.log(repost);

			const response = await fetch(`https://maslenitsa.promo-dixy.ru/api/user?vk_id=${user.id}&exist_repost=${repost.response.length ? 1 : 0}`);
			console.log(response);
			if (response.ok) {
				let data = await response.json();
				console.log(data);
				setUserActivity(data.data);
			} else {
				console.log(response);
			}*/
		}
		fetchUser();
		console.log(fetchedUser);
		//console.log(userActivity);
	}, []);

	//useEffect(() => console.log(result), [result]);


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
		let token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7750445, "scope": "wall"});
		console.log(token);

		let repost = await bridge.send("VKWebAppCallAPIMethod", {"method": "wall.getById", "params": {"posts": `${fetchedUser.id}_133`, "v": "5.130", "access_token": token.access_token}});
		console.log(repost);

		const response = await fetch(`https://maslenitsa.promo-dixy.ru/api/user?vk_id=${fetchedUser.id}&exist_repost=${repost.response.length ? 1 : 0}`);
		console.log(response);
		if (response.ok) {
			let data = await response.json();
			console.log(data);
			setUserActivity(data.data);
		} else {
			console.log(response);
		}
		console.log(userActivity);
	}


	async function sendData(values) {
		let dataObject = Object.assign(values, {vk_id: userActivity.vk_id})
		let response = await fetch('https://maslenitsa.promo-dixy.ru/api/user/data', {
			method: 'POST',
  		headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json;charset=utf-8'
			},
  		body: JSON.stringify(dataObject)
		});
		console.log(response);
		let result = await response.json();
		console.log(result);
		if(result.success) {
			setUserActivity(result.data);
		} else {
			console.log(result.message);
		}
	}

	async function getResult() {
		let response = await fetch(`https://maslenitsa.promo-dixy.ru/api/result?vk_id=${userActivity.vk_id}`);
		console.log(response);
		let data = await response.json();
		console.log(data);
		setResult(data.result);
		setUserActivity(data.data);
	}

	function showFinal() {
		setPopout(<Final result={result}
		 setPopout={setPopout} setActivePanel={setActivePanel}
		 link={'https://vk.com/im?sel=-49256266'} />);
	}

	let images = [img1, img2, img3, img4, img5, img6, img7];
	let percents = [0, 15, 27, 48, 63, 84, 100];

	return (
		<View activePanel={percentIndex == 6 && fetchedUser != null ? activePanel : 'loading'} popout={popout}>
			<Loading id='loading' img={images[percentIndex]} className='Loading' percent={percents[percentIndex]} />
			<Start id='start' className='Start' setActivePanel={setActivePanel} fetchData={fetchData} />
			<Main id='main' className='Main' setResult={setResult}  setActivePanel={setActivePanel} getResult={getResult} showFinal={showFinal} userActivity={userActivity} />
			<Form id='form' className='Form' sendData={sendData} 		setActivePanel={setActivePanel} />
		</View>
	);
}

export default App;
