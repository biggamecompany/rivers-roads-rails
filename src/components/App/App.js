import React from "react";
import "./App.css";
import TileGenerator from "../../utils/TileGenerator";

import Board from "../Board/Board";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const tiles = new TileGenerator();
    tiles.getTileStatus();
  }
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
