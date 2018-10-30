var matrix;
var socket;
var side = 10;

var stat;

function setup() {
    frameRate(0);
    var socket = io.connect();
    socket.on("get matrix", function (mtx) {
        matrix = mtx;
        createCanvas(matrix[0].length * side + 500, matrix.length * side);
        noLoop();

        socket.on("redraw", function (mtx) {
            matrix = mtx;
            redraw();
        })

        socket.on("Right Statistics", function(Statistics){
            stat = Statistics;
        })
    });

    background('#acacac');

}
var start = false;

function draw() {
    background('#acacac');
    var margin = 60;
    var N = 0;
    var Nx = 420;
    for(var i in stat){
        textSize(15);
        start = true;

        N++;
        if(N != 2 && N!= 3){
            text(i + ":" + stat[i], Nx, margin);
        }
        else{
            fill(50);
            text(stat[i], Nx, margin);
        }
        Nx += 200;
        if (N == 3) {
            Nx = 420
            N = 0
            margin += 40;
        }
    }

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(0, 255, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#4A3820');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('#ffaa00');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == -2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('white');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('gray');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('#42c5f4');
                rect(x * side, y * side, side, side);
            }
        }
    }


    fill("black")
    textSize(20)
    text("Game Of Life", 600, 30)
}