const express = require('express')
const mail = require("nodemailer").mail
const router = new express.Router()


router.post('/send-email', async (req, res) => {
    const { addressed, addressee, name, content } = req.body
    console.log('dsdsd')
    console.log(addressed, addressee, name, content)

    await mail({
        from: `${addressed}`, // sender address
        to: `${addressee}`, // list of receivers
        subject: `Message from ${name}`, // Subject line
        text: content, // plaintext body
    });

    res.send()
})

module.exports = router
