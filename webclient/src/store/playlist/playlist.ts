import {
  createSlice,
  PayloadAction,
  createEntityAdapter
} from '@reduxjs/toolkit';

// type SliceState = { state: 'loading' } | { state: 'finished'; data: string };

// const initialState: SliceState = { state: 'loading' };

// const increment = createAction<number, 'increment'>('increment');
// const decrement = createAction<number, 'decrement'>('decrement');

export type Track = {
  id: number;
  name: string;
  artist: string;
  year: string;
  // ...
};

const playlistAdapter = createEntityAdapter<Track>();

const initialState = playlistAdapter.getInitialState();
const selectors = playlistAdapter.getSelectors();

const slice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: playlistAdapter.addOne,
    removeTrack: playlistAdapter.removeOne,
    updateTracks: playlistAdapter.updateMany,
    setAllTracks: playlistAdapter.setAll
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { addTrack, removeTrack, updateTracks, setAllTracks } = actions;

export const { selectAll, selectIds, selectById } = selectors;
// Export the reducer, either as a default or named export
export { reducer };
