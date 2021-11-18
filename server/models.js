const admin = require('firebase-admin')

const serviceAccount = require('./students-scheduler-firebase-adminsdk-h2oq1-667bcb1daf.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app"
});

module.exports.admin = admin