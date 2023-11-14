const functions = require("firebase-functions");
const express = require('express');
const admin = require('firebase-admin');

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('./Permissions.json'),
    database: "https://consumodeaguapi-default-rtdb.firebaseio.com"
});

app.use(require('./routes/Users.routes'));
app.use(require('./routes/Records.routes'));
app.use(require('./routes/Waterflows.route'));
app.use(require('./routes/Valves.routes'));

exports.app = functions.https.onRequest(app);