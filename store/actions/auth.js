import envs from '../../config/env'

const {FIREBASE_API_KEY} = envs

export const SIGNUP = 'SIGNUP'

export const signup = (email, password, fname, lname, institute) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email,
               password,
               fname,
               lnmae,
               institute,
               returnSecureToken: true
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        const resData = await response.json()

        dispatch({type: SIGNUP})
    }
}