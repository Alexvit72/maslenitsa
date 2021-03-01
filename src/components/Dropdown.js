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
    console.log(event)
    if (event.target.name == 'anket') {
      console.log('anket');
      props.setActivePanel('form');
      clearInterval(props.timerId);
    }
    if (event.target.name == 'subscribe') {
      bridge.subscribe(event => {
        if (!event.detail) {
          return;
        }
        const { type, data } = event.detail;
        if (type === 'VKWebAppJoinGroupResult') {
          setSubscribed(data.result);
          props.increaseAttempts(3);
          props.fetchData()
        }

      });
      bridge.send("VKWebAppJoinGroup", { "group_id": 49256266 });
      bridge.send('VKWebAppAllowMessagesFromGroup',
        { 'group_id': 49256266 });

    }
  /*  if (event.target.name == 'repost') {
      handleClick()
    }*/
  }

  function handleClick(e) {
    console.log('click');
    clearInterval(props.timerId);
    setReposted(true);
  }

  return (
    <div className={props.className}>
      <div className='DropdownItem-wrapper'>
        <DropdownItem
          className='DropdownItem subscribe'
          name='subscribe'
          checked={subscribed}
          text1=' Подписаться на группу'
          attempts='3'
          text2='попытки'
          disabled={subscribed}
          onChange={handleChange}
        />
        <DropdownItem
          className='DropdownItem repost' name='repost'
          checked={reposted}
          text1={!reposted ?
            <a href='https://vk.com/dixyclub?w=wall-49256266_295661' target='_blank'>Репост записи группы</a> :
            'Репост записи группы'
          }
          attempts='2' text2='попытки'
          disabled={reposted}
          onChange={handleChange}
          onClick={!reposted ? handleClick : undefined}
        />
        <DropdownItem
          className='DropdownItem anket'
          name='anket'
          checked={filled}
          text1=' Заполнить анкету'
          attempts='2'
          text2='попытки'
          //disabled={filled}
          onChange={handleChange} />
      </div>
    </div>
  );
};

export default Dropdown;
