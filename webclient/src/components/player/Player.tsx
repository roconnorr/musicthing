import React, { ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core/dist';
import { RootState, useAppDispatch } from '../../store/createStore';
import {
  removeTrack,
  selectIds,
  selectById
} from '../../store/playlist/playlist';
import { setPlayingTrack } from '../../store/nowPlaying/nowPlaying';

const Player = (): ReactElement => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  const currentlyPlayingTrackId = useSelector(
    (state: RootState) => state.nowPlaying.trackId
  );

  const currentlyPlayingTrack = useSelector((state: RootState) =>
    selectById(state.playlist, currentlyPlayingTrackId ?? 0)
  );

  const selectTrackIds = useSelector((state: RootState) =>
    selectIds(state.playlist)
  );

  const handleTrackEnd = (_event: Event) => {
    if (currentlyPlayingTrack) {
      dispatch(removeTrack(currentlyPlayingTrack.id));
    }

    const nextTrackId = selectTrackIds[0];

    dispatch(setPlayingTrack(nextTrackId));
  };

  if (playerRef?.current) {
    playerRef.current.onended = handleTrackEnd;
  }

  const trackURL = currentlyPlayingTrack
    ? `http://localhost:3005/tracks/${currentlyPlayingTrack.id}`
    : '';

  return (
    <Box w="100%" position="fixed" bottom="0">
      {currentlyPlayingTrack ? (
        <p>{`Currently Playing: ${currentlyPlayingTrack.name}`}</p>
      ) : (
        <p>select a track</p>
      )}
      <audio
        style={{ width: '100%' }}
        controls
        autoPlay
        src={trackURL}
        ref={playerRef}
      >
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default Player;
