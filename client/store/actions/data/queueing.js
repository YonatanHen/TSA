import { Alert } from 'react-native'
import { readAllUsers } from '../../actions/representation'
import writeUserData from '../../../utilities/readWriteUserData/writeUserData'

export const pushToQueue = (tutorData, studentId, pushToken) => {
    return async (dispatch, getState) => {
        let newQueue
        if (tutorData.studentsQueue === undefined) {
            newQueue = [{id: studentId, token: pushToken}]
        }
        else if (tutorData['studentsQueue'].includes({id: studentId, token: pushToken})) {
            Alert.alert('You are already in the queue')
            return
        }
        else {
            newQueue = tutorData['studentsQueue']
            newQueue.push({id: studentId, token: pushToken})
        }

        console.log('new queue is' + newQueue)

        const updatedTutor = { ...tutorData, studentsQueue: newQueue }
        await writeUserData(updatedTutor)

        await dispatch(readAllUsers())

        Alert.alert('You have been added successfully.')
    }
}

export const popFromQueue = (tutorData, studentId) => {
    return async dispatch => {
        try {
            const updatedTutor = { ...tutorData, studentsQueue: tutorData['studentsQueue'].filter(object => studentId !== object.id) }

            await writeUserData(updatedTutor)

            await dispatch(readAllUsers())

            Alert.alert('You have been removed from the queue successfully.')
        } catch (err) {
            Alert.alert('An Error occured!')
        }
    }
}