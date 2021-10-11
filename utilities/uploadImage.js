import {CLOUDINARY_NAME } from '@envs'

export const uploadImage = (photo) => {
    console.log('IMAGE')
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', CLOUDINARY_NAME)
    data.append("cloud_name", CLOUDINARY_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setPhoto(data.secure_url)
      }).catch(err => {
          console.log(err)
        throw new Error("An Error Occured While Uploading the Image!")
      })
  }

