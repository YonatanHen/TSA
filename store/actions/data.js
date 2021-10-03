import envs from '../../config/env'

const { FIREBASE_API_KEY } = envs

const SAVE_IMAGE = 'SAVE_IMAGE'
const UPDATE_USER_ON_SIGNUP = 'UPDATE_USER_ON_SIGNUP'


export const addDataOnSignUp = (bio, image, courses, phone) => { 
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const uid = getState().auth.userId
        
        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application.json'
                },
                body: JSON.stringify({
                    bio,
                    courses,
                    phone,
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
            }
        })
    }  
}