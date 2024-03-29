import axios from "axios"
import { sendPushNotification } from '../../../utilities/notifications';
import { SERVER_URL, DATABASE_URL } from '@env'

export const DELETE_LESSON = 'DELETE_LESSON'
export const ADD_LESSON = 'ADD_LESSON'
export const READ_LESSONS = 'READ_LESSONS'
export const CLEAR_QUEUE = 'CLEAR_QUEUE'

export const readLessons = () => {
    return async (dispatch) => {
        const response = await fetch(
            `${DATABASE_URL}/lessons.json`
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
        var queue = user.studentsQueue

        await dispatch(readLessons())

        const updateLessons = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${user.uid}.json`,
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

        if (!updateLessons.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readLessons())

        //Notify studetns in the queue only if there are any.
        if (queue && queue.length > 0) {
            await axios.post(`${SERVER_URL}/notify-students`, {
                tokensQueue: await queue.map(object => { return object.token }),
                title: `${user.firstName + ' ' + user.lastName} has added new available lesson`,
                body: 'Enter the TSA app to check this out'
            })
        }

        await dispatch({
            type: CLEAR_QUEUE,
        })
    }
}

export const deleteLesson = (tutorUid, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data

        await dispatch(readLessons())

        const response1 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${tutorUid}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        lessonsInDate = await lessonsInDate.filter((lesson, index) => index !== lessonIndex)


        const response2 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${tutorUid}.json?token=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [lessonDate]: { ...lessonsInDate } })
            })

        if (!response2.ok) {
            throw new Error("Can't delete lesson! please try again later.")
        }


        await dispatch(readLessons())

    }
}

export const cancelLesson = (student, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data
        var queue = user.studentsQueue

        const response1 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${user.uid}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        //Save course name
        const lessonName = lessonsInDate[lessonIndex].course

        lessonsInDate[lessonIndex] = { time: lessonsInDate[lessonIndex].time, date: lessonDate }

        

        const response2 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${user.uid}/${lessonDate}.json?token=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...lessonsInDate })
            })

        if (!response2.ok) {
            throw new Error("Can't cancel lesson! please try again later.")
        }

        user && await sendPushNotification(student.notificationsToken, 
            `${user.firstName} ${user.lastName} canceled the lesson.`,
            `${lessonName} lesson canceled by ${user.firstName}`)

        await dispatch(readLessons())

        //Notify studetns in the queue only if there are any.
        if (queue && queue.length > 0) {
            await axios.post(`${SERVER_URL}/notify-students`, {
                tokensQueue: await queue.map(object => { return object.token }),
                title: `There is a new available lesson with ${user.firstName + ' ' + user.lastName}`,
                body: 'Enter the TSA app to check this out'
            })
        }
    }
}

export const cancelLessonStudent = (tutorId, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data
        const tutorToken = getState().representationLists.usersList.tutors.find(tutor => tutor[1].uid === tutorId)[1]['notificationsToken']
        var queue = user.studentsQueue

        await dispatch(readLessons())

        const response1 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${tutorId}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        const courseName = lessonsInDate[lessonIndex].course

        lessonsInDate[lessonIndex] = { time: lessonsInDate[lessonIndex].time, date: lessonDate }

        const response2 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${tutorId}/${lessonDate}.json?token=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...lessonsInDate })
            })

        if (!response2.ok) {
            throw new Error("Can't cancel lesson! please try again later.")
        }


        user && await sendPushNotification(tutorToken, 
            `${user.firstName} ${user.lastName} canceled a lesson.`,
            `${courseName} lesson canceled by ${user.firstName}, Enter the app for more details.`)

        await dispatch(readLessons())

        //Notify studetns in the queue only if there are any.
        if (queue && queue.length > 0) {
            await axios.post(`${SERVER_URL}/notify-students`, {
                tokensQueue: await queue.map(object => { return object.token }),
                title: `There is a new available lesson with ${user.firstName + ' ' + user.lastName}`,
                body: 'Enter the TSA app to check this out'
            })
        }
    }
}

export const approveLesson = (student, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data

        const response1 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${user.uid}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        lessonsInDate[lessonIndex] = { ...lessonsInDate[lessonIndex], approved: !lessonsInDate[lessonIndex].approved }

        const response2 = await fetch(
            `${DATABASE_URL}/lessons/${user.institute}/${user.uid}/${lessonDate}.json?token=${user.token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...lessonsInDate })
            })

        if (!response2.ok) {
            throw new Error("Can't cancel lesson! please try again later.")
        }
        
        student && await sendPushNotification(student.notificationsToken, 
            `${user.firstName} ${user.lastName} ${lessonsInDate[lessonIndex].approved ? '' : 'dis' }approved the lesson.`,
            `${lessonsInDate[lessonIndex].course} lesson with ${user.firstName} ${lessonsInDate[lessonIndex].approved ? '' : 'dis' }approved`)
        
        await dispatch(readLessons())
    }
}

export const scheduleLesson = (lessons, tutorData) => {
    return async (dispatch, getState) => {
        const user = getState().data

        await dispatch(readLessons())

        const updateLessons = await fetch(
            `${DATABASE_URL}/lessons/${tutorData.institute}/${tutorData.uid}.json`,
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

        if (!updateLessons.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await sendPushNotification(tutorData.notificationsToken, 
            `${user.firstName} ${user.lastName} has scheduled a new lesson with you.`,
            `The scheduled lesson can be seen in your home page :)`)
        

        await dispatch(readLessons())

    }
}