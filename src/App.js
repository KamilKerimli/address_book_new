import React, { useEffect } from 'react'
import Router from "./router/Router";
import { DarkModeToggle } from "./utils/helpers";

function App() {
  useEffect(() => {
    DarkModeToggle();
  });
  return (
    <Router />
  );
}

export default App;
