import { DATABASE_URL } from '@env'

export default async (uid) => {
    try {
        const response = await fetch(`${DATABASE_URL}/users.json`)

        const resData = await response.json()

        const users = await Object.assign({}, resData.admins, resData.tutors, resData.students)

        if (!response.ok) {
            console.error(resData.error)
            throw new Error('Something went wrong')
        }

        const user = users[uid]
        return user
    } catch (err) { console.log(err) }
}