module.exports = class Cool {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.hincel = 0;
        this.index = index;
    }

    random(Arr) {
        var Item = Arr[Math.floor(Math.random() * Arr.length)];
        return Item;
    }

    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
        ];
    }

    chooseCell(character1, character2, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }

    eat(PredatorMaleArr, PredatorFemaleArr, matrix, PredatorMaleLifeArr, PredatorFemaleLifeArr) {
        var emptyCellsx = this.chooseCell(3, -3, matrix);
        var a = [];
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = this.random(a);
        if (newCellxy) {
            this.energy += 8;
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            matrix[newY][newX] = 0
            for (var i in PredatorMaleArr) {
                if (newX == PredatorMaleArr[i].x && newY == PredatorMaleArr[i].y) {
                    PredatorMaleArr.splice(i, 1);
                    PredatorMaleLifeArr[1]++;
                    break;
                }
            }
            for (var i in PredatorFemaleArr) {
                if (newX == PredatorFemaleArr[i].x && newY == PredatorFemaleArr[i].y) {
                    PredatorFemaleArr.splice(i, 1);
                    PredatorFemaleLifeArr[1]++;
                    break;
                }
            }
        }
    }
}