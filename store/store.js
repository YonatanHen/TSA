import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'
import userDataReducer from './reducer/userData'

const rootReducer = combineReducers({
    representationLists: representationReducer,
    userData: userDataReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store