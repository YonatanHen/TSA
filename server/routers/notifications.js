const express = require('express')
const admin = require('../models').admin
const router = new express.Router()

router.get('/firebase/notification', (req, res) => {
    const registrationToken = "ExponentPushToken[kFVlYhGbmwbIA4XZ5PqiSK]"
    const message = {
        notification: {
            title: 'enter_subject_of_notification_here',
            body: 'enter_message_here'
        }
    }
    const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
}

admin.messaging().sendToDevice(registrationToken, message, options)
    .then(response => {

        res.status(200).send("Notification sent successfully")

    })
    .catch(error => {
        console.log(error);
    });

})

module.exports = router
