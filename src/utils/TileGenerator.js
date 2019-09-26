// generate all combinations of tiles and store them for random tile generation

import tilePatterns from "../constants/tilePatterns";

class TileGenerator {
  r() {
    return Math.round(Math.random());
  }
  generate() {
    // generator function to create tiles
    // see https://www.google.com/search?q=rivers+roads+and+rails&tbm=isch&tbs=rimg:Ca4np_1CR0A7LImDtzAtGiwtZeG72WiYkvkAN-jqX53suGybp7n1GK2hH3ZEie1azDA0zbH2PPvfpUGqnfjNOFhhYlaZxNpNgQRzlS4sCq5pSnfE_1h65fXZDOuaRM7BPUFqTuq1_1_15TFtbCUqEgntzAtGiwtZeBHksouu2sAPrSoSCW72WiYkvkANEeSyi67awA-tKhIJ-jqX53suGyYRvoY1MK4OFqMqEgnp7n1GK2hH3RG1VCD-GLfuXyoSCZEie1azDA0zEeFisIZEkr-pKhIJbH2PPvfpUGoReILX6Sg114MqEgmnfjNOFhhYlRGUDTAYrrguaCoSCaZxNpNgQRzlEeKAL5mXTYzSKhIJS4sCq5pSnfERtVQg_1hi37l8qEgk_1h65fXZDOuREWiCYDzX4suCoSCaRM7BPUFqTuEeSyi67awA-tKhIJq1_1_15TFtbCUReFeKxwcG8M0&tbo=u&sa=X&ved=2ahUKEwjDs_mknZfkAhUoZN8KHXo5C5IQrnZ6BAgBEBY&biw=1280&bih=666&dpr=1
    console.log("generating");
    var i = 0;

    while (i < 4095) {
      var newCombo = [
        [this.r(), this.r(), this.r()],
        [this.r(), this.r(), this.r()],
        [this.r(), this.r(), this.r()],
        [this.r(), this.r(), this.r()]
      ];
      var k = JSON.stringify(newCombo);
      if (!(k in tilePatterns.tiles)) {
        tilePatterns.tiles[k] = newCombo;
        i++;
        console.log("tile ", k, " added");
        console.log("number of tiles ", i, "");
      }
    }
    console.log("done", tilePatterns.tiles);
    console.log("tilePatterns.tiles:", Object.keys(tilePatterns.tiles).length);
  }
  getTileStatus() {
    var keyLen = Object.keys(tilePatterns.tiles).length;
    // status function to determine if we have tiles avaliable, and how many
    if (keyLen === 0) {
      console.log("No tiles in tilePatterns.tiles");
      console.log("Run TileGenerator.generate()");
    } else if (keyLen < 4095) {
      console.log("Not enough tiles in tilePatterns.tiles");
      console.log("Run TileGenerator.generate()");
    } else {
      console.log(
        "tilePatterns.json has " + keyLen + " different tile patterns in store"
      );
      console.log("No need to generate new tiles");
    }
  }
  get pick() {
    // random picker function that returns a random unique tile from json store
    var keys = Object.keys(tilePatterns.tiles);
    return tilePatterns.tiles[keys[(keys.length * Math.random()) << 0]];
  }
}

export default TileGenerator;
