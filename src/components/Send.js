import React from 'react';

import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Card from './Card';

const Send = props => {
  return <PopoutWrapper alignX='center' alignY='center' className='Send'>
		<Card className='Card' close={false} img='' title='Анкета принята' text='' label='Закрыть' onClick={props.onClick} />
	</PopoutWrapper>;
};

export default Send;
