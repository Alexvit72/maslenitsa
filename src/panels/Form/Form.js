import React, { useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import FormItem from '../../components/FormItem';
import logo from '../../img/logo.png';
import './Form.css';

const Form = props => {

  const [data, setData] = useState(null);

  function clickHandler() {
    console.log(data);
  }

  function focusField(event) {
    if (!event.currentTarget.classList.contains('favorite_products') && !event.target.closest('.favorite_products')) {
      document.querySelector('.select').classList.remove('visible');
    } else {
      event.currentTarget.children[2].classList.add('visible');
    }
    event.currentTarget.children[0].classList.add('focus');
    event.currentTarget.children[1].focus();
  }

  const form =<><FormItem className='FormItem' focusField={focusField} setData={setData} />
    <div className='form-footer'>
      Нажимая на кнопку “Готово” я даю согласие на <a href=''>условия конфиденциальности</a> и <a href=''>обработку своих данных</a>
    </div></>;

  return (
    <Panel id='form'>
      <div className={props.className}>
        <Card className='Card' title='Заполните анкету' img={logo} label='Готово' setData={setData} type='submit' onClick={clickHandler} form='user_anket' text={form} />
      </div>
    </Panel>
  );

}

export default Form;
