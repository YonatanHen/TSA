import { Alert } from 'react-native'
import { readAllUsers } from '../../actions/representation'
import writeUserData from '../../../utilities/readWriteUserData/writeUserData'

export const pushToQueue = (tutorData, studentId) => {
    return async dispatch => {
        let newQueue
        if (tutorData.studentsQueue === undefined) {
            newQueue = [studentId]
        }
        else if (tutorData['studentsQueue'].includes(studentId)) {
            Alert.alert('You are already in the queue')
            return
        }
        else {
            newQueue = tutorData['studentsQueue'].push(studentId)
        }
        const updatedTutor = { ...tutorData, studentsQueue: newQueue }
        await writeUserData(updatedTutor)

        await dispatch(readAllUsers())

        Alert.alert('You have been added successfully.')
    }
}

export const popFromQueue = (tutorData, studentId) => {
    return async dispatch => {
        try {
            const updatedTutor = { ...tutorData, studentsQueue: tutorData['studentsQueue'].filter(id => studentId !== id) }

            await writeUserData(updatedTutor)

            await dispatch(readAllUsers())

            Alert.alert('You have been removed from the queue successfully.')
        } catch (err) {
            Alert.alert('An Error occured!')
        }
    }
}