import React from 'react';

const MenuCard = (props) => {
    return (
        <>
            {props.menuItens.map((menu, i) =>
                <div className="col-4 mb-4" key={i} onClick={() => props.handleClick(menu)}>
                    <div className="card bg-warning">
                        <div className="card-body">
                            <p className="card-text">{menu.name}</p>
                            <p className="card-text">R$ {menu.price},00</p>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}
export default MenuCard;
