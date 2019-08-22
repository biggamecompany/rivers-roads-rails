import React from "react";
import Konva from "konva";
import { Rect, Line } from "react-konva";

class ColoredRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {
        //   https://coolors.co/fffcf2-050517-23b5d3-d64550-60d394
        white: "#FFFCF2",
        black: "#050517",
        green: "#60D394",
        red: "#D64550",
        blue: "#23B5D3"
      }
    };
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  handleMouseover = () => {
    // console.log(x, y);
  };
  render() {
    const {
      // width = 150, height = 150, x = 20, y = 20,
      square = { len: 0, x: 0, y: 0 },
      lineXY = { x: 0, y: 0 },
      ...props
    } = this.props;
    return (
      <React.Fragment>
        <Rect
          x={square.x}
          y={square.y}
          width={square.len}
          height={square.len}
          fill={this.state.colors.white}
          onMouseover={this.handleMouseover}
          zIndex={1}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 30, square.len, lineXY.y + 30]}
          stroke={this.state.colors.red}
          strokeWidth={15}
          tension={1}
          zIndex={2}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 75, square.len, lineXY.y + 75]}
          stroke={this.state.colors.green}
          strokeWidth={15}
          tension={1}
          zIndex={2}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 120, square.len, lineXY.y + 120]}
          stroke={this.state.colors.blue}
          strokeWidth={15}
          tension={1}
          zIndex={2}
        />
      </React.Fragment>
    );
  }
}

export default ColoredRect;
