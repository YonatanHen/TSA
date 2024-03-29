import { readAllUsers } from '../representation'
import { Linking } from 'react-native'
import { SERVER_URL, DATABASE_URL } from '@env'


export const disableEnableUser = (user) => {
    return async (dispatch, getState) => {
        const token = getState().data.token


        await fetch(
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
            .catch(err => {
                console.log(err)
                throw new Error('Error in disable/enable user!')
            })

        await dispatch(readAllUsers())
    }
}

export const lessonsToCSV = () => {
    return async (dispatch, getState) => {
        const adminInstitute = await getState().data.institute

        Linking.canOpenURL(`${SERVER_URL}/get-lessons-csv/${adminInstitute}`).then(supported => {
            if (!supported) {
                console.log('Unsupported url: ' + `${SERVER_URL}/get-lessons-csv/${adminInstitute}`)
            } else {
                return Linking.openURL(`${SERVER_URL}/get-lessons-csv/${adminInstitute}`)
            }
        }).catch(err => console.error(err))

    }
}

