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

export const scheduleLesson = (tutorData, studentName, courseName, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const studentUid = getState().data.uid
        const token = getState().data.token

        var lessons = await fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/tutors/${tutorData.uid}/lessons.json?auth=${token}`)
                            .then(res => res.json())

        lessons = await lessons[lessonDate].map(item => {
            if (item.time === lessonTime) return (
                {
                    ...item,
                    studentUid: studentUid,
                    student: studentName,
                    course: courseName
                }
            )
        })

        const updateLessons = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/tutors/${tutorData.uid}/lessons/${lessonDate}.json?auth=${token}`,
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

        if(!updateLessons.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readAllUsers())
        
    }
}