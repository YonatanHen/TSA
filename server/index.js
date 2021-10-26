const express = require('express')
const cors = require('cors')
var FormData = require('form-data');
const fetch = require("node-fetch");

const app = express()

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

app.get('/*', async (Req, res) => {
    res.send('TSA server')
})