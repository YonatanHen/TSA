import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension';

import representationReducer from './reducer/representation'
import dataReducer from './reducer/data'
import lessonsReducer from './reducer/lessons'

let composeEnhancers = compose
//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const rootReducer = combineReducers({
    representationLists: representationReducer,
    data: dataReducer,
    lessons: lessonsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)))

export default store