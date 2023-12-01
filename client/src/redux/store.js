import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger"
const persistConfig = {
    key: 'askjcnaskjcnkjsZncjk',
    storage,
}

const middlewares = [
    logger,
];

const persist = persistReducer(persistConfig, rootReducer,...middlewares)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(persist);
export const persistor = persistStore(store);