const api = require('./app');
const functions = require('firebase-functions');

exports.api = functions.https.onRequest(api);