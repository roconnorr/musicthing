import React, { ReactElement } from 'react';
// @ts-ignore
import * as HPlayer from 'react-howler-player';

class Player extends React.Component {
  render(): ReactElement {
    return (
      <video width="100%" height="480" controls>
        <source src={`http://localhost:3005/tracks/${1}`} type="audio/mp3" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default Player;
