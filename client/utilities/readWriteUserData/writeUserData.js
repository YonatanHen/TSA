import { DATABASE_URL } from '@env'

export default async (user) => {
    const response = await fetch(
        `${DATABASE_URL}/users/${user.role}s/${user.uid}.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

    const resData = await response.json()

    if (!response.ok) {
        console.log(resData.error)
        throw new Error('Something went wrong')
    }

    return
}
