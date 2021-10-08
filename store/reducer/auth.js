import { LOGOUT, SIGNIN, SIGNUP } from '../actions/auth'

const initialState = {
    token: null,
    userId: null,
    signedUp: false,
    role: null,
    institue: null
    // didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
                signedUp: true,
                role: action.role,
                institue: action.institue
            }
        case SIGNIN:
            return {
                token: action.token,
                userId: action.userId,
                role: action.role,
                institue: action.institue
            }
            case LOGOUT:
                return {
                    ...initialState
                }
        default:
            return state
    }
}