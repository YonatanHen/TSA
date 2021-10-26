
export default async (uid) => {
    const response = await fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

    const resData = await response.json()

    const users = await Object.assign({}, resData.admins, resData.tutors, resData.students)

    if (!response.ok) {
        console.log(resData.error)
        throw new Error('Something went wrong')
    }

    const user = users[uid]

    return user
}