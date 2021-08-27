import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'

const rootReducer = combineReducers({
    representationLists: representationReducer
});
  
export default createStore(rootReducer, applyMiddleware(ReduxThunk));