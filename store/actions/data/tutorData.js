import envs from '../../../config/env'

import writeUserData from '../../../utilities/readWriteUserData/writeUserData'

export const ADD_LESSON = 'ADD_LESSON'
export const DELETE_LESSON = 'DELETE_LESSON'

export const addLesson = (lessons) => {
    return async (dispatch, getState) => {
        const user = getState()
        console.log(user)
    }
}

export const deleteLesson = (lessons, user) => {

}