import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../utils/api';

// Async thunks
export const startSession = createAsyncThunk(
  'sessions/start',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await apiService.startSession(testId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSession = createAsyncThunk(
  'sessions/get',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await apiService.getSession(testId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSession = createAsyncThunk(
  'sessions/update',
  async ({ testId, answers }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateSession(testId, { answers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitSession = createAsyncThunk(
  'sessions/submit',
  async ({ testId, answers }, { rejectWithValue }) => {
    try {
      const response = await apiService.submitSession(testId, { answers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    currentSession: null,
    loading: false,
    error: null,
    submitting: false,
    result: null,
  },
  reducers: {
    clearSession: (state) => {
      state.currentSession = null;
      state.error = null;
      state.result = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLocalAnswers: (state, action) => {
      if (state.currentSession) {
        state.currentSession.answers = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Start session
      .addCase(startSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload.session;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get session
      .addCase(getSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.session) {
          state.currentSession = action.payload.session;
        }
      })
      .addCase(getSession.rejected, (state, action) => {
        state.loading = false;
        state.error = null; // No session is not an error
      })
      // Update session
      .addCase(updateSession.pending, (state) => {
        // Don't show loading for auto-save
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        // Silent success for auto-save
      })
      .addCase(updateSession.rejected, (state, action) => {
        // Silent error for auto-save
        console.error('Failed to save answers:', action.payload);
      })
      // Submit session
      .addCase(submitSession.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitSession.fulfilled, (state, action) => {
        state.submitting = false;
        state.result = {
          score: action.payload.score,
          timeSpent: action.payload.timeSpent
        };
        state.currentSession = null;
      })
      .addCase(submitSession.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearSession, clearError, updateLocalAnswers } = sessionsSlice.actions;
export default sessionsSlice.reducer;
