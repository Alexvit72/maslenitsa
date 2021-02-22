import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Card from '../../components/Card';
import FormItem from '../../components/FormItem';
import logo from '../../img/logo.png';
import './Form.css';

const Form = props => {

  function clickHandle(event) {
    console.log('submit');
  }

  function focusField(event) {
    let errorProducts = document.getElementById('error-products');
    if (!event.target.closest('.stringOfProducts')) {
      document.querySelector('.select').classList.remove('visible');
    } else {
      event.currentTarget.children[2].classList.add('visible');
    }
    event.currentTarget.children[0].classList.add('focus');
    event.currentTarget.children[1].focus();
  }

  const form =<><FormItem className='FormItem' focusField={focusField} sendData={props.sendData} setActivePanel={props.setActivePanel} />
    <div className='form-footer'>
      Нажимая на кнопку “Готово” я даю согласие на <a href=''>условия конфиденциальности</a> и <a href=''>обработку своих данных</a>
    </div></>;

  return (
    <Panel id='form'>
      <div className={props.className}>
        <Card className='Card' title='Заполните анкету' img={logo} label='Готово' type='submit' form='user_anket' text={form}
        onClick={clickHandle} />
      </div>
    </Panel>
  );

}

export default Form;
