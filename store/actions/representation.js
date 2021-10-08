export const ACADEMIC_INSTITUTES = 'ACADEMIC_INSTITUTES'
export const READ_ALL_USERS = 'READ_ALL_USERS'

export const fetchInstitutes = () => {
    return async dispatch => {
        let response = await fetch("https://raw.githubusercontent.com/endSly/world-universities-csv/master/world-universities.csv", {
            method: 'GET',
            body: '',
            redirect: 'follow'
        })

        response = await response.text()

        response = response.split('\n').map(institue => institue.split(',')[1])
        // console.log(response)

        dispatch({
            type: ACADEMIC_INSTITUTES,
            institutesList: response
        })

        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
    }
}

export const readAllUsers = () => {
    return async dispatch => {
        const response = await fetch(`https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/users.json`)

        const users = await response.json()

        if (!response.ok) {
            console.log(resData.error)
            throw new Error('Something went wrong')
        }

        dispatch({
            type: READ_ALL_USERS,
            usersList: users
        })
    }
}

