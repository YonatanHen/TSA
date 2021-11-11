const express = require('express')
const cors = require('cors')
var FormData = require('form-data');
const cloudinary = require('cloudinary').v2
const fetch = require("node-fetch");
const envs = require('dotenv').config({ path: '../.env' }).parsed
const mail = require("nodemailer").mail;



cloudinary.config({
    cloud_name: envs.CLOUDINARY_NAME,
    api_key: envs.CLOUDINARY_API_KEY,
    api_secret: envs.CLOUDINARY_API_SECRET
});

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is listen to ${port}`)
})

app.get('/login', async (req, res) => {
    console.log('logiin')
    res.send("your'e logged in")
})

app.get('/upload-image/:photoUri', async (req, res) => {
    const { photoUri } = req.params
    let url
    var data = new FormData();
    data.append('upload_preset', 'MyUploadPreset');
    data.append('file', `data:image/jpg;base64,${photoUri.base64}`);
    data.append('cloud_name', 'tutor-students-app');

    await fetch(`https://api.cloudinary.com/v1_1/tutor-students-app/image/upload`, {
        method: "POST",
        body: data
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.public_id)
            url = res.secure_url
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({ error: "An Error Occured While Uploading the Image!" })
        })

    res.send({ url: url })
})

app.post('/delete-image', async (req, res) => {
    const imageUrl = req.body.imageUrl
    try {

        let public_id = imageUrl.split('/')
        public_id = public_id[public_id.length - 1].split('.')[0]
        cloudinary.uploader.destroy(public_id, (err, result) => {
            if (err || result.deleted === 'not_found') {
                throw new Error('An error occured!')
            }

            return res.send({ message: 'Image deleted successfully' })
        })
    } catch (err) { console.log(err) }
})

app.post('/send-email', async (req, res) => {
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

app.get('/*', async (Req, res) => {
    res.send('TSA server')
})