import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'

const rootReducer = combineReducers({
    representationOfData: representationReducer
});
  
export default createStore(rootReducer, applyMiddleware(ReduxThunk));