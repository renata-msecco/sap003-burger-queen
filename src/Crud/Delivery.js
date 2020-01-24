import firebase from '../components/Firebase/firebase';

const Delivery = {

    get: (callback) => {

        firebase.collection('delivery').get().then(function (results) {
            let mesas = []
            results.forEach(function (mesa) {
                mesas.push({
                    id: mesa.id,
                    ...mesa.data()
                })
            });
            callback(mesas)
        })

    },

    add: (mesa, callback) => {

        let delivery = { ...mesa }

        delivery.conclusionDate = new Date()

        delivery.status = 'Pronto'

        delete delivery.key
        delete delivery.id

        firebase
            .collection('delivery')
            .add(delivery)
            .then(callback)

    },

    del: (mesa, callback) => {
        firebase
            .collection('delivery')
            .doc(mesa.id)
            .delete()
            .then(callback)
    },

}

export default Delivery;