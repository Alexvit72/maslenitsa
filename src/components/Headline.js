import React from 'react';
import './Headline.css';

const Headline = props => (
  <h2 className={props.className}>
    {props.text}
  </h2>
);

export default Headline;
