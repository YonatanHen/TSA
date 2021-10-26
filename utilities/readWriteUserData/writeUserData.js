
export default async (user) => {
    const response = await fetch(
        `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json`,
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
