var Parent = require("./class.parent.js");
module.exports = class GrassEaterMale extends Parent {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(GrassEaterMaleArr, matrix, GrassEaterMaleLifeArr) {
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
            this.die(GrassEaterMaleArr, matrix, GrassEaterMaleLifeArr);
        }
    }
    die(GrassEaterMaleArr, matrix, GrassEaterMaleLifeArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in GrassEaterMaleArr) {
            if (this.x == GrassEaterMaleArr[i].x && this.y == GrassEaterMaleArr[i].y) {
                GrassEaterMaleArr.splice(i, 1);
                GrassEaterMaleLifeArr[1]++;
            }
        }
    }
    eat(GrassEaterMaleArr, grassArr, matrix, GrassEaterMaleLifeArr, grassLifeArr) {
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
                this.multiply = 0;
            }
            if (this.energy < 5) {
                this.die(GrassEaterMaleArr, matrix, GrassEaterMaleLifeArr);
            }
        }
        else {
            this.move(GrassEaterMaleArr, matrix, GrassEaterMaleLifeArr);
            this.energy--;

        }
    }
}
