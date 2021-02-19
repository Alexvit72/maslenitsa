import React from 'react';
import Headline from './Headline';
import Button from './Button';
import './Card.css';

const Card = props => {
  return (
    <div className={props.className}>
      {props.title == 'Победа!' ? <div className='close' onClick={props.onClick}>X</div> : ''}
      <img className="prezent" src={props.img} alt="prezent"/>
      <Headline
        className='Headline'
        text={props.title}
      />
      <div className='text'>{props.text}</div>
      <div className='button-wrapper'>
        <Button
          className='Button'
          label={props.label}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

export default Card;
