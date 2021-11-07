import axios from 'axios'

export const DELETE_IMAGE = 'DELETE_IMAGE'
export const ADD_IMAGE = 'ADD_IMAGE'

export const deleteProfilePicture = () => {
    return async (dispatch, getState) => {
        const user = getState().data

        axios.post(`/delete-image/`, {
            imageUrl: user.imageUrl
        })
        .then(res => console.log(res.data.message))

        dispatch({
            type: DELETE_IMAGE,
            
        })
    }
