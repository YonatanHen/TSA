const express = require('express')
const cloudinary = require('cloudinary').v2
var FormData = require('form-data')
const fetch = require("node-fetch")
const router = new express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


router.get('/upload-image/:photoUri', async (req, res) => {
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

router.post('/delete-image', async (req, res) => {
    const imageUrl = req.body.imageUrl
    try {
        let public_id = imageUrl.split('/')
        public_id = public_id[public_id.length - 1].split('.')[0]
        cloudinary.uploader.destroy(public_id, (err, result) => {
            if (err || result.deleted === 'not_found') {
                return res.send({ message: 'Cannot delete image.' })
            }

            return res.send({ message: 'Image deleted successfully' })
        })
    } catch (err) { console.log(err) }
})

module.exports = router