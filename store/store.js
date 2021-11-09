import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension';

import representationReducer from './reducer/representation'
import dataReducer from './reducer/data'
import lessonsReducer from './reducer/lessons'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    representationLists: representationReducer,
    data: dataReducer,
    lessons: lessonsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk))); //Development
// const store = createStore(rootReducer, applyMiddleware(ReduxThunk); //Production

export default store