import React from "react";
import {
  Heading,
  theme,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Box
} from "@chakra-ui/core";

import MusicKitProvider from "./providers/MusicKitProvider";

import "./App.css";
import Random from "./Random";
import Header from "./Header";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
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

function App() {
  return (
    <ThemeProvider theme={newTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Header />
        {/* <MusicKitProvider> */}
        <Heading>Welcome to musicthing</Heading>
        <Random />
        {/* </MusicKitProvider> */}
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
