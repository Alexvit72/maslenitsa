import React, { useState, useEffect } from 'react';
import DropdownItem from './DropdownItem';

const CustomSelect = props => {

  const [fruits, setFruits] = useState(false);
  const [cheeses, setCheeses] = useState(false);
  const [beveredges, setBeveredges] = useState(false);
  const [milk, setMilk] = useState(false);
  const [pasta, setPasta] = useState(false);
  const [fish, setFish] = useState(false);
  const [other, setOther] = useState(false);

  const products = {'fruits': [fruits, setFruits, 'Свежие фрукты, овощи, зелень'], 'cheeses': [cheeses, setCheeses, 'Сыры, колбасы'], 'beveredges': [beveredges, setBeveredges, 'Напитки'], 'milk': [milk, setMilk, 'Молочные продукты'], 'pasta': [pasta, setPasta, 'Макароны, крупы, мука'], 'fish': [fish, setFish, 'Рыба, морепродукты'], 'other': [other, setOther, 'другие товары']};

  const [result, setResult] = useState([]);
  const [value, setValue] = useState('');

  useEffect(addProducts, [fruits, cheeses, beveredges, milk, pasta, fish, other]);

  function handleChecked(event) {
    let item = event.target.closest('.DropdownItem');
    let name = event.target.name;
    let func = products[name][1];
    let value = products[name][0];
    if (result.length < 3) {
      func((value) => !value);
    } else if (result.length == 3) {
      if (value) {
        func((value) => !value);
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

  function handleBlur() {
    
  }

  return (
    <>
      <input type='text' className={props.className} name={props.name} value={value} onChange={(event) => setValue(event.target.value)}
      onBlur={handleBlur} />
      <div className='select'>
        <DropdownItem className='DropdownItem' name='fruits' checked={fruits} onChange={(event) => handleChecked(event)} text1='Свежие фрукты, овощи, зелень' />
        <DropdownItem className='DropdownItem' name='cheeses' checked={cheeses} onChange={(event) => handleChecked(event)} text1='Сыры, колбасы' />
        <DropdownItem className='DropdownItem' name='beveredges' checked={beveredges} onChange={(event) => handleChecked(event)} text1='Напитки' />
        <DropdownItem className='DropdownItem' name='milk' checked={milk} onChange={(event) => handleChecked(event)} text1='Молочные продукты' />
        <DropdownItem className='DropdownItem' name='pasta' checked={pasta} onChange={(event) => handleChecked(event)} text1='Макароны, крупы, мука' />
        <DropdownItem className='DropdownItem' name='fish' checked={fish} onChange={(event) => handleChecked(event)} text1='Рыба, морепродукты' />
        <DropdownItem className='DropdownItem' name='other' checked={other} onChange={(event) => handleChecked(event)} text1='другие товары' />
      </div>
    </>
  );

};

export default CustomSelect;
