import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import downArrow from '../img/downArrow.svg';
import './FormItem.css';

const FormItem = props => {
  return (
      <Formik
        initialValues={{ firstName: '', phone: '', email: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required('Это поле обязательно'),
          phone: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Это поле обязательно'),
          email: Yup.string()
            .email('Введите действительный адрес')
            .required('Это поле обязательно'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={props.className}>
          <div className='field-wrapper'>
            <label className='place' htmlFor="firstName">Имя</label>
            <Field className='Field' name="firstName" type="text" />
            <ErrorMessage className='error' name="firstName" />
          </div>
          <div className='field-wrapper'>
            <label className='place' htmlFor="phone">Телефон</label>
            <Field className='Field' name="phone" type="tel" />
            <ErrorMessage className='error' name="phone" />
          </div>
          <div className='field-wrapper'>
            <label className='place' htmlFor="email">Email</label>
            <Field className='Field' name="email" type="email" />
            <ErrorMessage className='error' name="email" />
          </div>
          <div className='field-wrapper'>
            <label className='place products' htmlFor="favorite_products">Какие продукты чаще всего покупаете в Дикси (не более трёх) <img className='arrow' src={downArrow} /></label>
            <Field className='Field' name="favorite_products" type="text" />
            <ErrorMessage className='error' name="favorite_products" />
          </div>

          <Field className='Field select' name="favorite_products" as="select" multiple>
            <option value="Свежие фрукты, овощи, зелень">Свежие фрукты, овощи, зелень</option>
            <option value="Сыры, колбасы">Сыры, колбасы</option>
            <option value="Напитки">Напитки</option>
            <option value="Молочные продукты">Молочные продукты</option>
            <option value="Макароны, крупы, мука">Макароны, крупы, мука</option>
            <option value="Рыба, морепродукты">Рыба, морепродукты</option>
            <option value="другие товары">другие товары</option>
          </Field>

        </Form>
      </Formik>
  );
}

export default FormItem;
