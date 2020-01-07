import React from 'react';

const Button = (props) => {
    return (
        <button value ={ props.state} id={props.id} onClick= {props.handleClick} className = {props.className}>
         {props.text}</button>
        );
}
export default Button;