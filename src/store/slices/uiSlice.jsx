/**
 * UI Slice - Manages UI state
 * Stores loading states, error messages, and other UI-related state
 */

// Action Types
const SET_LOADING = 'ui/setLoading';
const SET_ERROR = 'ui/setError';
const CLEAR_ERROR = 'ui/clearError';
const SET_SUCCESS_MESSAGE = 'ui/setSuccessMessage';
const CLEAR_SUCCESS_MESSAGE = 'ui/clearSuccessMessage';

// Initial State
const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

// Action Creators
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setSuccessMessage = (message) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message,
});

export const clearSuccessMessage = () => ({
  type: CLEAR_SUCCESS_MESSAGE,
});

// Redux reducer for UI state
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };
    default:
      return state;
  }
}

// Selectors
export const selectLoading = (state) => state.ui.loading;
export const selectError = (state) => state.ui.error;
export const selectSuccessMessage = (state) => state.ui.successMessage;
