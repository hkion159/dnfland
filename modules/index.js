import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, sagaMiddleware];
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore);

export default wrapper;
