module.exports = class PredatorMale {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 150;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character1, character2, character3, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    random(Arr) {
        var Item = Arr[Math.floor(Math.random() * Arr.length)];
        return Item;
    }
    move(PredatorMaleArr, matrix) {
        var fundCords = this.chooseCell(0, 1, 99, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }
            matrix[y][x] = 3;


            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die(PredatorMaleArr, matrix, PredatorMaleLifeArr);
        }
    }

    die(PredatorMaleArr, matrix, PredatorMaleLifeArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in PredatorMaleArr) {
            if (this.x == PredatorMaleArr[i].x && this.y == PredatorMaleArr[i].y) {
                PredatorMaleArr.splice(i, 1);
            }
        }
        PredatorMaleLifeArr[1]++;
    }

    eat(PredatorMaleArr, GrassEaterMaleArr, GrassEaterFemaleArr, matrix, GrassEaterMaleLifeArr, GrassEaterFemaleLifeArr, PredatorMaleLifeArr) {
        var fundCords = this.chooseCell(-1, 2, -2, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (var i in GrassEaterMaleArr) {
                if (x == GrassEaterMaleArr[i].x && y == GrassEaterMaleArr[i].y) {
                    GrassEaterMaleArr.splice(i, 1);
                    GrassEaterMaleLifeArr[1]++;
                }
            }
            for (var i in GrassEaterFemaleArr) {
                if (x == GrassEaterFemaleArr[i].x && y == GrassEaterFemaleArr[i].y) {
                    GrassEaterFemaleArr.splice(i, 1);
                    GrassEaterFemaleLifeArr[1]++;
                }
            }
            this.x = x;
            this.y = y;

            this.multiply++;
            this.energy++;

            if (this.multiply == 10) {
                this.mul(PredatorMaleArr, matrix, PredatorMaleLifeArr)
                this.multiply = 0;
            }
        }
        else {
            this.move(PredatorMaleArr, matrix);
            this.energy--;
            if (this.energy < 1) {
                this.die(PredatorMaleArr, matrix, PredatorMaleLifeArr);
            }
        }
    }
}