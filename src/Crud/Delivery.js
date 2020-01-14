import firebase from '../components/Firebase/firebase';

const Delivery = {

    get: (callback) => {

        firebase.collection('delivery').get().then(function (results) {
            let mesas = []
            results.forEach(function (mesa) {
                mesas.push(mesa.data())
            });
            callback(mesas)
        })

    },

    add: (mesa, callback) => {

        mesa.conclusionDate = new Date()

        firebase
            .collection('delivery')
            .add(mesa)
            .then(() => { })

    },

    del: (callback) => { },

}

export default Delivery;