import React, { ReactElement, useState, useRef } from 'react';
import { Flex, IconButton, Image } from '@chakra-ui/core';

import Player from '../player/Player';

const Footer = (): ReactElement => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Player />
    </div>
  );
};

export default Footer;
