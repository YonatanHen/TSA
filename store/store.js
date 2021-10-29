import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import representationReducer from './reducer/representation'
import dataReducer from './reducer/data'

const rootReducer = combineReducers({
    representationLists: representationReducer,
    data: dataReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store