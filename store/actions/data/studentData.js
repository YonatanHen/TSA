import readUserData from '../../../utilities/readWriteUserData/readUserData'
import { readAllUsers } from '../representation'

export const ADD_LESSON = 'ADD_LESSON'

export const scheduleLesson = (lessons, tutorData ,lessonDay, lessonTime, selectedCourse) => {
    return async (dispatch, getState) => {
        const token = getState().data.token
        const studentUserUid = getState().data.uid

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

        if(!updateLessons.ok) {
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
                    tutorId: tutorData.uid,
                    course: selectedCourse
                })
            }
        )

        if(!addLessonToStudent.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readAllUsers())    
        
        const user = readUserData(studentUserUid)

        console.log('The User is' + user)

        await dispatch({
            type: ADD_LESSON,
            lessons: user.lessons
        })
    }
}