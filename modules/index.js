import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import rootSaga from './sagas';

const store = wrapMakeStore(() => {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const tmp = getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ['search'],
        }),
        ...middlewares,
      );
      return tmp;
    },
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
});

const wrapper = createWrapper(store);

export default wrapper;
