import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import DropdownItem from './DropdownItem';
import './Dropdown.css';

const Dropdown = props => {

  const [subscribed, setSubscribed] = useState(false);
  const [filled, setFilled] = useState(false);
  const [reposted, setReposted] = useState(false);

  /*for (let task of props.userActivity.tasks) {
    if (task.name == 'Подписка на сообщество') {
      setSubscribed(task.completed);
    } else if (task.name == 'Репост записи с игрой') {
      setReposted(task.completed);
    } else if (task.name == 'Заполнение анкеты') {
      setFilled(task.completed);
    }
  }*/

  async function handleChange(event) {
    if (event.target.name == 'anket') {
      props.setActivePanel('form');
      setFilled(true);
    } else if (event.target.name == 'subscribe') {
      let response = await bridge.send('VKWebAppAllowMessagesFromGroup',
        {'group_id': 49256266});
			if (response.result) {
				setSubscribed(true);
			} else {
        console.log(response.error_data.error_reason);
      }
    } else if (event.target.name == 'repost') {
      let response = await bridge.send('VKWebAppShowWallPostBox',
      {
        'message': 'Hello!',
        'attachments': 'http://habrahabr.ru'
      });
      if (response.post_id) {
        setReposted(true);
      } else {
        console.log(response.error_data.error_reason);
      }
    }
  }

  function toShare() {

  }

  return (
    <div className={props.className}>
      <div className='DropdownItem-wrapper'>
        <DropdownItem className='DropdownItem subscribe' name='subscribe' checked={subscribed} text1=' Подписаться на группу' attempts='3' text2='попытки' onChange={handleChange}
        />
        <DropdownItem className='DropdownItem repost' name='repost'
          checked={reposted} text1=' Репост записи группы'
          attempts='2' text2='попытки' onChange={handleChange}
        />
        <DropdownItem className='DropdownItem anket' name='anket'
          checked={filled} text1=' Заполнить анкету ' attempts='2' text2='попытки' onChange={handleChange}
        />
        <button className='share' onClick={toShare}>
          Поделиться
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
