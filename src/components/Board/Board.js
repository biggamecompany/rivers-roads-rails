import React from "react";
import { Stage, Layer, Text } from "react-konva";
import { map, addIndex } from "ramda";

import "./Board.css";
import Tile from "../Tile/Tile";
import TileGenerator from "../../utils/TileGenerator";

// todo:
// add "grab bag" sidebar to pull new random piece from and to store tiles that have not been placed yet
// allow users to drag tile from "grab bag "or "user tiles" to place/drop on any empty slot
// fix game board areas to canvas
// ---------------------
// |                |  |
// |                |  |
// |   game board   |  | <- already chosen tiles (game rules say 7 tiles I think)
// |                |  |
// |                |__|
// |                |  | <- new tile pushed in from bottom of stack
// ---------------------
// make game board scrollable by clicking on non-tile to drag around the board
// make game board zoomable in and out
// allow users to click on any tile to rotate the tile
// allow user to drag already placed tile from one slot to another slot, while maintaining board and tile state (rotated, etc)
// count points in sidebar or at top
// allow users to save their game and come back later
// reset board button

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileGenerator: new TileGenerator(),
      tiles: [],
      x: 0,
      y: 0,
      cursor: {
        x: null,
        y: null
      },
      tileLen: 150,
      currentTile: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      boardCache: [
        [
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 0, 1], [0, 0, 0], [1, 0, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          }
        ],
        [
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: true,
            emptyTile: true,
            options: [[1, 0, 1], [0, 0, 0], [1, 0, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          }
        ],
        [
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 0]]
          },
          {
            clickable: true,
            emptyTile: true,
            options: [[0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 0]]
          },
          {
            clickable: true,
            emptyTile: false,
            options: [[1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0]]
          },
          {
            clickable: true,
            emptyTile: true,
            options: [[1, 0, 0], [1, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 0]]
          }
        ],
        [
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 1], [0, 0, 0], [0, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 1], [0, 0, 0], [0, 1, 1], [0, 0, 0]]
          },
          {
            clickable: true,
            emptyTile: true,
            options: [[1, 1, 0], [0, 0, 0], [1, 1, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          }
        ],
        [
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[1, 0, 1], [0, 0, 0], [1, 0, 1], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          },
          {
            clickable: false,
            emptyTile: true,
            options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          }
        ]
      ],
      boardMatrix: {
        //   index starts at 1, 0 is cut off by screen
        "1x1y": {
          // fourth clickable full tile at 1,1
          x: 1,
          y: 1,
          clickable: true,
          emptyTile: false,
          options: [[1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0]]
        },
        "1x2y": {
          // sixth clickable full tile at 1,2
          x: 1,
          y: 2,
          clickable: true,
          emptyTile: false,
          options: [[1, 0, 1], [0, 0, 0], [1, 0, 1], [0, 0, 0]]
        },
        "1x3y": {
          // second empty clickable tile at 1,0
          x: 1,
          y: 3,
          clickable: true,
          emptyTile: false,
          options: [[0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
        },
        "2x1y": {
          // eighth clickable full tile at 2,1
          x: 2,
          y: 1,
          clickable: true,
          emptyTile: false,
          options: [[0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 0]]
        },
        "2x2y": {
          // seventh clickable full tile at 2,2
          x: 2,
          y: 2,
          clickable: true,
          emptyTile: false,
          options: [[1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0]]
        },
        "2x3y": {
          // ninth clickable full tile at 2,0
          x: 2,
          y: 3,
          clickable: true,
          emptyTile: false,
          options: [[1, 0, 0], [1, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        "3x1y": {
          // third empty clickable tile at 0,1
          x: 3,
          y: 1,
          clickable: true,
          emptyTile: false,
          options: [[0, 1, 1], [0, 0, 0], [0, 1, 1], [0, 0, 0]]
        },
        "3x2y": {
          // fifth clickable full tile at 0,2
          x: 3,
          y: 2,
          clickable: true,
          emptyTile: false,
          options: [[1, 1, 0], [0, 0, 0], [1, 1, 0], [0, 0, 0]]
        },
        "3x3y": {
          // first empty non clickable tile at 0,0
          x: 3,
          y: 3,
          clickable: true,
          emptyTile: false,
          options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
      }
    };
    this.initBoard = this.initBoard.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.saveBoardState = this.saveBoardState.bind(this);
    this.restartBoard = this.restartBoard.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
    this.loadNewTile = this.loadNewTile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
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
    // sort boardMatrix by x and y smallest
    // deep clone board for regenerating state

    // figure out math.matrix()
    let tempBoard = JSON.parse(JSON.stringify(this.state.boardCache));

    let padOptions = { top: false, left: false, bottom: false, right: false };

    for (let row = 0; row < tempBoard.length; row++) {
      //   console.log("checking board row", row);
      for (let col = 0; col < tempBoard[row].length; col++) {
        // console.log("checking board col", col);
        if (tempBoard[row][col].clickable && !tempBoard[row][col].emptyTile) {
          if (row === 0) {
            // too close to top edge, add row of non clickable to padding
            padOptions.top = true;
          } else if (row === tempBoard.length - 1) {
            // too close to bottom edge, add row of non clickable to padding
            padOptions.bottom = true;
          } else {
            // in between top and bottom edge
            if (
              tempBoard[row + 1][col].emptyTile &&
              !tempBoard[row + 1][col].clickable
            ) {
              // the adjacent tile below is now clickable
              tempBoard[row + 1][col].clickable = !tempBoard[row + 1][col]
                .clickable;
            }
            if (
              tempBoard[row - 1][col].emptyTile &&
              !tempBoard[row - 1][col].clickable
            ) {
              // the adjacent tile above is now clickable
              tempBoard[row - 1][col].clickable = !tempBoard[row - 1][col]
                .clickable;
            }
          }
          if (col === 0) {
            // too close to left edge, add col of non clickable to padding
            padOptions.left = true;
          } else if (col === tempBoard[row].length - 1) {
            // too close to right edge, add col of non clickable to padding
            padOptions.right = true;
          } else {
            // in between left and right edge
            if (
              tempBoard[row][col + 1].emptyTile &&
              !tempBoard[row][col + 1].clickable
            ) {
              // the adjacent tile right is now clickable
              tempBoard[row][col + 1].clickable = !tempBoard[row][col + 1]
                .clickable;
            }
            if (
              tempBoard[row][col - 1].emptyTile &&
              !tempBoard[row][col - 1].clickable
            ) {
              // the adjacent tile left is now clickable
              tempBoard[row][col - 1].clickable = !tempBoard[row][col - 1]
                .clickable;
            }
          }
        }
      }
    }
    if (padOptions.top) {
      tempBoard = [
        Array.from({ length: tempBoard[0].length }, (v, k) => {
          return {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          };
        }),
        ...tempBoard
      ];
    }
    if (padOptions.bottom) {
      tempBoard = [
        ...tempBoard,
        Array.from({ length: tempBoard[0].length }, (v, k) => {
          return {
            clickable: false,
            emptyTile: true,
            options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          };
        })
      ];
    }
    if (padOptions.right) {
      tempBoard = tempBoard.map(a => [
        {
          clickable: false,
          emptyTile: true,
          options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        ...a
      ]);
    }
    if (padOptions.left) {
      tempBoard = tempBoard.map(a => [
        ...a,
        {
          clickable: false,
          emptyTile: true,
          options: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
      ]);
    }
    this.setState({ boardCache: tempBoard });
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
    // return(null)
  }

  restartBoard() {
    //   restarts board
  }

  loadBoard() {
    //   load previous board state
  }

  loadNewTile() {
    //   loads new tile from tilePatterns.json to store in boardState
    // this.setState(prevState => ({
    //   tiles: [...prevState.tiles, this.state.tileGenerator.pick]
    // }));
    // console.log(this.state.tiles);
    this.setState({ currentTile: this.state.tileGenerator.pick });
    console.log(this.state.currentTile);
  }

  handleMouseMove = e => {
    var stage = this.stageRef.getStage();
    this.setState({
      cursor: stage.getPointerPosition()
    });
  };

  handleClick = e => {
    // console.log("handle click function");
    this.checkBoard();
    this.loadNewTile();
  };

  componentDidMount() {
    this.state.tileGenerator.getTileStatus();
    this.checkBoard();
  }

  render() {
    // const { window = { h: 0, w: 0 } } = this.props;
    const mapIdx = addIndex(map());
    const mappedBoard = mapIdx((r, i) => {
      const mappedRows = mapIdx((c, j) => {
        return (
          <Tile
            key={`i${i}j${j}`}
            position={{
              x: (i + 1) * this.state.tileLen,
              y: (j + 1) * this.state.tileLen
            }}
            emptyTile={c.emptyTile}
            clickable={c.clickable}
            options={c.options}
            len={this.state.tileLen}
          />
        );
      });
      return mappedRows(r);
    });

    // const text = `Cursor position is: ${this.state.cursor.x}, ${this.state.cursor.y}`;
    return (
      // any tiles that have game pieces on them, let there be adjacent tile slots
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
        ref={ref => {
          this.stageRef = ref;
        }}
        offsetX={75}
        offsetY={75}
      >
        <Layer>
          {mappedBoard(this.state.boardCache)}
          {/* <Text text={text} x={200} y={200} fontSize={20} /> */}
          {/* <Tile
            key={`i11`}
            position={{
              x: this.state.tileLen,
              y: this.state.tileLen
            }}
            emptyTile={false}
            clickable={true}
            options={[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]}
            len={this.state.tileLen}
          /> */}
        </Layer>
      </Stage>
    );
  }
}

export default Board;
