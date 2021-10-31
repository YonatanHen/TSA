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

export const scheduleLesson = (TutorUid, studentName, courseName, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const studentUid = getState().data.uid
        const token = getState().data.token

        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/tutors/${TutorUid}/lessons/${lessonDate}/${lessonTime}/time.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course: courseName,
                    student: studentName
                })
            }
        )

        if(!response.ok) {
            throw new Error('An error occured with schedule this meeyins, please try again later')
        }

        dispatch({
            //dispatch here with parameterers
        })
        
    }
}