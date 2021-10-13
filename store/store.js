import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'
import authReducer from './reducer/auth'
import dataReducer from './reducer/data'

const rootReducer = combineReducers({
    representationLists: representationReducer,
    auth: authReducer,
    data: dataReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store