const express = require('express')
const nodemailer = require("nodemailer")
const router = new express.Router()

router.post('/send-email', async (req, res) => {
    const { addressed, addressee, name, content } = req.body
    console.log(req.body)
    // Create a SMTP transport object
    var transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    console.log('SMTP Configured');

    // Message object
    var message = {

        // sender info
        from: `"${name !== 'null null' ? name : 'User that messed with troubles'}" <${addressed}>`,

        // Comma separated list of recipients
        to: addressee,

        // Subject of the message
        subject: name !== 'null null' ? `New message from ${name} - TSA` : 'User that messed with troubles',

        // plaintext body
        text: content + `\nPlease respond to ${addressed}.`
    };

    console.log('Sending Mail');
    transport.sendMail(message, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        transport.close(); // close the connection pool
    });

    res.send()
})

module.exports = router
