import firebase from '../components/Firebase/firebase';

const Client = {

    get: (callback) => {

        firebase.collection('client').get().then(function (results) {
            let mesas = []
            results.forEach(function (mesa) {
                let retorno = mesa.data()
                retorno.id = mesa.id
                mesas.push(retorno)
            });
            callback(mesas)
        })

    },

    del: (mesa, callback) => {
        firebase.collection('client').doc(mesa.id).delete().then((retorno) => {
            if (callback) callback()
        })
    },

}

export default Client;