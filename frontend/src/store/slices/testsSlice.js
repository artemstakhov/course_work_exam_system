import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../utils/api';

// Async thunks
export const fetchTests = createAsyncThunk(
  'tests/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getTests();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTestById = createAsyncThunk(
  'tests/fetchById',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await apiService.getTestById(testId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTest = createAsyncThunk(
  'tests/create',
  async ({ userId, testData }, { rejectWithValue }) => {
    try {
      const response = await apiService.createTest(userId, testData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTest = createAsyncThunk(
  'tests/delete',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteTest(testId);
      return { testId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const testsSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: [],
    currentTest: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTest: (state) => {
      state.currentTest = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tests
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload.tests || [];
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch test by ID
      .addCase(fetchTestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTest = action.payload.test;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create test
      .addCase(createTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.test) {
          state.tests.unshift(action.payload.test);
        }
      })
      .addCase(createTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete test
      .addCase(deleteTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = state.tests.filter(test => test._id !== action.payload.testId);
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTest, clearError } = testsSlice.actions;
export default testsSlice.reducer;
