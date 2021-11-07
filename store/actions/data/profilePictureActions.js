import axios from 'axios'

import imageUploader from '../../../utilities/cloudinary/uploadImage'

export const DELETE_IMAGE = 'DELETE_IMAGE'
export const ADD_IMAGE = 'ADD_IMAGE'

export const addProfilePicture = () => {
    return async dispatch => {
        const imageUrl = await imageUploader(image)

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
            .then(res => { return res.data.message })
            .catch(err => { throw new Error('An Error occured!', err) })
    }
}
