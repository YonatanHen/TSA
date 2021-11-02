import envs from '../../../config/env'
import readUserData from '../../../utilities/readWriteUserData/readUserData'

import writeUserData from '../../../utilities/readWriteUserData/writeUserData'
import { readAllUsers } from '../representation'

export const ADD_LESSON_TO_TUTOR_USER = 'ADD_LESSON_TO_TUTOR_USER'
export const ADD_LESSON_TO_STUDENT_USER = 'ADD_LESSON_TO_STUDENT_USER'
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
            type: ADD_LESSON_TO_TUTOR_USER,
            lessons: lessons
        })

    }
}

export const deleteLesson = (lessons, user) => {

}

export const scheduleLesson = (lessons, tutorData ,lessonDay, lessonTime, selectedCourse) => {
    return async (dispatch, getState) => {
        const token = getState().data.token
        const studentUserUid = getState().data.uid

        let resData

        const updateLessons = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/tutors/${tutorData.uid}/lessons.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...lessons
                })
            }
        )

        resData = updateLessons.json()

        if(!updateLessons.ok) {
            console.log(resData.error)
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        const addLessonToStudent = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/students/${studentUserUid}/lessons/${lessonDay}/${lessonTime}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tutor: `${tutorData.firstName} ${tutorData.lastName}`,
                    course: selectedCourse
                })
            }
        )

        resData = addLessonToStudent.json()

        if(!addLessonToStudent.ok) {
            console.log(resData.error)
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readAllUsers())
        
        await dispatch(readUserData(studentUserUid))
        
    }
}