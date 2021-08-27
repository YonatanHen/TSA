export const ACADEMIC_INSTITUTES = 'ACADEMIC_INSTITUTES'

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
