import React from 'react';
import Headline from './Headline';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Button from './Button';
// import './Card.css';
import './card.scss'

const Card = props => {
  return (
    <div className='card-wrapper'>
      <div className={props.className}>
        {props.close ? <div className='close' onClick={props.onClose}></div> : ''}
        <img className='prezent' src={props.img} />
        <Headline
          className='Headline'
          text={props.title}
        />
        <div className='text'>
          {props.text}
          {props.inner && props.inner}
        </div>
        <div className='button-wrapper'>
          <Button
            className={props.disabled ? 'Button disabled' : 'Button'}
            label={props.label}
            onClick={props.onClick}
            form={props.form}
            type={props.type}
            //play={props.play}
            disabled={props.disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
