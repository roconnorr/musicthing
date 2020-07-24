import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../playlist/playlist';

type NowPlayingState = {
  track: Track | null;
};

const initialState: NowPlayingState = { track: null };

const slice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    setPlayingTrack: (state, action) => ({ track: action.payload })
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { setPlayingTrack } = actions;
// Export the reducer, either as a default or named export
export { reducer };
