import envs from '../../config/env'


import findAdmin from '../../utilities/findAdmin'
import { readAllUsers } from '../actions/representation'

const { FIREBASE_API_KEY } = envs

export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'
export const LOGOUT = 'LOGOUT'
export const EDIT_USER = 'EDIT_USER'
export const UPDATE_USER_ON_SIGNUP = 'UPDATE_USER_ON_SIGNUP'

import imageUploader from '../../utilities/cloudinary/uploadImage'
import setCityAndCountryByLocation from '../../utilities/setCityAndCountryByLocation'

export const signup = (email, password, role, fname, lname, institute) => {
    return async dispatch => {
        await findAdmin(institute, role)

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

        if (!response.ok) {
            if (resData.error.message === 'EMAIL_EXISTS') {
                throw new Error('Email already exists')
            }
            else {
                throw new Error('Something went wrong')
            }

        }

        writeUserData({ email: email, uid: resData.localId, firstName: fname, lastName: lname, institute: institute, role: role })

        await dispatch({
            type: SIGNUP,
            uid: resData.localId,
            token: resData.idToken,
            role,
            email: email,
            institute: institute,
            firstName: fname,
            lastName: lname,
        })
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
            if (resData.error.message === 'EMAIL_NOT_FOUND') {
                throw new Error('User is not exists in our database')
            }
            else {
                throw new Error('Something went wrong')
            }
        }

        const user = await readUserData(resData.localId)

        dispatch({
            type: SIGNIN,
            token: resData.idToken,
            ...user
        })
    }
}

export const logout = () => {
    return { type: LOGOUT }
}


const writeUserData = async (user) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json`,
        {
            method: 'PATCH',
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

const readUserData = async (uid) => {
    const response = await fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

    const resData = await response.json()

    const users = await Object.assign({}, resData.admins, resData.tutors, resData.students)

    if (!response.ok) {
        console.log(resData.error)
        throw new Error('Something went wrong')
    }

    const user = users[uid]

    return user
}

export const addDataOnSignUp = (role, bio, image, courses = undefined, phone, location) => {
    return async (dispatch, getState) => {
        if (!location) {
            throw new Error('You must pick a location!')
        }
        if (!phone || phone === '') {
            throw new Error('You must enter a phone number!')
        }
        const token = getState().userData.token
        const uid = getState().userData.uid
        
        let city, country, imageUrl = undefined

        if(location){
            let locationValues = await setCityAndCountryByLocation(location)
            city = locationValues.city
            country = locationValues.country
        }
        console.log(city, country)


        if (image) {
            imageUrl = await imageUploader(image)
        }

        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${role}s/${uid}.json?auth=${token}`,
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
                    country,
                    imageUrl
                })
            }
        )

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        //Check if this line did not failed.
        await dispatch(readAllUsers())

        dispatch({
            type: UPDATE_USER_ON_SIGNUP,
            uid: uid,
            bio,
            courses,
            phone,
            locationCords: location,
            city,
            country,
            imageUrl
        })
    }
}

export const updateUser = (email, fname, lname, institute, bio, phone, location) => {
    return async (dispatch, getState) => {


        dispatch({
            type: UPDATE_USER_ON_SIGNUP,
            uid: uid,
            bio,
            courses,
            phone,
            locationCords: location,
            city,
            country,
        })
    }
}
