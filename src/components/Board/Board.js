import React from "react";
import { Stage, Layer, Text } from "react-konva";
import { map, addIndex } from "ramda";

import "./Board.css";
import Tile from "../Tile/Tile";
import TileGenerator from "../../utils/TileGenerator";

// todo:
// fix game board to canvas
// make game board size infinite
// allow users to click on any tile to rotate the tile
// add "grab bag" to pull new random piece from
// add "user tiles" section to store tiles that have not been placed yet
// allow users to drag tile from "grab bag "or "user tiles" to place on any empty slot
// allow user to drag already placed tile from one slot to another slot, while maintaining board and tile state (rotated, etc)
// count points in sidebar or at top
// allow users to save their game and come back later
// reset board button
// zoom in and out of board with scroll
// click on non-tile to drag around the board

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileGenerator: new TileGenerator(),
      x: 0,
      y: 0,
      cursor: {
        x: null,
        y: null
      },
      boardMatrix: [
        {
          // first empty non clickable tile at 0,0
          x: 0,
          y: 0,
          clickable: false,
          options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
          // second empty clickable tile at 1,0
          x: 1,
          y: 0,
          clickable: true,
          options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
        },
        {
          // third clickable full tile at 1,1
          x: 1,
          y: 1,
          clickable: true,
          options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
        }
      ]
      //   {x: 0, y: 0, clickable: false, options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]] }, // non-clickable empty tile at 0,0
      //   {x: 3, y: 1, clickable: true, options: [[0, 1, 1], [0, 0, 0], [0, 1, 1], [0, 0, 0]] }, // clickable river and road straight tile at 3,1
    };
    this.initBoard = this.initBoard.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.saveBoardState = this.saveBoardState.bind(this);
    this.restartBoard = this.restartBoard.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
    this.loadNewTile = this.loadNewTile.bind(this);
  }

  initBoard() {
    //   start board
  }

  checkBoard() {
    //   confirm board is valid
    //
    // if (isEmpty(this.board)) {
    //   console.log("Starting new empty board");
    // } else {
    //   console.log("Starting game from input board");
    // }
  }

  updateBoard() {
    //   check if boardMatrix has non-clickable empty tiles, clickable empty tiles, non-clickable full tiles, and clickable full tiles
    //
    // for (const tile in this.state.boardMatrix) {
    // pad all edges with non-clickable empty tiles,
    // all clickable empty tiles should go up to 1 tile away from the edge
    //  all full tiles should go up to 2 tiles away from the edge
    // }
  }

  saveBoardState() {
    //   save board state to boardState.json
  }

  restartBoard() {
    //   restarts board
  }

  loadBoard() {
    //   load previous board state
  }

  loadNewTile() {
    //   loads new tile from tilePatterns.json to store in boardState
    this.state.tileGenerator.pick();
  }

  handleMouseMove = e => {
    var stage = this.stageRef.getStage();
    this.setState({
      cursor: stage.getPointerPosition()
    });
  };

  componentDidMount() {
    this.state.tileGenerator.getTileStatus();
  }

  render() {
    const mapBoard = addIndex(map());
    const mappedBoard = mapBoard((val, idx) => {
      console.log(idx);
      return (
        <Tile
          position={{ x: val.x * 150, y: val.y * 150 }}
          clickable={val.clickable}
          options={val.options}
        />
      );
    });
    const text = `Cursor position is: ${this.state.cursor.x}, ${
      this.state.cursor.y
    }`;
    return (
      // any tiles that have game pieces on them, let there be adjacent tile slots
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={this.handleMouseMove}
        ref={ref => {
          this.stageRef = ref;
        }}
        offsetX={75}
        offsetY={75}
      >
        <Layer>
          {mappedBoard}
          {/* fix mapped board??? */}

          <Tile
            position={{ x: 0, y: 0 }}
            clickable={false}
            options={[[0, 1, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 150, y: 0 }}
            clickable={false}
            options={[[1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 450, y: 450 }}
            clickable={false}
            options={[[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 0, y: 150 }}
            clickable={false}
            options={[[0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 300, y: 300 }}
            clickable={false}
            options={[[1, 1, 0], [0, 0, 0], [1, 1, 0], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 300, y: 450 }}
            clickable={false}
            options={[[1, 0, 1], [0, 0, 0], [1, 0, 1], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 150, y: 150 }}
            clickable={false}
            options={[[0, 1, 1], [0, 0, 0], [0, 1, 1], [0, 0, 0]]}
          />
          <Tile
            position={{ x: 300, y: 150 }}
            clickable={false}
            options={[[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]}
          />
          <Tile position={{ x: 300, y: 0 }} clickable={true} />
          <Tile position={{ x: 0, y: 300 }} clickable={true} />
          <Tile position={{ x: 150, y: 300 }} clickable={true} />
          <Tile position={{ x: 450, y: 150 }} clickable={true} />
          <Tile position={{ x: 450, y: 300 }} clickable={true} />
          <Tile position={{ x: 600, y: 450 }} clickable={true} />
          <Tile position={{ x: 600, y: 600 }} clickable={true} />
          <Tile position={{ x: 450, y: 600 }} clickable={true} />
          <Text text={text} x={200} y={200} fontSize={20} />
        </Layer>
      </Stage>
    );
  }
}

export default Board;
