import React, { useState } from 'react';
import DropdownItem from './DropdownItem'

const Dropdown = props => {

  const [subscribed, setSubscribed] = useState(false);
  const [commented, setCommented] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <div className={props.className}>
      <DropdownItem className='DropdownItem_subscribe'
        checked={subscribed} text1=' Подписаться на '
        link={''} linkText='группу' attempts='3'
      />
      <DropdownItem className='DropdownItem_comment'
        checked={commented} text1=' Комментарий к '
        link={''} linkText='записи' attempts='1'
      />
      <DropdownItem className='DropdownItem_repost'
        checked={reposted} text1=' Репост ' text2=' группы'
        link={''} linkText='записи' attempts='2'
      />
      <DropdownItem className='DropdownItem_subscribe-send'
        checked={reposted} text1=' Подписка на рассылку ' text2=''
        link={''} linkText='' attempts='2'
      />
      <DropdownItem className='DropdownItem_anket'
        checked={reposted} text1=' Заполнить анкету ' text2=''
        link={''} linkText='' attempts='2'
      />
      <DropdownItem className='DropdownItem_subscribe-send-vk'
        checked={reposted} text1=' Подписка на рассылку Дикси ВК ' text2='' link={''} linkText='' attempts='1'
      />
    </div>
  );
};

export default Dropdown;
