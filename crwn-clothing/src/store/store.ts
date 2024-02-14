import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit'
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';
import { PersistConfig } from 'redux-persist';
import logger from 'redux-logger';




export type Rootstate = ReturnType<typeof rootReducer> 

type ExtendedPersistCofnig = PersistConfig<Rootstate> & {
    whitelist: (keyof Rootstate)[]
}

const persistConfig:ExtendedPersistCofnig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = configureStore({
    reducer:persistedReducer,
    middleware: [ sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);