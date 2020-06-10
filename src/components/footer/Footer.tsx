import React, { ReactElement, useState, useRef } from 'react';
import { Flex, IconButton, Image } from '@chakra-ui/core';
import ReactHowler from 'react-howler';
// @ts-ignore
import Player from 'react-howler-player';

const Footer = (): ReactElement => {
  const [playing, setPlaying] = useState(false);

  const zzrpRef = useRef(null);

  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      <Flex
        justifyContent="space-between"
        alignItems="stretch"
        flexDirection="row"
      >
        <Flex justifyContent="flex-start">
          <Image height="100px" width="100px" />
        </Flex>
        <Flex>
          <IconButton aria-label="icon" icon="triangle-down" ml={1} mr={1} />
          <IconButton aria-label="icon" icon="copy" />
          <IconButton
            aria-label="icon"
            icon="triangle-up"
            ml={1}
            mr={1}
            onClick={(): void => {
              console.log(playing);
              console.log('memes');
              setPlaying(!playing);
            }}
          />
        </Flex>
        <Flex></Flex>

        {/* <ReactHowler
          src="http://localhost:3005/track/1.mp3"
          playing={playing}
          ref={zzrpRef}
        /> */}
        {/* <Player
          src={['http://localhost:3005/track/1.mp3']}
          isDark={true}
          // onTimeUpdate={timeUpdate}
        /> */}
      </Flex>
    </div>
  );
};

export default Footer;
