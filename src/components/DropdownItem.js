import React from 'react';

const DropdownItem = props => {
  return (
    <div className={props.className}>
      <input type='checkbox' checked={props.checked} />
      <span>
        {props.text1}
        {props.link != '' ? <a href={props.link}>{props.linkText}</a> : ''}
        {props.text2}
      </span>
      <span> + {props.attempts} попытки</span>
    </div>
  );
};

export default DropdownItem;
