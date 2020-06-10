import React, { ReactElement } from 'react';

import Player from '../player/Player';

const Footer = (): ReactElement => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Player />
    </div>
  );
};

export default Footer;
