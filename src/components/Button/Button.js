import React from 'react';
import './Button.css';

export const Button = (props) => {
    return props.className ?
        <a className={props.className} onClick={props.handleClick}>{props.text}</a> :
        <a onClick={props.handleClick}>{props.text}</a>;
};
