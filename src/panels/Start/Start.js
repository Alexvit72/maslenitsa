import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import logo from '../../img/logo.png';
import sad from '../../img/sad.png';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';


const Start = props => {
	useEffect(() => {
		props.fetchData();

	}, []);

	function start() {
		props.fetchData();
		!props.play && props.setMessage(true)
		bridge.subscribe((e) => {
			if (e.detail.type === 'VKWebAppAllowMessagesFromGroupResult') {
				props.setActivePanel('main');
			}

		});
		bridge.send('VKWebAppAllowMessagesFromGroup',
			{ 'group_id': 49256266 });
	}

	const list = [
		`1. Испытай удачу в нашей игре! Получи возможность выиграть скидочные купоны в Дикси.*`,
		`2. Чтобы регулировать силу вращения барабана, нажми кнопку «крутить», когда шкала силы заполнится до нужного уровня.`,
		`3. Ты можешь получить дополнительные попытки. Для этого или кликни по кнопке “+” вверху и выполняй задания, или дождись паузы в 5 часов.`,
		`4. В случае выигрыша купон со скидкой будет отправлен в личные сообщения. Для этого нужно разрешить сообществу Дикси отправлять сообщения. Приступим ?`,
		`* Организатор вправе прекратить акцию досрочно. Количество купонов ограничено.`
	].map((item, index) => {
		return <p className='list-item' key={index}>{item}</p>;
	});
	function closeSend(e) {
		props.setMessage(false);
	}
	console.log(props)

	return (
		<Panel id={props.id}>
			<div className={props.className}>
				<Card
					className='Card'
					title='Как играть?'
					img={logo}
					text={list}
					disabled={!props.play}
					inner={<a href='https://dixy.ru/upload/medialibrary/765/Rules.27a4066a.pdf'
						target="_blank"> Полные правила акции</a>} label='Начать' onClick={start} />
			</div>
			{ props.message ?
				<PopoutWrapper alignX='center' alignY='center' className='Send'>
					<Card className='Card message'
						title='Упс!'
						img={sad}
					text='Купоны на сегодня закончились. Передохните. Завтра продолжим игру.'
						label='Закрыть'
						//play={true}
						onClick={closeSend}
						onClose={closeSend}
						close={true}
					/>
				</PopoutWrapper>
				: <></>
			}
		</Panel >
	);
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Start;
