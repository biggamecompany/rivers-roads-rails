import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ColoredRect from "./ColoredRect";

import { Stage, Layer, Text } from "react-konva";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <ColoredRect
            square={{ x: 0, y: 0, len: 150 }}
            lineXY={{ x: 0, y: 0 }}
          />
          <ColoredRect
            square={{ x: 150, y: 0, len: 150 }}
            lineXY={{ x: 150, y: 0 }}
          />

          <ColoredRect
            square={{ x: 0, y: 150, len: 150 }}
            lineXY={{ x: 0, y: 75 }}
          />
          <ColoredRect
            square={{ x: 150, y: 150, len: 150 }}
            lineXY={{ x: 150, y: 75 }}
          />
          <ColoredRect
            square={{ x: 300, y: 150, len: 150 }}
            lineXY={{ x: 300, y: 75 }}
          />
          <ColoredRect
            square={{ x: 300, y: 300, len: 150 }}
            lineXY={{ x: 300, y: 150 }}
          />
		  <ColoredRect
            square={{ x: 450, y: 450, len: 150 }}
            lineXY={{ x: 450, y: 300 }}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
