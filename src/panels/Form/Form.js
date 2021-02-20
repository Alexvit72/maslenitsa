import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import FormItem from '../../components/FormItem';
import logo from '../../img/logo.png';
import './Form.css';

const Form = props => {

  function clickHandler() {

  }

  return (
    <Panel id='form'>
      <div className={props.className}>
        <Card className='Card' title='Заполните анкету' img={logo} label='Готово' onClick={clickHandler} text={<FormItem className='FormItem' />} />
        <p className='form-footer'>Нажимая на кнопку “Готово” я даю согласие на <a href=''>условия конфиденциальности</a> и <a href=''>обработку своих данных</a></p>
      </div>
    </Panel>
  );

}

export default Form;
