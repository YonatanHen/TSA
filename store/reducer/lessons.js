import { DELETE_LESSON, ADD_LESSON, READ_LESSONS } from '../actions/data/lessonsData'
import { } from '../actions/data/lessonsData'

const initialState = {
    lessons: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case READ_LESSONS: 
        return {
            lessons: action.lessons
        }
        case ADD_LESSON:
            return {
                ...state,
                lessons: {
                    ...state.lessons,
                    [action.tutorInstitute]: {
                        ...state.lessons.tutorInstitute,
                        [action.tutorId]: action.tutorLessons
                    }
                }
            }
        case DELETE_LESSON:
            return {
                ...state,
                // lessons: [...state.lesson, action.tutorLessons]
            }
        default:
            return state
    }
}