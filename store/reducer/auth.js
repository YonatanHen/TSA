

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
        default:
            return state
    }
}