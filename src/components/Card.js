import React from 'react';
//import '../components/card.css';

const MenuCard = (props) => {
    return (
        <ol>
           {props.menuItens.map((menu)=>
            <button key = {menu.id} onClick = {()=> props.handleClick(menu)}className= {props.className}>
                <div >
                    <br></br>
                    {menu.name}
                <h4 className = "price">R$ {menu.price},00</h4>    
                </div>

            </button>
            )} 
        </ol>
    )
}
export default MenuCard;

