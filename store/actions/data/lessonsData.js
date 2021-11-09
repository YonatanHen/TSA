import writeUserData from '../../../utilities/readWriteUserData/writeUserData'
import readUserData from '../../../utilities/readWriteUserData/readUserData'
import { readAllUsers } from '../representation'

export const DELETE_LESSON = 'DELETE_LESSON'
export const ADD_LESSON = 'ADD_LESSON'
export const READ_LESSONS = 'READ_LESSONS'

export const readLessons = () => {
    return async (dispatch) => {
        const response = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons.json`
        )

        const lessons = await response.json()

        if (!response.ok) {
            console.log(users.error)
            throw new Error('Something went wrong')
        }

        await dispatch({
            type: READ_LESSONS,
            lessons: lessons 
        })

    }
}

export const addLesson = (lessons) => {
    return async (dispatch, getState) => {
        const user = getState().data

        const updateLessons = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${user.institute}/${user.uid}.json`,
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

        await dispatch(readLessons())

        // await dispatch({
        //     type: ADD_LESSON,
        //     tutorInstitute: user.institute,
        //     tutorId: user.uid,
        //     tutorLessons: lessons
        // })

    }
}

export const deleteLesson = (lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = await {...getState().data, lessons}

        await dispatch({
            type: ADD_LESSON,
            lessons: lessons
        })

    }
}

export const scheduleLesson = (lessons, tutorData) => {
    return async (dispatch, getState) => {
        const user = getState().data

        const updateLessons = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${tutorData.institute}/${tutorData.uid}.json`,
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

        await dispatch(readLessons())

        // await dispatch({
        //     type: ADD_LESSON,
        //     tutorInstitute: user.institute,
        //     tutorId: user.uid,
        //     tutorLessons: lessons
        // })

    }
}