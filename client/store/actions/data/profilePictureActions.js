import axios from 'axios'

import { SERVER_URL } from '@env'

import imageUploader from '../../../utilities/cloudinary/uploadImage'

export const DELETE_IMAGE = 'DELETE_IMAGE'
export const ADD_IMAGE = 'ADD_IMAGE'


export const addProfilePicture = (image) => {
    return async (dispatch, getState) => {
        const user = getState().data
        const imageUrl = await imageUploader(image)

        fetch(`${DATABASE_URL}/users/${user.role}s/${user.uid}.json?auth=${user.token}`,
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

        await axios.post(`${SERVER_URL}/delete-image/`, {
            imageUrl: user.imageUrl
        })
            .then(res => dispatch({
                type: DELETE_IMAGE
            }))
            .then(
                fetch(`${DATABASE_URL}/users/${user.role}s/${user.uid}/imageUrl.json?auth=${user.token}`,
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
