import React from "react";
import "./App.css";

import Board from "../Board/Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { window: { h: 0, w: 0 } };
    this.getScreenSize = this.getScreenSize.bind(this);
  }
  getScreenSize() {
    this.setState({
      window: { h: window.innerHeight, w: window.innerWidth }
    });
  }
  componentDidMount() {
    this.getScreenSize();
  }
  render() {
    return (
      <div className="App">
        <Board window={this.state.window} />
      </div>
    );
  }
}

export default App;
