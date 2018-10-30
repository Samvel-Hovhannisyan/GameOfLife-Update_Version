module.exports = class XotakerEater {
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
    chooseCell(character1, character2, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    random(Arr){
        var Item = Arr[Math.floor(Math.random() * Arr.length)];
        return Item;
    }
    move(xotakerEaterArr, matrix) {
        var fundCords = this.chooseCell(0, 1, matrix);
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
            this.die(xotakerEaterArr, matrix, xotakerEaterLifeArr);
        }
    }

    die(xotakerEaterArr, matrix, xotakerEaterLifeArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in xotakerEaterArr) {
            if (this.x == xotakerEaterArr[i].x && this.y == xotakerEaterArr[i].y) {
                xotakerEaterArr.splice(i, 1);
            }
        }
        xotakerEaterLifeArr[1]++;
    }

    eat(xotakerEaterArr, grassEaterArr, matrix, grassEaterLifeArr, xotakerEaterLifeArr) {
        var fundCords = this.chooseCell(-1, 2, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    grassEaterLifeArr[1]++;
                }
            }
            this.x = x;
            this.y = y;

            this.multiply++;
            this.energy++;

            if (this.multiply == 10) {
                this.mul(xotakerEaterArr, matrix, xotakerEaterLifeArr)
                this.multiply = 0;
            }
        }
        else {
            this.move(xotakerEaterArr, matrix);
            this.energy--;
            if (this.energy < 1) {
                this.die(xotakerEaterArr, matrix, xotakerEaterLifeArr);
            }
        }
    }
    mul(xotakerEaterArr, matrix, xotakerEaterLifeArr) {
        var emptyCells = this.chooseCell(0, 1, matrix);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var Newxotakereat = new XotakerEater(newX, newY, this.index);
            xotakerEaterArr.push(Newxotakereat);

            xotakerEaterLifeArr[0]++;
        }
    }
}
