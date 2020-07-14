import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

type SliceState = { state: 'loading' } | { state: 'finished'; data: string };

const initialState: SliceState = { state: 'loading' };

// const increment = createAction<number, 'increment'>('increment');
// const decrement = createAction<number, 'decrement'>('decrement');

const slice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { increment } = actions;
// Export the reducer, either as a default or named export
export { reducer };
