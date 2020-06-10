import React from 'react';
// @ts-ignore
import * as HPlayer from 'react-howler-player';

class Player extends React.Component {
  render() {
    return (
      <HPlayer src={[`http://localhost:3005/tracks/${1}`]} isDark={true} />
    );
  }
}

export default Player;