const { Router } = require('express');
const router = Router();

const admin = require('firebase-admin');

const db = admin.firestore();

//Peticion Para crear usuario
router.post('/api/usuarios', async (req, res) => {
    try {
        await db.collection('usuarios')
            .doc('/' + req.body.id + '/')
            .create({ name: req.body.name })
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


//Peticion Para obtener un usuario por id
router.get('/api/usuarios/:usuario_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('usuarios')
                .doc(req.params.usuario_id);
            const item = await doc.get();
            const response = item.data();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Peticion Para obtener todos los usuarios
router.get('/api/usuarios', async (req, res) => {
    try {
        const query = db.collection('usuarios');
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

//Peticion Para eliminar un usuario por id
router.delete('/api/usuarios/:usuario_id', async (req, res) => {
    try {
        const document = db.collection('usuarios').doc(req.params.usuario_id);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//Peticion Para actualizar un usuario por id
router.put('/api/usuarios/:usuario_id', async (req, res) => {
    try {
        const document = db.collection('usuarios').doc(req.params.usuario_id);
        await document.update({
            name: req.body.name
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router;