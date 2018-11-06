var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");

////////////////////////////////////////////////////////

var server = require("http").Server(app);
var io = require("socket.io")(server);

////////////////////////////////////////////////////////

var Grass = require("./modules/class.grass.js");
var GrassEaterMale = require("./modules/class.GrassEaterMale.js");
var GrassEaterFemale = require("./modules/class.GrassEaterFemale.js");
var PredatorMale = require("./modules/class.PredatorMale.js");
var PredatorFemale = require("./modules/class.PredatorFemale.js");
var Cool = require("./modules/class.cool.js");
var Tornado = require("./modules/class.tornado.js");
var Water = require("./modules/class.water.js");

////////////////////////////////////////////////////////

var grassArr = [];
var GrassEaterMaleArr = [];
var GrassEaterFemaleArr = [];
var PredatorMaleArr = [];
var PredatorFemaleArr = [];
var coolArr = [];
var tornadoArr = [];
var waterArr = [];

////////////////////////////////////////////////////////

var grassLifeArr = [0, 0];
var GrassEaterMaleLifeArr = [0, 0];
var GrassEaterFemaleLifeArr = [0, 0];
var PredatorMaleLifeArr = [0, 0];
var PredatorFemaleLifeArr = [0, 0];
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
      GrassEaterMaleArr.push(new GrassEaterMale(x, y, 2, matrix));
    }
    else if (matrix[y][x] == -2) {
      GrassEaterFemaleArr.push(new GrassEaterFemale(x, y, -2, matrix));
    }
    else if (matrix[y][x] == 3) {
      PredatorMaleArr.push(new PredatorMale(x, y, 3, matrix));
    }
    else if (matrix[y][x] == -3) {
      PredatorFemaleArr.push(new PredatorFemale(x, y, -3, matrix));
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

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

var frameRate = 5;
var drawTime = 1000 / frameRate;
var FrameCount = 0;

////////////////////////////////////////////////////////



io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);

  // genStatistics();

  var Interval = setInterval(function () {
    for (var i in grassArr) {
      grassArr[i].mul(grassArr, matrix, grassLifeArr);
    }
    for (var i in GrassEaterMaleArr) {
      GrassEaterMaleArr[i].eat(GrassEaterMaleArr, grassArr, matrix, grassLifeArr, GrassEaterMaleLifeArr);
    }
    for (var i in GrassEaterFemaleArr) {
      GrassEaterFemaleArr[i].eat(GrassEaterFemaleArr, grassArr, matrix, grassLifeArr, GrassEaterFemaleLifeArr);
    }
    for (var i in PredatorMaleArr) {
      PredatorMaleArr[i].eat(PredatorMaleArr, GrassEaterMaleArr, GrassEaterFemaleArr, matrix, GrassEaterMaleLifeArr, GrassEaterFemaleLifeArr, PredatorMaleLifeArr);
    }
    for (var i in PredatorFemaleArr) {
      PredatorFemaleArr[i].eat(PredatorFemaleArr, GrassEaterMaleArr, GrassEaterFemaleArr, matrix, GrassEaterMaleLifeArr, GrassEaterFemaleLifeArr, PredatorFemaleLifeArr);
    }
    for (var i in coolArr) {
      coolArr[i].eat(PredatorMaleArr, PredatorFemaleArr, matrix, PredatorMaleLifeArr, PredatorFemaleLifeArr);
    }
    for (var i in tornadoArr) {
      tornadoArr[i].eat(grassArr, GrassEaterMaleArr, GrassEaterFemaleArr, PredatorMaleArr, PredatorFemaleArr, matrix, grassLifeArr, GrassEaterMaleLifeArr, GrassEaterFemaleLifeArr, PredatorMaleLifeArr, PredatorFemaleLifeArr);
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
      // genStatistics();

      FrameCount = 0;
    }

  }, drawTime);

  ////////////////////////////////////////////////////////

  grassLifeArr[0] += grassArr.length;
  GrassEaterMaleLifeArr[0] += GrassEaterMaleArr.length;
  GrassEaterFemaleLifeArr[0] += GrassEaterFemaleArr.length;
  PredatorMaleLifeArr[0] += PredatorMaleArr.length;
  PredatorFemaleLifeArr[0] += PredatorFemaleArr.length;
  tornadoLifeArr[0] += tornadoArr.length;
  coolLifeArr[0] += coolArr.length;
  waterLifeArr[0] += waterArr.length;

  ////////////////////////////////////////////////////////

  // function genStatistics() {
  //   var Statistics = {
  //     "Grass": grassArr.length, "Grass-Alive": grassLifeArr[0], "Grass-Dead": grassLifeArr[1],
  //     "GrassEaterMale": GrassEaterMaleArr.length, "GrassEaterMale-Alive": GrassEaterMaleLifeArr[0], "GrassEaterMale-Dead": GrassEaterMaleLifeArr[1],
  //     "GrassEaterFemale": GrassEaterFemaleArr.length, "GrassEaterFemale-Alive": GrassEaterFemaleLifeArr[0], "GrassEaterFemale-Dead": GrassEaterFemaleLifeArr[1],
  //     "Predator": PredatorArr.length, "Predator-Alive": PredatorLifeArr[0], "Predator-Dead": PredatorLifeArr[1],
  //     "Tornado": tornadoArr.length, "Tornado-Alive": tornadoLifeArr[0], "Tornado-Dead": tornadoLifeArr[1],
  //     "Cool": coolArr.length, "Cool-Alive": coolLifeArr[0], "Cool-Dead": coolLifeArr[1],
  //     "Water": waterArr.length, "Water-Alive": waterLifeArr[0], "Water-Dead": waterLifeArr[1],
  //   }
  //   socket.emit("Right Statistics", Statistics);
  //   main(Statistics);
  // }

  // function main(stat) {
  //   myJSON = JSON.stringify(stat);
  //   fs.writeFileSync("Statistics.json", myJSON)
  // }
});