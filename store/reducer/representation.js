import { ACADEMIC_INSTITUTES } from '../actions/representation'

const initialState = {
    institutesList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACADEMIC_INSTITUTES:
            return {
                institutesList: action.institutesList
            }
    }

    return state
}