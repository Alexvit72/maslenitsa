import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
//import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Loading from './panels/Loading/Loading';
import Start from './panels/Start/Start';
import Main from './panels/Main/Main';
import Final from './components/Final';
import img1 from './img/1.png';
import './App.css';
import './reset.css';

const App = () => {

	const [activePanel, setActivePanel] = useState('main');
	const [result, setResult] = useState('');
	const [progress, setProgress] = useState(40);
	const [fetchedUser, setUser] = useState(null);
	const [userActivity, setUserActivity] = useState(null);
	const [attempts, setAttempts] = useState(0);

	useEffect(() => {
		/*bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});*/
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			/*const userActivity = await bridge.send('');
			setUserActivity(userActivity);
			setAttempts(userActivity.attempts);*/
			setActivePanel('start');
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	function decreaseAttempts() {
		setAttempts(attempts => attempts - 1);
	}

	return (
		<View activePanel={activePanel}
			popout={result === '' ? '' :
			<Final result={result == 'win'}
			 setResult={setResult} setActivePanel={setActivePanel}
			 link={'https://vk.com/im?sel=-49256266'} />}
		>
			<Loading id='loading' img={img1} className='Loading' />
			<Start id='start' className='Start' setActivePanel={setActivePanel} />
			<Main id='main' className='Main' go={go} setResult={setResult} attempts={attempts} decreaseAttempts={decreaseAttempts} />
		</View>
	);
}

export default App;
