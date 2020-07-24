import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core/dist';
import { RootState } from '../../store/createStore';

const Player = (): ReactElement => {
  const currentlyPlayingTrack = useSelector(
    (state: RootState) => state.nowPlaying.track
  );

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
      <audio style={{ width: '100%' }} controls autoPlay src={trackURL}>
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default Player;
