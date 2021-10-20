import { LOGOUT, SIGNIN, SIGNUP, UPDATE_USER_ON_SIGNUP } from '../actions/userData'

const initialState = {
    //On sign-in/up
    token: null,
    uid: null,
    signedUp: false,
    role: null,
    institute: null,
    firstName: null,
    lastName: null,
    //Addittional details
    bio: '',
    courses: [],
    phone: '',
    imageUrl: '',
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
                uid: action.uid,
                signedUp: true,
                role: action.role,
                institue: action.institute,
                firstName: action.firstName,
                lastName: action.lastName
            }
        case SIGNIN:
            return {
                ...state,
                token: action.token,
                uid: action.uid,
                role: action.role,
                institute: action.institute,
                firstName: action.firstName,
                lastName: action.lastName,
                bio: action.bio,
                courses: action.courses,
                phone: action.phone,
                imageUrl: action.imageUrl,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country
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
                imageUrl: action.image,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country
            }
        default:
            return state
    }
}
