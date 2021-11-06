import { readAllUsers } from '../representation'


export const disableEnableUser = (user) => {
    return async (dispatch, getState) => {
        const token = getState().data.token


        await fetch(
            `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users/${user.role}s/${user.uid}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...user,
                    disabled: user.disabled ? false : true
                })
            }
        ).then(res => res.json())
            .catch(err => {
                console.log(err)
                throw new Error('Error in disable/enable user!')
            })

        await dispatch(readAllUsers())
    }
}