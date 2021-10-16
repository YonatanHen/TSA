import { LOGOUT, SIGNIN, SIGNUP, UPDATE_USER_ON_SIGNUP } from '../actions/userData'

const initialState = {
    //On sign-in/up
    token: null,
    userId: null,
    signedUp: false,
    role: null,
    institue: null,
    firstName: null,
    lastName: null,
    //Addittional details
    bio: '',
    courses: [],
    phone: '',
    image: '',
    locationCords: '',
    city: '',
    country: ''
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
        case UPDATE_USER_ON_SIGNUP:
            return {
                bio: action.bio,
                courses: action.courses,
                phone: action.phone,
                image: action.image,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country
            }
        default:
            return state
    }
}
