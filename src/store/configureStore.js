'use strict'

import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/index'


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run,
    }
}
