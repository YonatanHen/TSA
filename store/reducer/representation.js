import { ACADEMIC_INSTITUTES, READ_ALL_USERS, UPDATE_USER_IN_LIST, DELETE_USER_FROM_LIST } from '../actions/representation'

const initialState = {
    institutesList: [],
    usersList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACADEMIC_INSTITUTES:
            return {
                ...state,
                institutesList: action.institutesList
            }

        case READ_ALL_USERS:
            return {
                ...state,
                usersList: action.usersList
            }
        default:
            return state
    }
}