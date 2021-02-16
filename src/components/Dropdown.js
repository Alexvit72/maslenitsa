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
        link={''} linkText='группу'
      />
      <DropdownItem className='DropdownItem_comment'
        checked={commented} text1=' Комментарий к '
        link={''} linkText='записи'
      />
      <DropdownItem className='DropdownItem_repost'
        checked={reposted} text1=' Репост ' text2=' группы'
        link={''} linkText='записи'
      />
    </div>
  );
};

export default Dropdown;
