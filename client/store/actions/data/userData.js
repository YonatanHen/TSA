import envs from '../../../config/env'


import findAdmin from '../../../utilities/findAdmin'
import writedata from '../../../utilities/readWriteUserData/writeUserData'
import readUserData from '../../../utilities/readWriteUserData/readUserData'
import { readAllUsers } from '../representation'

const { FIREBASE_API_KEY, IP_ADDRESS } = envs

export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'
export const LOGOUT = 'LOGOUT'
export const EDIT_USER = 'EDIT_USER'
export const UPDATE_USER_ON_SIGNUP = 'UPDATE_USER_ON_SIGNUP'
export const CHANGE_EMAIL = 'CHANGE_EMAIL'

import imageUploader from '../../../utilities/cloudinary/uploadImage'
import setCityAndCountryByLocation from '../../../utilities/setCityAndCountryByLocation'

import { sendPushNotification, registerForPushNotificationsAsync} from '../../../utilities/notifications' ;
import axios from 'axios'
import { readLessons } from './lessonsData'

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

        await writedata({ email: email, uid: resData.localId, firstName: fname, lastName: lname, institute: institute, role: role })

        await dispatch(readAllUsers())
        await dispatch(readLessons())

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
            } else if (resData.error.message === 'INVALID_PASSWORD') {
                throw new Error('The password is invalid')
            }
            else {
                throw new Error('Something went wrong')
            }
        }

        const user = await readUserData(resData.localId)

        await sendPushNotification(user.notificationsToken)


        if (user.disabled) {
            throw new Error('Account is disabled. please contact your institute for more info.')
        }

        axios.get(`http://${IP_ADDRESS}:8000/login`)
            .then(res => console.log(res.data.message))

        await dispatch(readAllUsers())
        await dispatch(readLessons())

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

export const addDataOnSignUp = (role, bio, image, courses = undefined, phone, location) => {
    return async (dispatch, getState) => {
        if (!location) {
            throw new Error('You must pick a location!')
        }
        if (!phone || phone === '') {
            throw new Error('You must enter a phone number!')
        }
        const token = getState().data.token
        const uid = getState().data.uid

        let city, country, imageUrl = undefined

        if (location) {
            let locationValues = await setCityAndCountryByLocation(location)
            city = locationValues.city
            country = locationValues.country
        }

        if (image) {
            // axios.get(`http://${IP_ADDRESS}:8000/upload-image/${image}`)
            //  .then(res => {
            //     imageUrl = res.data.url
            //  })
            //  .catch(err => {
            //     throw new Error(err.data.error)

            //  })
            imageUrl = await imageUploader(image)
        }

        const notificationsToken = await registerForPushNotificationsAsync()

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
                    imageUrl,
                    notificationsToken: notificationsToken
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
            imageUrl,
            notificationsToken: notificationsToken
        })
    }
}

export const updateUser = (fname, lname, institute, bio, courses = undefined, phone, location) => {
    return async (dispatch, getState) => {
        const token = getState().data.token
        const uid = getState().data.uid
        const role = getState().data.role

        let city, country = undefined

        if (location) {
            let locationValues = await setCityAndCountryByLocation(location)
            city = locationValues.city
            country = locationValues.country
        }

        const editedUser = {
            firstName: fname,
            lastName: lname,
            institute,
            bio,
            phone,
            courses,
            locationCords: location,
            city,
            country,
        }

        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${role}s/${uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedUser)
            }
        )

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        await dispatch(readAllUsers())

        dispatch({
            type: EDIT_USER,
            ...editedUser
        })
    }
}

export const deleteUser = () => {
    return async (dispatch, getState) => {
        const token = getState().data.token
        const uid = getState().data.uid
        const role = getState().data.role


        let response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FIREBASE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: token
                })
            }
        ).then(res => res.json())
            .catch(err => {
                throw new Error('Error in delete authentication details!')
            })

        response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${role}s/${uid}.json?auth=${token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json())
            .catch(err => {
                throw new Error('Error in delete user details!')
            })

        await dispatch(readAllUsers())

        await dispatch({
            type: LOGOUT
        })
    }
}

export const resetPassword = async (email) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
        })
    })

    if (!response.ok) {
        throw new Error('Something went wrong!')
    }

    return
}


export const changePassword = (newPassword) => {
    return async (dispatch, getState) => {
        const token = getState().data.token
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token,
                password: newPassword,
                returnSecureToken: false
            })
        })


        const resData = await response.json()

        if (!response.ok) {
            if(resData.error.message === 'INVALID_ID_TOKEN') {
                throw new Error('Please login again!')
            } else {
                throw new Error('Something went wrong!')
            }
        }

        await dispatch({
            type: LOGOUT
        })
    }
}

export const changeEmail = (newEmail) => {
    return async (dispatch, getState) => {
        const user = getState().data
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: user.token,
                email: newEmail,
                returnSecureToken: false
            })
        })


        const resData = await response.json()

        if (!response.ok) {
            if(resData.error.message === 'EMAIL_EXISTS') {
                throw new Error('The email address is already in use by another account!')
            } else if(resData.error.message === 'INVALID_ID_TOKEN') {
                throw new Error('Please login again!') 
             } else {
                throw new Error('Something went wrong!')
            }
        }

        const response2 = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json?auth=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: newEmail})
            }
        )

        if (!response2.ok) {
            throw new Error('Something went wrong 2!')
        }
        await dispatch(readAllUsers())

        dispatch({
            type: EDIT_USER,
            ...user, 
            email: newEmail
        })

        await dispatch({
            type: LOGOUT
        })
    }
    }