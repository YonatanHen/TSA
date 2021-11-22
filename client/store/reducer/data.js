import { LOGOUT, SIGNIN, SIGNUP, UPDATE_USER_ON_SIGNUP, EDIT_USER, CHANGE_EMAIL } from '../actions/data/userData'
import { ADD_LESSON } from '../actions/data/lessonsData'
import { ADD_IMAGE, DELETE_IMAGE } from '../actions/data/profilePictureActions'

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
    country: '',
    lessons: {},
    notificationsToken: '',
    studentsQueue: [] 
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
                country: action.country,
                lessons: action.lessons,
                studentsQueue: action.studentsQueue
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
                imageUrl: action.imageUrl,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country,
                signedUp: false,
                notificationsToken: action.notificationsToken
            }
        case EDIT_USER:
            return {
                ...state,
                email: action.email,
                institute: action.institute,
                firstName: action.firstName,
                lastName: action.lastName,
                bio: action.bio,
                courses: action.courses,
                phone: action.phone,
                imageUrl: action.imageUrl,
                locationCords: action.locationCords,
                city: action.city,
                country: action.country,
            }
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case ADD_LESSON:
            return {
                ...state,
                lessons: action.lessons
            }
        case ADD_IMAGE:
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        case DELETE_IMAGE:
            return {
                ...state,
                imageUrl: ''
            }
        default:
            return state
    }
}
