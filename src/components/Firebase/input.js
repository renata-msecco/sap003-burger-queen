import React from 'react';

const input = (props) => {
    return (
        <button placeholder={ props.placeholder} value={props.state}id={props.id} onChange= {props.handleChange} className= 'input'></input>
    )
}
export default input;