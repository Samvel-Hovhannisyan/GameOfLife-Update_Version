module.exports = class Water {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
        ];
    }
    chooseCell(character1, character2, character3, character4, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4) {
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

    die(waterArr, matrix, waterLifeArr) {
        waterArr.length = 0;
        var n = matrix.length;

        for (var i in matrix[4]) { matrix[4][i] = 0; waterLifeArr[1]++; }

        matrix[4][n - 1] = 6;
        waterArr.push(new Water(n - 1, 4, 6));


    }

    mul(waterArr, matrix, waterLifeArr) {
        var newCell = this.random(this.chooseCell(0, 1, 2, 3, matrix));
        if (newCell) {
            var NewWater = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(NewWater);
            matrix[newCell[1]][newCell[0]] = 6;

            waterLifeArr[0]++;
        }
    }
}