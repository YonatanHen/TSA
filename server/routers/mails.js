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
        from: `${name} ${addressed}`,

        // Comma separated list of recipients
        to: addressee,

        // Subject of the message
        subject: `New message from ${name} - TSA`,

        // plaintext body
        text: content
    };

    console.log('Sending Mail');
    transport.sendMail(message, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        // if you don't want to use this transport object anymore, uncomment following line
        transport.close(); // close the connection pool
    });

    res.send()
})

module.exports = router
