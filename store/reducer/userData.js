import { LOGOUT, SIGNIN, SIGNUP, UPDATE_USER_ON_SIGNUP, EDIT_USER } from '../actions/userData'

const initialState = {
    //On sign-in/up
    token: null,
    uid: null,
    email: null,
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
                institute: action.institute,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email
            }
        case SIGNIN:
            return {
                ...state,
                token: action.token,
                uid: action.uid,
                email: action.email,
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
                ...state,
                bio: action.bio,
                courses: action.courses,
                phone: action.phone,
                imageUrl: action.image,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country,
                signedUp: false,
            }
        case EDIT_USER: 
        return {
            ...state,

        }
        default:
            return state
    }
}
