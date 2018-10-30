var Parent = require("./class.parent.js");
module.exports = class GrassEater extends Parent {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(grassEaterArr, matrix, grassEaterLifeArr) {
        var fundCords = this.chooseCell(0, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.energy--;
            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die(grassEaterArr, matrix, grassEaterLifeArr);
        }
    }
    die(grassEaterArr, matrix, grassEaterLifeArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                grassEaterLifeArr[1]++;
            }
        }
    }
    eat(grassEaterArr, grassArr, matrix, grassLifeArr, grassEaterLifeArr) {
        var fundCords = this.chooseCell(1, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);

                    grassLifeArr[1]++;
                }
            }
            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            if (this.multiply == 7) {
                this.mul(grassEaterArr, matrix, grassEaterLifeArr)
                this.multiply = 0;
            }
            if (this.energy < 5) {
                this.die(grassEaterArr, matrix, grassEaterLifeArr);
            }
        }
        else {
            this.move(grassEaterArr, matrix, grassEaterLifeArr);
            this.energy--;

        }
    }
    mul(grassEaterArr, matrix, grassEaterLifeArr) {
        var emptyCells = this.chooseCell(1, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var NewGrasseat = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(NewGrasseat);

            grassEaterLifeArr[0]++;
        }
    }
}
