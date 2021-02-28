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
      clearInterval(props.timerId);

    } else if (event.target.name == 'subscribe') {
      bridge.subscribe(event => {
        if (!event.detail) {
          return;
        }
        console.log(event.detail);
        const { type, data } = event.detail;
        if (type === 'VKWebAppJoinGroupResult') {
          setSubscribed(data.result);
          props.increaseAttempts(3);
          props.fetchData()
        }
        if (type === 'VKWebAppJoinGroupFailed') {
          // Catching the error
          console.log(data.error_type, data.error_data);
        }
      });
      bridge.send("VKWebAppJoinGroup", { "group_id": 49256266 });
      bridge.send('VKWebAppAllowMessagesFromGroup',
        { 'group_id': 49256266 });

      /*} else if (event.currentTarget.name == 'repost') {
        /*bridge.subscribe(event => {
          if (!event.detail) {
            return;
          }
          console.log(event.detail);
          const { type, data } = event.detail;
          if (type === 'VKWebAppCallAPIMethodResult') {
            console.log(data);*/

      /*}
      if (type === 'VKWebAppCallAPIMethodFailed') {
        // Catching the error
        console.log(data.error_type, data.error_data);
      }
    });*/



      /*let token = await bridge.send("VKWebAppGetCommunityToken", {"app_id": 6909581, "group_id": 49256266, "scope": "wall"});*/

      bridge.send("VKWebAppCallAPIMethod", {
        "method": "wall.repost",
        "params": {
          "object": `wall-49256266_295672`,
          "v": "5.130",
          "access_token": "d8fbbf01fe3727d909c27b6edfd3eaa269c39143f1fe3e2b0008c60169482539280a0b72ff6e995fdf858"
        }
      });

      /*bridge.send('VKWebAppShowWallPostBox', { "message": "Hellow!", "attachments": "https://vk.com/dixyclub?w=wall-49256266_295693" });//"https://vk.com/app7763188" });*/

    }
  }

  function handleClick() {
    setReposted(true);
    props.increaseAttempts(2);
    props.fetchData();
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
          onChange={!subscribed && handleChange}
          disabled={subscribed}
        />
        <DropdownItem
          lassName='DropdownItem repost' name='repost'
          checked={reposted}
          text1={reposted ? 'Репост записи группы' : <a href='https://vk.com/dixyclub?w=wall-49256266_295693' target='_blank'>Репост записи группы</a>}
          attempts='2' text2='попытки'
          onChange={!reposted && handleChange} disabled={reposted}
          onClick={handleClick}
        />
        <DropdownItem className='DropdownItem anket' name='anket'
          checked={filled} text1=' Заполнить анкету ' attempts='2' text2='попытки' onChange={!filled && handleChange} />
      </div>
    </div>
  );
};

export default Dropdown;
