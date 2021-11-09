import { ADD_LESSON } from '../actions/data/lessonsData'
import { ACADEMIC_INSTITUTES, READ_ALL_USERS } from '../actions/representation'

const initialState = {
    institutesList: [],
    usersList: [],
    lessons: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACADEMIC_INSTITUTES:
            return {
                ...state,
                institutesList: action.institutesList
            }

        case READ_ALL_USERS:
            return {
                ...state,
                usersList: action.usersList
            }
        case ADD_LESSON:
            return {
                ...state,
                lessons: [...state.lesson, action.tutorLessonsO]
        }
        default:
            return state
    }
}