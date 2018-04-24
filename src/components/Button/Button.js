import React from 'react';
import './Button.css';

export class Button extends React.Component {
    render() {
        return this.props.className ?
        <a className={this.props.className} onClick={this.props.handleClick}>{this.props.text}</a> :
        <a onClick={this.props.handleClick}>{this.props.text}</a>;
    }
}