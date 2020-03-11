import React from 'react';
import { Flex, IconButton, Image } from '@chakra-ui/core';

const Footer = () => (
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
        <IconButton aria-label="icon" icon="triangle-up" ml={1} mr={1} />
      </Flex>
      <Flex></Flex>
    </Flex>
  </div>
);

export default Footer;
