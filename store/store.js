import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'
import authReducer from './reducer/auth'

const rootReducer = combineReducers({
    representationLists: representationReducer,
    auth: authReducer
});
  
export default createStore(rootReducer, applyMiddleware(ReduxThunk));