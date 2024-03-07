import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";
import {createLogger} from 'redux-logger';

import reducers from './reducers/index';

const logger = createLogger();

let middleware;

if (process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    middleware = applyMiddleware(thunk, logger);
}else{
    middleware = applyMiddleware(thunk);
}

export const store = createStore(reducers, middleware);

export const persist = persistStore(store);