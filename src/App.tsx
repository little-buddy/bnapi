import { NextUIProvider } from '@nextui-org/react';

import Home from './home';

import './App.css';

function App() {
  return (
    <NextUIProvider>
      <Home></Home>
    </NextUIProvider>
  );
}

export default App;
