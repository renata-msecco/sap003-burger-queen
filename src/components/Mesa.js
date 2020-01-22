import React, { useEffect } from 'react';
import Delivery from '../Crud/Delivery';

function msToTime(duration) {
    duration = duration * 1000
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;

    return hours + "h" + minutes + "min";
}

const Mesa = (args) => {
    let concluido = false;

    const definirComoPronto = () => {
        Delivery.add(args.mesa, () => { concluido = true })
    }

    let date = ''
    if (args.mesa.conclusionDate) {
        let diferenca = args.mesa.conclusionDate.seconds - args.mesa.date.seconds
        date = msToTime(diferenca)
    }
    else {
        const minutes = (new Date(args.mesa.date.seconds * 1000).getMinutes() < 10 ? '0' : '') + new Date(args.mesa.date.seconds * 1000).getMinutes();
        date = args.mesa.date ? new Date(args.mesa.date.seconds * 1000).getHours() + ":" + minutes : '';
    }

    if (!concluido) return (
        <div className="col-6 mb-5">
            <div className="card bg-warning">
                <div className="card-body">
                    <h4 className="card-title">
                        {args.mesa.client}
                        <div className="badge badge-info float-right">{date}</div>
                        <div className="badge badge-dark float-right mr-1"> Mesa {args.mesa.table}</div>
                    </h4>
                    <div className="clearfix"></div>
                    <div className="card-text">
                        {args.mesa.productSelect.map(item => {
                            return (
                                <div className="form-control mb-2">
                                    {item.name}
                                    {item.selectedExtra ? (<div className="ml-2 badge badge-success">{item.selectedExtra.name}</div>) : false}
                                    {item.selectedOption ? (<div className="ml-2 badge badge-success">{item.selectedOption}</div>) : false}
                                </div>
                            )
                        })}

                        {!args.mesa.conclusionDate ? <><hr /><button className="btn btn-dark" onClick={definirComoPronto}>Pronto</button></> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mesa;