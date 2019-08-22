// generate all combinations of tiles and store them for random tile generation

import tilePatterns from "../constants/tilePatterns";

class TileGenerator {
  generate() {
    // generator function to create tiles
    console.log("generating");
  }
  getTileStatus() {
    // status function to determine if we have tiles avaliable, and how many
    if (tilePatterns.tiles.length === 0) {
      console.log("No tiles in " + tilePatterns.tiles.length);
      console.log("Run generateTiles.generate()");
    } else {
      console.log(
        "tilePatterns.json has " +
          tilePatterns.tiles.length +
          " different tile patterns in store"
      );
      console.log("No need to generate new tiles");
    }
  }
  get pick() {
    // random picker function that returns a random unique tile from json store
    return tilePatterns.tiles[
      Math.floor(Math.random() * tilePatterns.tiles.length)
    ];
  }
}

export default TileGenerator;
