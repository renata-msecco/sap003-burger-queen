import firebase from '../components/Firebase/firebase';
import React from 'react';

const Client = {

    get: (callback) => {

        firebase.collection('client').get().then(function (results) {
            let mesas = []
            results.forEach(function (mesa) {
                let retorno = mesa.data()
                retorno.key = mesa
                mesas.push(retorno)
            });
            callback(mesas)
        })

    },

    add: (callback) => { },

    del: (callback) => { },

}

export default Client;