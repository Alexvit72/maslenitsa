import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DropdownItem from './DropdownItem';
import downArrow from '../img/downArrow.svg';
import './FormItem.scss';

const FormItem = props => {

  const phoneRegExp = /^(8|\+?7)[\- ]?\(?\d{3}\)?[\- ]?[\d\- ]{7,10}$/;

  const [fruits, setFruits] = useState(false);
  const [cheeses, setCheeses] = useState(false);
  const [beveredges, setBeveredges] = useState(false);
  const [milk, setMilk] = useState(false);
  const [pasta, setPasta] = useState(false);
  const [fish, setFish] = useState(false);
  const [other, setOther] = useState(false);

  const [result, setResult] = useState([]);
  const [stringOfProducts, setStringOfProducts] = useState('');
  const [visited, setVisited] = useState(false);

  useEffect(addProducts, [fruits, cheeses, beveredges, milk, pasta, fish, other]);

  const products = { 'fruits': [fruits, setFruits, 'Свежие фрукты, овощи, зелень'], 'cheeses': [cheeses, setCheeses, 'Сыры, колбасы'], 'beveredges': [beveredges, setBeveredges, 'Напитки'], 'milk': [milk, setMilk, 'Молочные продукты'], 'pasta': [pasta, setPasta, 'Макароны, крупы, мука'], 'fish': [fish, setFish, 'Рыба, морепродукты'], 'other': [other, setOther, 'другие товары'] };

  function handleChecked(event) {
    let item = event.target.closest('.DropdownItem');
    let name = event.target.name;
    let func = products[name][1];
    let arg = products[name][0];
    if (result.length < 3) {
      func((arg) => !arg);
    } else if (result.length == 3) {
      if (arg) {
        func((arg) => !arg);
      }
    }
  }

  function addProducts() {
    let arr = [];
    for (let key in products) {
      let state = products[key][0];
      if (state) {
        arr.push(products[key][2]);
      }
    }
    setResult(arr);
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.stringOfProducts')) {
      if (document.querySelector('.select')) {
        document.querySelector('.select').classList.remove('visible');
      }
    }
  });

  const formik = useFormik({

    initialValues: { first_name: '', phone: '', email: '' },

    validationSchema: Yup.object({
      first_name: Yup.string()
        .required('Это поле обязательно'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Введите полный номер')
        .required('Это поле обязательно'),
      email: Yup.string()
        .email('Введите действительный адрес')
        .required('Это поле обязательно')
    }),

    onSubmit: (values) => {
      if (result.length == 0) {
        document.getElementById('error-products').classList.remove('hidden');
      } else {
        values.favorite_products = result;
        values.phone = values.phone.replace(/\D/g, '').slice(0, 11);
        delete values.stringOfProducts;
        props.sendData(values);
        props.setActivePanel('main');
      }
    }

  });

  return (
    <form id='user_anket' className={props.className} onSubmit={(event) => formik.handleSubmit(event)}>

      <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
        <label className='place' htmlFor="first_name">Имя</label>
        <input className='Field' name="first_name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
        {formik.touched.first_name && formik.errors.first_name ? <div className='error'>{formik.errors.first_name}</div> : null}
      </div>

      <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
        <label className='place' htmlFor="phone">Телефон</label>
        <input className='Field' name="phone" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
        {formik.touched.phone && formik.errors.phone ? <div className='error'>{formik.errors.phone}</div> : null}
        {formik.touched.phone && formik.errors.normPhone ? <div className='error'>{formik.errors.normPhone}</div> : null}
      </div>

      <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
        <label className='place' htmlFor="email">Email</label>
        <input className='Field' name="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
        {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
      </div>

      <div className='field-wrapper stringOfProducts' onClick={(event) => props.focusField(event)}>
        <label className='place products' htmlFor="stringOfProducts">Какие продукты чаще всего покупаете в Дикси (не более трёх)</label>
        <input className='Field' name="stringOfProducts" onChange={(event => setStringOfProducts(event.target.value))} onBlur={() => setVisited(true)} value={result.join('; ')} />
        <div className='select'>
          <DropdownItem className='DropdownItem' name='fruits' checked={fruits} onChange={(event) => handleChecked(event)} text1='Свежие фрукты, овощи, зелень' />
          <DropdownItem className='DropdownItem' name='cheeses' checked={cheeses} onChange={(event) => handleChecked(event)} text1='Сыры, колбасы' />
          <DropdownItem className='DropdownItem' name='beveredges' checked={beveredges} onChange={(event) => handleChecked(event)} text1='Напитки' />
          <DropdownItem className='DropdownItem' name='milk' checked={milk} onChange={(event) => handleChecked(event)} text1='Молочные продукты' />
          <DropdownItem className='DropdownItem' name='pasta' checked={pasta} onChange={(event) => handleChecked(event)} text1='Макароны, крупы, мука' />
          <DropdownItem className='DropdownItem' name='fish' checked={fish} onChange={(event) => handleChecked(event)} text1='Рыба, морепродукты' />
          <DropdownItem className='DropdownItem' name='other' checked={other} onChange={(event) => handleChecked(event)} text1='другие товары' />
        </div>
        <img className='arrow' src={downArrow} />
        <div id='error-products' className={'error' + (result.length == 0 && visited ? '' : ' hidden')}>{'Это поле обязательно'}</div>
      </div>
    </form>
  );
}

export default FormItem;
