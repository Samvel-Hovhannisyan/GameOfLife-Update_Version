var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");

////////////////////////////////////////////////////////

var server = require("http").Server(app);
var io = require("socket.io")(server);

////////////////////////////////////////////////////////

var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.grasseater.js");
var XotakerEater = require("./modules/class.xotakereater.js");
var Cool = require("./modules/class.cool.js");
var Tornado = require("./modules/class.tornado.js");
var Water = require("./modules/class.water.js");

////////////////////////////////////////////////////////

var grassArr = [];
var grassEaterArr = [];
var xotakerEaterArr = [];
var coolArr = [];
var tornadoArr = [];
var waterArr = [];

////////////////////////////////////////////////////////

var grassLifeArr = [0, 0];
var grassEaterLifeArr = [0, 0];
var xotakerEaterLifeArr = [0, 0];
var tornadoLifeArr = [0, 0];
var coolLifeArr = [0, 0];
var waterLifeArr = [0, 0];

////////////////////////////////////////////////////////

var matrix = require('./modules/matrix.js')();

////////////////////////////////////////////////////////

var n = matrix.length;

////////////////////////////////////////////////////////

for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      grassArr.push(new Grass(x, y, 1, matrix));
    }
    else if (matrix[y][x] == 2) {
      grassEaterArr.push(new GrassEater(x, y, 2, matrix));
    }
    else if (matrix[y][x] == 3) {
      xotakerEaterArr.push(new XotakerEater(x, y, 3, matrix));
    }
    else if (matrix[y][x] == 4) {
      coolArr.push(new Cool(x, y, 4, matrix));
    }
    else if (matrix[y][x] == 5) {
      tornadoArr.push(new Tornado(x, y, 5, matrix));
    }
    else if (matrix[y][x] == 6) {
      waterArr.push(new Water(x, y, 6, matrix));
    }
  }
}

////////////////////////////////////////////////////////

grassLifeArr[0] += grassArr.length;
grassEaterLifeArr[0] += grassEaterArr.length;
xotakerEaterLifeArr[0] += xotakerEaterArr.length;
tornadoLifeArr[0] += tornadoArr.length;
coolLifeArr[0] += coolArr.length;
waterLifeArr[0] += waterArr.length;

////////////////////////////////////////////////////////

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

var frameRate = 5;
var drawTime = 1000 / frameRate;
var FrameCount = 0;

/////////////////////////////////////////////////////////



io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);

  genStatistics();

  var Interval = setInterval(function () {
    for (var i in grassArr) {
      grassArr[i].mul(grassArr, matrix, grassLifeArr);
    }
    for (var i in grassEaterArr) {
      grassEaterArr[i].eat(grassEaterArr, grassArr, matrix, grassLifeArr, grassEaterLifeArr);
    }
    for (var i in xotakerEaterArr) {
      xotakerEaterArr[i].eat(xotakerEaterArr, grassEaterArr, matrix, grassEaterLifeArr, xotakerEaterLifeArr);
    }
    for (var i in coolArr) {
      coolArr[i].eat(xotakerEaterArr, matrix, xotakerEaterLifeArr);
    }
    for (var i in tornadoArr) {
      tornadoArr[i].eat(tornadoArr, grassArr, grassEaterArr, xotakerEaterArr, matrix, grassLifeArr, grassEaterLifeArr, xotakerEaterLifeArr);
    }
    for (var i in waterArr) {
      waterArr[i].mul(waterArr, matrix, waterLifeArr);
      if (waterArr.length >= n) {
        waterArr[i].die(waterArr, matrix, waterLifeArr);
        break;
      }
    }

    ////////////////////////////////////////////////////////

    socket.emit("redraw", matrix);

    FrameCount++;
    if (FrameCount >= 60) {
      genStatistics();

      FrameCount = 0;
    }

  }, drawTime);

  function genStatistics() {
    var Statistics = {
      "Grass": grassArr.length, "Grass-Alive": grassLifeArr[0], "Grass-Dead": grassLifeArr[1],
      "GrassEater": grassEaterArr.length, "GrassEater-Alive": grassEaterLifeArr[0], "GrassEater-Dead": grassEaterLifeArr[1],
      "XotakerEater": xotakerEaterArr.length, "XotakerEater-Alive": xotakerEaterLifeArr[0], "XotakerEater-Dead": xotakerEaterLifeArr[1],
      "Tornado": tornadoArr.length, "Tornado-Alive": tornadoLifeArr[0], "Tornado-Dead": tornadoLifeArr[1],
      "Cool": coolArr.length, "Cool-Alive": coolLifeArr[0], "Cool-Dead": coolLifeArr[1],
      "Water": waterArr.length, "Water-Alive": waterLifeArr[0], "Water-Dead": waterLifeArr[1],
    }
    socket.emit("Right Statistics", Statistics);
    main(Statistics);
  }

  function main(stat) {
    myJSON = JSON.stringify(stat);
    fs.writeFileSync("Statistics.json", myJSON)
  }
});