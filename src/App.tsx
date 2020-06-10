import React, { useState, useEffect, ReactElement } from 'react';

import Player from './components/player/Player';

import 'react-virtualized/styles.css';
import './App.css';

import {
  Heading,
  theme,
  ThemeProvider,
  CSSReset,
  ColorModeProvider
} from '@chakra-ui/core';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import TrackTable from './components/tracktable/TrackTable';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
const bp = {
  sm: breakpoints[0],
  md: breakpoints[1],
  lg: breakpoints[2],
  xl: breakpoints[3]
};

const newTheme = {
  ...theme,
  bp
};

// import React, { useState, useEffect } from "react";

// const useAudio = (url: string): [boolean, () => void] => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState<boolean>(false);

//   const toggle = (): void => {
//     setPlaying(!playing);
//   };

//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

// const Player = ({ url }: { url: string }) => {
//   const [playing, toggle] = useAudio(url);

//   return (
//     <div>
//       <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
//     </div>
//   );
// };

// export default Player;

function App(): ReactElement {
  return (
    <ThemeProvider theme={newTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Header />
        <Heading>Welcome to musicthing</Heading>
        <TrackTable />
        <Footer />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
