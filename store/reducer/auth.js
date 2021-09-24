import { LOGOUT, SIGNIN, SIGNUP } from '../actions/auth'

const initialState = {
    token: null,
    userId: null,
    signedUp: false
    // didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
                signedUp: true
            }
        case SIGNIN:
            return {
                token: action.token,
                userId: action.userId
            }
            case LOGOUT:
                return {
                    ...initialState
                }
        default:
            return state
    }
}