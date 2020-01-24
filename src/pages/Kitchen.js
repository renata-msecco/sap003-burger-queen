import React, { useState, useEffect } from 'react';
import Client from "../Crud/Client"
import Mesa from "../components/Mesa"

const Kitchen = () => {

    const [mesas, setMesas] = useState([]);

    useEffect(() => {

        Client.get((mesas) => {
            setMesas(mesas)
        })

    }, [])

    return (

        <div className="container-fluid">
            <div className="mb-3"></div>
            <div className="row">
                {
                    mesas.map(mesa => {
                        return <Mesa mesa={mesa}></Mesa>
                    })
                }
            </div>
        </div>
    )
}
export default Kitchen;