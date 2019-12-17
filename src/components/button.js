import React from 'react';

const button = (props) => {
    return (
        <button onClick={ props.handleClick} className = 'button'>{props.title}</button>
    )
}
export default button;