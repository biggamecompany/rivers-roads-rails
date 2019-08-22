import React from "react";
import Konva from "konva";
import { Rect, Line } from "react-konva";

class ColoredRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "#FFFCF2" };
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
      // {lineXY ? <div> : null}
      <React.Fragment>
        <Rect
          x={square.x}
          y={square.y}
          width={square.len}
          height={square.len}
          fill={this.state.color}
          // shadowBlur={5}
        //   onClick={this.handleClick}
          onMouseover={this.handleMouseover}
          zIndex={1}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 30, square.len, lineXY.y + 30]}
          stroke={
            // this.state.color
            "#D64550"
		  }
		  strokeWidth={15}
          tension={1}
          zIndex={2}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 75, square.len, lineXY.y + 75]}
          stroke={
            // this.state.color
            "#60D394"
		  }
		  strokeWidth={15}
          tension={1}
          zIndex={2}
        />
        <Line
          x={lineXY.x}
          y={lineXY.y}
          points={[0, lineXY.y + 120, square.len, lineXY.y + 120]}
          stroke={
            // this.state.color
            "#23B5D3"
		  }
		  strokeWidth={15}
          tension={1}
          zIndex={2}
        />
      </React.Fragment>
    );
  }
}

export default ColoredRect;
