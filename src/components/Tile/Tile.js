import React from "react";
import { Rect, Line, Group, Arc } from "react-konva";

class Tile extends React.Component {
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
      },
      rotate: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => {
    if (!this.props.clickable) {
      console.log("this.state.rotate:", this.state.rotate);
      if (this.state.rotate === 270) {
        this.setState({ rotate: 0 });
      } else {
        this.setState({ rotate: this.state.rotate + 90 });
      }
    }
  };
  render() {
    const {
      position = { x: 0, y: 0 },
      len = 150,
      clickable = false,
      options = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    } = this.props;
    const horizontalLine = props => (
      <Line
        x={0}
        y={0}
        points={[0 + 2, props.startPoint, len - 2, props.startPoint]}
        stroke={props.color}
        strokeWidth={10}
        tension={1}
      />
    );
    const leftArc = props => (
      <Arc
        x={2}
        y={2}
        innerRadius={props.startPoint - 2}
        outerRadius={props.startPoint - 2}
        angle={90}
        stroke={props.color}
        fill={props.color}
        strokeWidth={10}
        tension={1}
      />
    );
    return (
      <Group
        x={position.x}
        y={position.y}
        rotation={this.state.rotate}
        onClick={() => this.handleClick()}
        offsetX={len / 2}
        offsetY={len / 2}
      >
        <Rect
          x={0}
          y={0}
          width={len}
          height={len}
          fill={this.state.colors.white}
          cornerRadius={5}
          stroke={"white"}
          strokeWidth={4}
        />
        {clickable
          ? null
          : horizontalLine({ color: this.state.colors.red, startPoint: 50 })}
        {clickable
          ? null
          : horizontalLine({
              color: this.state.colors.black,
              startPoint: 75
            })}
        {clickable
          ? null
          : horizontalLine({
              color: this.state.colors.blue,
              startPoint: 100
            })}
        {clickable
          ? null
          : leftArc({ color: this.state.colors.green, startPoint: 50 })}
        {clickable
          ? null
          : leftArc({ color: this.state.colors.green, startPoint: 75 })}
        {clickable
          ? null
          : leftArc({ color: this.state.colors.green, startPoint: 100 })}
        {/* {verticalLine({ color: this.state.colors.red, startPoint: 30 })} */}
        {/* {verticalLine({ color: this.state.colors.green, startPoint: 75 })} */}
        {/* {verticalLine({ color: this.state.colors.blue, startPoint: 120 })} */}
      </Group>
    );
  }
}

export default Tile;
