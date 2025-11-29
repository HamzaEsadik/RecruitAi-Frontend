/**
 * Redux Store Configuration
 * Combines reducers and creates the global store
 */

import { createStore, combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// Combine reducers into root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

// Create Redux store with DevTools support
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
