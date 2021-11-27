import axios from 'axios'

import { IP_ADDRESS } from '@env'

import imageUploader from '../../../utilities/cloudinary/uploadImage'

export const DELETE_IMAGE = 'DELETE_IMAGE'
export const ADD_IMAGE = 'ADD_IMAGE'


export const addProfilePicture = (image) => {
    return async (dispatch, getState) => {
        const user = getState().data
        const imageUrl = await imageUploader(image)

        fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json?auth=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl: imageUrl
                })
            })

        await dispatch({
            type: ADD_IMAGE,
            imageUrl: imageUrl
        })
    }
}

export const deleteProfilePicture = () => {
    return async (dispatch, getState) => {
        const user = getState().data

        await axios.post(`http://${IP_ADDRESS}:8000/delete-image/`, {
            imageUrl: user.imageUrl
        })
            .then(res => dispatch({
                type: DELETE_IMAGE
            }))
            .then(
                fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}/imageUrl.json?auth=${user.token}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }))
            .catch(err => {
                throw new Error('An Error occured!', err)
            })
    }
}
