import React from "react";

import "react-virtualized/styles.css";
import "./App.css";

import {
  Heading,
  theme,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
} from "@chakra-ui/core";

import Random from "./Random";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import TrackTable from "./components/tracktable/TrackTable";

import MusicKitProvider from "./providers/MusicKitProvider";

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
        <TrackTable />
        {/* <Random /> */}
        <Footer />
        {/* </MusicKitProvider> */}
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
