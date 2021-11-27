export default async (photoUri) => {
  let url
  var data = new FormData();
  data.append('upload_preset', 'MyUploadPreset');
  data.append('file', `data:image/jpg;base64,${photoUri.base64}`);
  data.append('cloud_name', 'tutor-students-app');

  await fetch(`https://api.cloudinary.com/v1_1/tutor-students-app/image/upload`, {
    method: "POST",
    body: data
  }).then(res => res.json())
    .then(res => {
      url = res.secure_url
    })
    .catch(err => {
      console.log(err)
      throw new Error("An Error Occured While Uploading the Image!")
    })
  return url
}

