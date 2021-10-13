import { LOGOUT, SIGNIN, SIGNUP } from '../actions/auth'

const initialState = {
    token: null,
    userId: null,
    signedUp: false,
    role: null,
    institue: null,
    firstName: null,
    lastName: null
    // didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                signedUp: true,
                role: action.role,
                institue: action.institue,
                firstName: action.firstName,
                lastName: action.lastName
            }
        case SIGNIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                role: action.role,
                institue: action.institue,
                firstName: action.firstName,
                lastName: action.lastName
            }
        case LOGOUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}