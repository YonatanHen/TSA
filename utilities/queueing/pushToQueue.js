import { Alert } from 'react-native'
import { readAllUsers } from '../../store/actions/representation'
import writeUserData from '../readWriteUserData/writeUserData'

export default async (tutorData, studentId) => {
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

    await readAllUsers()

    Alert.alert('You have been added successfully.')
}