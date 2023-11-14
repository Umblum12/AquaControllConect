const { Router } = require('express');
const Records = Router();

const admin = require('firebase-admin');

const db = admin.firestore();


//Peticion Para crear historial
Records.post('/api/historiales', async (req, res) => {
    try {
        await db.collection('historiales')
            .doc('/' + req.body.id + '/')
            .create({ name: req.body.name })
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Peticion Para obtener un historial por id
Records.get('/api/historiales/:historial_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('historiales')
                .doc(req.params.historial_id);
            const item = await doc.get();
            const response = item.data();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Peticion Para obtener todos los historiales
Records.get('/api/historiales', async (req, res) => {
    try {
        const query = db.collection('historiales');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }))
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json();
    }
});

//Peticion Para eliminar un historial por id
Records.delete('/api/historiales/:historial_id', async (req, res) => {
    try {
        const document = db.collection('historiales')
        .doc(req.params.historial_id);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//Peticion Para actualizar un historial por id
Records.put('/api/historiales/:historial_id', async (req, res) => {
    try {
        const document = db.collection('historiales')
        .doc(req.params.historial_id);
        await document.update({
            name: req.body.name
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});


module.exports = Records;