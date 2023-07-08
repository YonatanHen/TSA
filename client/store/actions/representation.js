export const ACADEMIC_INSTITUTES = 'ACADEMIC_INSTITUTES'
export const READ_ALL_USERS = 'READ_ALL_USERS'
import { DATABASE_URL } from '@env'
import institutesList from '../../data/world-universities'

export const fetchInstitutes = () => {
    return async dispatch => {

        var list = institutesList.split('\n').map(institue => institue.split(',')[1])

        list = list.filter((x, y) => list.indexOf(x) == y).sort((a, b) => a.localeCompare(b))
        dispatch({
            type: ACADEMIC_INSTITUTES,
            institutesList: list
        })

    }
}

export const readAllUsers = () => {
    return async dispatch => {
        const response = await fetch(
            `${DATABASE_URL}/users.json`)
        var users = await response.json()

        if (!response.ok) {
            console.log(users.error)
            throw new Error('Something went wrong')
        }

        await dispatch({
            type: READ_ALL_USERS,
            usersList: {
                admins: Object.entries(users.admins),
                tutors: Object.entries(users.tutors),
                students: Object.entries(users.students)
            }
        })
    }
}

