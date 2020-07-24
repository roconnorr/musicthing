import React, { ReactElement } from 'react';
// @ts-ignore
import * as HPlayer from 'react-howler-player';
import { Box } from '@chakra-ui/core/dist';

class Player extends React.Component {
  render(): ReactElement {
    return (
      <Box w="100%">
        <video controls>
          <source src={`http://localhost:3005/tracks/${1}`} type="audio/mp3" />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }
}

export default Player;
