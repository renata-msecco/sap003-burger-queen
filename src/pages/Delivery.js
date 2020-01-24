import React, { useState, useEffect } from 'react';
import crudDelivery from "../Crud/Delivery"
import Mesa from "../components/Mesa"

const Delivery = () => {

    const [mesas, setMesas] = useState([]);

    useEffect(() => {

        crudDelivery.get((mesas) => {
            setMesas(mesas)
        })

    }, [])

    return (

        <div className="container-fluid">
            <div className="mb-3"></div>
            <div className="row">
                {mesas.map(mesa => <Mesa mesa={mesa}></Mesa>)}
            </div>
        </div>

    )
}

export default Delivery;