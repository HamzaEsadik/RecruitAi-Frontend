/**
 * Auth Slice - Manages authentication state
 * Stores access token and dashboard ID for the application
 */

// Action Types
const SET_ACCESS_TOKEN = 'auth/setAccessToken';
const SET_DASHBOARD_ID = 'auth/setDashboardId';
const CLEAR_AUTH = 'auth/clearAuth';

// Initial State
const initialState = {
  accessToken: '',
  dashboardId: '',
};

// Action Creators
export const setAccessToken = (token) => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});

export const setDashboardId = (id) => ({
  type: SET_DASHBOARD_ID,
  payload: id,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

// Redux reducer for auth state
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case SET_DASHBOARD_ID:
      return {
        ...state,
        dashboardId: action.payload,
      };
    case CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}

// Selectors
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectDashboardId = (state) => state.auth.dashboardId;
