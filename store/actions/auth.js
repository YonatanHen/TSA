import envs from '../../config/env'

const {FIREBASE_API_KEY} = envs

export const SIGNUP = 'SIGNUP'

export const signup = (email, password, fname, lname, institute) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: email,
               password: password,
               fname: fname,
               lname: lname,
               institute: institute,
               returnSecureToken: true
            })
        })

        const resData = await response.json()

        if (!response.ok) {
            console.log(resData.error)
            throw new Error('Something went wrong')
        }

        

        dispatch({type: SIGNUP, userId: resData.localId , token: resData.idToken})
    }
}