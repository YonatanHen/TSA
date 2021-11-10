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

        if (!updateLessons.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readLessons())

    }
}

export const deleteLesson = (tutorUid, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data

        const response1 = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${user.institute}/${tutorUid}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        console.log(lessonIndex)
        console.log(lessonsInDate)

        const response2 = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${user.institute}/${tutorUid}/${lessonDate}/${lessonIndex}.json?token=${user.token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        if (!response2.ok) {
            throw new Error("Can't delete lesson! please try again later.")
        }


        await dispatch(readLessons())

    }
}

export const cancelLesson = (tutorUid, lessonDate, lessonTime) => {
    return async (dispatch, getState) => {
        const user = getState().data

        const response1 = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${user.institute}/${tutorUid}/${lessonDate}.json`)

        if (!response1.ok) {
            throw new Error("Can't fetch lessons, please try again later")
        }

        var lessonsInDate = await response1.json()

        const lessonIndex = lessonsInDate.findIndex((lesson) => lesson.time === lessonTime)

        lessonsInDate[lessonIndex] = { time: lessonsInDate[lessonIndex].time }
        console.log(lessonIndex)
        console.log(lessonsInDate)

        const response2 = await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${user.institute}/${tutorUid}/${lessonDate}.json?token=${user.token}`,
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


        await dispatch(readLessons())

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

        if (!updateLessons.ok) {
            throw new Error('An error occured while trying to schedule this meetings, please try again later')
        }

        await dispatch(readLessons())

    }
}