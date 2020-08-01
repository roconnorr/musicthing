import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { reducer as playlistReducer } from './playlist/playlist';
import { reducer as nowPlayingReducer } from './nowPlaying/nowPlaying';

const rootReducer = combineReducers({
  playlist: playlistReducer,
  nowPlaying: nowPlayingReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>();
