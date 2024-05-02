import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import appReducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const store =
    process.env.NODE_ENV === 'production'
        ? createStore(appReducers, middleware)
        : createStore(appReducers, composeWithDevTools(middleware));

export default store;

sagaMiddleware.run(rootSaga);
