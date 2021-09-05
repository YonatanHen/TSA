import envs from '../../config/env'

const { FIREBASE_API_KEY } = envs

export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'

export const signup = (email, password, role, fname, lname, institute) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        const resData = await response.json()
        console.log(resData)

        if (!response.ok) {
            console.log(resData.error)
            throw new Error('Something went wrong')
        }
        writeUserData({ email: email, uid: resData.localId, firstName: fname, lastName: lname, institute: institute, role: role })

        dispatch({ type: SIGNUP, userId: resData.localId, token: resData.idToken })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        const resData = await response.json()

        if (!response.ok) {
            console.log(resData.error)
            throw new Error('Something went wrong')
        }

        dispatch({ type: SIGNIN, userId: resData.localId, token: resData.idToken })
    }
}


const writeUserData = async (user) => {
    const response = await fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const resData = await response.json()

    if (!response.ok) {
        console.log(resData.error)
        throw new Error('Something went wrong')
    }

    return
}