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

import imageUploader from '../../../utilities/cloudinary/uploadImage'
import setCityAndCountryByLocation from '../../../utilities/setCityAndCountryByLocation'
import axios from 'axios'

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

        writedata({ email: email, uid: resData.localId, firstName: fname, lastName: lname, institute: institute, role: role })

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

        if(user.disabled) {
            throw new Error('Account is disabled. please contact your institute for more info.')
        }

        axios.get(`http://${IP_ADDRESS}:8000/login`)
            .then(res => console.log(res.data.message))

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

export const updateUser = (email, fname, lname, institute, bio, courses = undefined, phone, location) => {
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

        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${role}s/${uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    fname,
                    lname,
                    institute,
                    bio,
                    phone,
                    courses,
                    locationCords: location,
                    city,
                    country,
                })
            }
        )

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        //Check if this line did not failed.
        await dispatch(readAllUsers())

        // dispatch({
        //     type: EDIT_USER,
        //     email,
        //     fname,
        //     lname,
        //     institute,
        //     bio,
        //     phone,
        //     courses,
        //     locationCords: location,
        //     city,
        //     country,
        // })

        return { message: 'User updated successfully.' }
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
            .then(res => console.log(res))
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
            .then(res => console.log(res))
            .catch(err => {
                throw new Error('Error in delete user details!')
            })

        await dispatch({
            type: LOGOUT
        })
    }
}

export const disableEnableUser = (user) => {
    return async (dispatch, getState) => {
        const token = getState().data.token


        response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...user,
                    disabled: user.disabled ? false : true
                })
            }
        ).then(res => res.json())
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                throw new Error('Error in disable/enable user!')
            })

        await dispatch(readAllUsers())
    }
}