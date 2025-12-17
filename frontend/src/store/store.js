import { configureStore } from '@reduxjs/toolkit';
import testsReducer from './slices/testsSlice';
import sessionsReducer from './slices/sessionsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    tests: testsReducer,
    sessions: sessionsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['sessions/updateLocalAnswers'],
      },
    }),
});

export default store;
