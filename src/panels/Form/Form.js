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

  function close() {
    props.setActivePanel('main');
  }

  function focusField(event) {
    if (event.target.closest('.stringOfProducts')) {
      event.currentTarget.children[2].classList.add('visible');
    }
    event.currentTarget.children[0].classList.add('focus');
    event.currentTarget.children[1].focus();
  }

  const form = <FormItem className='FormItem' focusField={focusField} sendData={props.sendData} setActivePanel={props.setActivePanel} />;

  return (
    <Panel id='form'>
      <div className={props.className}>
        <Card className='Card' title='Заполни анкету' img={logo} label='Готово' type='submit' form='user_anket' text={form}
          onClick={clickHandle} close={true} onClose={close} />
        <div className='form-footer'>
          Нажимая на кнопку "Готово", я выражаю согласие с <a href='https://dixy.ru/politika-obrabotki-i-zashity.pdf' target="blank">условиями конфиденциальности и обработкой моих данных</a>
        </div>
      </div>
    </Panel>
  );

}

export default Form;
