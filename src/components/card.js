import React from 'react';
import '../components/card.css';

const Card = (props) => {
    return (
        <a onClick={ props.onClick} className = 'Card'>{props.children}</a>
    )
}
export default Card;