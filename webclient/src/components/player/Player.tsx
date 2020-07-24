import React, { ReactElement } from 'react';
import { Box } from '@chakra-ui/core/dist';

class Player extends React.Component {
  render(): ReactElement {
    return (
      <Box w="100%" position="fixed" bottom="0">
        <audio
          style={{ width: '100%' }}
          controls
          src={`http://localhost:3005/tracks/${1}`}
        >
          Your browser does not support the audio element.
        </audio>
      </Box>
    );
  }
}

export default Player;
