import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import rootSaga from './sagas';

const store = () => {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares, // dasdasd
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(store);

export default wrapper;
