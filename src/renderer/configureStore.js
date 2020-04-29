import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { rootSaga } from './sagas';

export default function configureStore(preloadedState = {}) {
  let composeE = compose;

  const sagaMiddleware = createSagaMiddleware();

  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeE = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

  const rootReducer = createReducer();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeE(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
