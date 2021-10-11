import envs from '../../config/env'

const { FIREBASE_API_KEY, GEOPIFY_API, CLOUDINARY_NAME } = envs

const SAVE_IMAGE = 'SAVE_IMAGE'
const UPDATE_USER_ON_SIGNUP = 'UPDATE_USER_ON_SIGNUP'


export const addDataOnSignUp = (bio, image, courses = undefined, phone, location) => {
    return async (dispatch, getState) => {
        if (!location) {
            throw new Error('You must pick a location!')
        }
        const token = getState().auth.token
        const uid = getState().auth.userId

        console.log(location)

        let city = undefined
        let country = undefined

        await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&format=json&apiKey=${GEOPIFY_API}`
        ).then(response => response.json())
            .then(result => {
                city = result.results[0].city
                country = result.results[0].country
            })

        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bio,
                    courses,
                    phone,
                    locationCords: location,
                    city,
                    country
                })
            }
        )

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({
            type: UPDATE_USER_ON_SIGNUP,
            uid: uid,
            userData: {
                bio,
                courses,
                phone,
                locationCords: location,
                city,
                country
            }
        })
    }
}


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
