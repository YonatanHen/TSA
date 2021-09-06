import { SIGNIN, SIGNUP } from '../actions/auth'

const initialState = {
    token: null,
    userId: null,
    // didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNIN:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}