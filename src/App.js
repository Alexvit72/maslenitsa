import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
//import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import { Winwheel } from './Winwheel';

import Loading from './panels/Loading';
import Start from './panels/Start';
import Main from './panels/Main';
import Final from './panels/Final';

const App = () => {
	const [activePanel, setActivePanel] = useState('start');
	const [result, setResult] = useState(false);
	const [progress, setProgress] = useState(40);

//	const [fetchedUser, setUser] = useState(null);
//	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	/*useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);*/



	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} /*popout={popout}*/>
			<Loading id='loading' /*fetchedUser={fetchedUser}*/ go={go} progress={progress} />
			<Start id='start' go={go} />
		<Main id='main' go={go} setResult={setResult} setActivePanel={setActivePanel} />
			<Final id='final' go={go} result={result} />
		</View>
	);
}

export default App;
