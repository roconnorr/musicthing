import React from "react";
import { Heading, ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Heading>Welcome to musicthing</Heading>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
