import { UPDATE_USER_ON_SIGNUP, SAVE_IMAGE } from '../actions/data'

const initialState = {
    bio: '',
    courses: [],
    phone: '',
    image: '',
    location: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_ON_SIGNUP:
            return {
                bio: action.bio,
                courses: action.courses,
                phone: action.phone,
                image: action.image,
                location: action.location
            }
                
        default:
            return state
    }
}