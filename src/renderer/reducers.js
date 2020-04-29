import { combineReducers } from 'redux';

import app from './containers/App/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    app
  });

  return rootReducer;
};
