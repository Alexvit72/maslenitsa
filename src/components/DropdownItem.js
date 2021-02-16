import React from 'react';

const DropdownItem = props => {
  return (
    <div className={props.className}>
      <input type='checkbox' checked={props.checked} />
      <span>
        {props.text1}
        <a href={props.link}>{props.linkText}</a>
        {props.text2}
      </span>
      <span> +3 попытки</span>
    </div>
  );
};

export default DropdownItem;
