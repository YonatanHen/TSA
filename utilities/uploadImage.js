import { CLOUDINARY_NAME } from '../config/env'

export const uploadImage = (photoUri) => {
  var data = new FormData();
  data.append('upload_preset', 'MyUploadPreset');
    data.append('file', `data:image/jpg;base64,${photoUri.base64}`);
    data.append('cloud_name', 'tutor-students-app');
  // let data = {
  //   file: `data:image/jpg;base64,${photoUri}`,
  //   upload_preset: 'MyUploadPreset',
  // }

  fetch(`https://api.cloudinary.com/v1_1/tutor-students-app/image/upload`, {
    // headers: {
    //   'content-type': 'application/json'
    // },
    method: "POST",
    body: data
  }).then(res => res.json())
    .then(result => console.log(result))
    .catch(err => {
      console.log(err)
      // throw new Error("An Error Occured While Uploading the Image!")
    })
}

