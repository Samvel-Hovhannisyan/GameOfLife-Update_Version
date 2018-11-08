var Parent = require("./class.parent.js");
module.exports = class GrassEaterFemale extends Parent {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 25;
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr) {
        var fundCords = this.chooseCell(0, matrix);
        var cord = this.random(fundCords);

        var found = this.chooseCell(2, matrix);
        var cell = this.random(found);

        if (cell){
            this.mul(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr);
        }

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = -2;
            matrix[this.y][this.x] = 0;
            this.energy--;
            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr);
        }
    }
    die(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in GrassEaterFemaleArr) {
            if (this.x == GrassEaterFemaleArr[i].x && this.y == GrassEaterFemaleArr[i].y) {
                GrassEaterFemaleArr.splice(i, 1);
                GrassEaterFemaleLifeArr[1]++;
            }
        }
    }
    eat(GrassEaterFemaleArr, grassArr, matrix, grassLifeArr, GrassEaterFemaleLifeArr) {
        var fundCords = this.chooseCell(1, matrix);
        var cord = this.random(fundCords);

        var found = this.chooseCell(2, matrix);
        var cell = this.random(found);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = -2;
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

            if (this.energy < 5) {
                this.die(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr);
            }
            if (cell){
                this.mul(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr);
            }
        }
        else {
            this.move(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr);
            this.energy--;

        }
    }
    mul(GrassEaterFemaleArr, matrix, GrassEaterFemaleLifeArr) {
        var emptyCells = this.chooseCell(1, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var NewGrassEatFemale = new GrassEaterFemale(newX, newY, this.index);
            GrassEaterFemaleArr.push(NewGrassEatFemale);

            GrassEaterFemaleLifeArr[0]++;
        }
    }
}
