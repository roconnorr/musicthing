import React, { ReactElement } from 'react';

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