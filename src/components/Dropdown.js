import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import DropdownItem from './DropdownItem';
import './Dropdown.css';

const Dropdown = props => {
  let startSubscribed = false;
  let startReposted = false;
  let startFilled = false;
  for (let task of props.userActivity.tasks) {
    if (task.name == 'Подписка на сообщество') {
      startSubscribed = task.completed;
    } else if (task.name == 'Репост записи с игрой') {
      startReposted = task.completed;
    } else if (task.name == 'Заполнение анкеты') {
      startFilled = task.completed;
    }
  }

  const [subscribed, setSubscribed] = useState(startSubscribed);
  const [filled, setFilled] = useState(startFilled);
  const [reposted, setReposted] = useState(startReposted);

  async function handleChange(event) {
    if (event.target.name == 'anket') {
      props.setActivePanel('form');
    } else if (event.target.name == 'subscribe') {
      let responseSubscribe = await bridge.send('VKWebAppAllowMessagesFromGroup',
        {'group_id': 49256266});
        console.log(responseSubscribe);
			if (responseSubscribe.result) {
				setSubscribed(responseSubscribe.result);
			} else {
        console.log(responseSubscribe.error_data.error_reason);
      }
    } else if (event.target.name == 'repost') {
      let responseRepost = await bridge.send('VKWebAppShowWallPostBox',
      {
        'message': 'Hello!',
        'attachments': 'http://habrahabr.ru'
      });
      console.log(responseRepost);
      if (responseRepost.type == "VKWebAppShowWallPostBoxResult") {
        setReposted(true);
      } else if (responseRepost.type == "VKWebAppShowWallPostBoxFailed ") {
        console.error(responseRepost.error_data.error_reason);
      }
    }
  }

  return (
    <div className={props.className}>
      <div className='DropdownItem-wrapper'>
        <DropdownItem className='DropdownItem subscribe' name='subscribe' checked={subscribed} text1=' Подписаться на группу' attempts='3' text2='попытки' onChange={handleChange} disabled={subscribed}
        />
        <DropdownItem className='DropdownItem repost' name='repost'
          checked={reposted} text1=' Репост записи группы'
          attempts='2' text2='попытки' onChange={handleChange} disabled={reposted}
        />
        <DropdownItem className='DropdownItem anket' name='anket'
          checked={filled} text1=' Заполнить анкету ' attempts='2' text2='попытки' onChange={handleChange} disabled={false}
        />
      </div>
    </div>
  );
};

export default Dropdown;
