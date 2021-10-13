import { UPDATE_USER_ON_SIGNUP } from '../actions/data'

const initialState = {
    bio: '',
    courses: [],
    phone: '',
    image: '',
    locationCords: '',
    city: '',
    country: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
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