import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CustomSelect from './CustomSelect';
import downArrow from '../img/downArrow.svg';
import './FormItem.css';

const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const MyCustomSelect = (props) => <CustomSelect {...props} />;

const FormItem = props => {
  return (
      <Formik
        initialValues={{ firstName: '', phone: '', email: '', favorite_products: []}}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required('Это поле обязательно'),
          phone: Yup.string()
            .matches(phoneRegExp, 'Введите действительный номер телефона')
            .required('Это поле обязательно'),
          email: Yup.string()
            .email('Введите действительный адрес')
            .required('Это поле обязательно'),
          favorite_products: Yup.array()
          .required('Это поле обязательно')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            props.setData(values);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form id='user_anket' className={props.className}>

          <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
            <label className='place' htmlFor="firstName">Имя</label>
            <Field className='Field' name="firstName" type="text" />
            <span className='error'><ErrorMessage name="firstName" /></span>
          </div>
          <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
            <label className='place' htmlFor="phone">Телефон</label>
            <Field className='Field' name="phone" type="tel" />
            <span className='error'><ErrorMessage name="phone" /></span>
          </div>
          <div className='field-wrapper' onClick={(event) => props.focusField(event)}>
            <label className='place' htmlFor="email">Email</label>
            <Field className='Field' name="email" type="email" />
            <span className='error'><ErrorMessage name="email" /></span>
          </div>
          <div className='field-wrapper favorite_products' onClick={(event) => props.focusField(event)}>
            <label className='place products' htmlFor="favorite_products">Какие продукты чаще всего покупаете в Дикси (не более трёх)</label>
            <Field className='Field' name="favorite_products" as={CustomSelect} />
            <img className='arrow' src={downArrow} />
            <span className='error'><ErrorMessage name="favorite_products" /></span>
          </div>
        </Form>
      </Formik>
  );
}

export default FormItem;
