import envs from '../../config/env'

const { FIREBASE_API_KEY, GEOPIFY_API } = envs

const UPDATE_USER_ON_SIGNUP = 'UPDATE_USER_ON_SIGNUP'

import { uploadImage } from '../../utilities/uploadImage'


export const addDataOnSignUp = (bio, image, courses = undefined, phone, location) => {
    return async (dispatch, getState) => {
        if (!location) {
            throw new Error('You must pick a location!')
        }
        const token = getState().auth.token
        const uid = getState().auth.userId

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

        if (image) {
            console.log(image)
            uploadImage(image)
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
                country,
                image
            }
        })
    }
}




