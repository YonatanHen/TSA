import { ACADEMIC_INSTITUTES, READ_ALL_USERS } from '../actions/representation'

const initialState = {
    institutesList: [],
    usersList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACADEMIC_INSTITUTES:
            return {
                institutesList: action.institutesList
            }

        case READ_ALL_USERS:
            return {
                usersList: action.usersList
            }

        default:
            return state
    }
}