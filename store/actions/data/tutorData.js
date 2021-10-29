import envs from '../../../config/env'

import writeUserData from '../../../utilities/readWriteUserData/writeUserData'
import { readAllUsers } from '../representation'

export const ADD_LESSON = 'ADD_LESSON'
export const DELETE_LESSON = 'DELETE_LESSON'

export const addLesson = (lessons) => {
    return async (dispatch, getState) => {
        const user = await {...getState().data, lessons}

        try {
            await writeUserData(user)
        } catch {
            throw new Error("Can't add new lesson, please try again later")
        }

        await dispatch(readAllUsers())

        await dispatch({
            type: ADD_LESSON,
            lessons: lessons
        })

    }
}

export const deleteLesson = (lessons, user) => {

}