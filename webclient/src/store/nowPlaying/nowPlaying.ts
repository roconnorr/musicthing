import { createSlice } from '@reduxjs/toolkit';

type NowPlayingState = {
  trackId: number;
};

const initialState: NowPlayingState = { trackId: 0 };

const slice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    setPlayingTrack: (state, action) => ({ trackId: action.payload })
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { setPlayingTrack } = actions;
// Export the reducer, either as a default or named export
export { reducer };
