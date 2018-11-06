module.exports = class Tornado {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y]
        ];
    }
    chooseCell(character1, character2, character3, character4, character5, character6, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4 || matrix[y][x] == character5 || matrix[y][x] == character6) {
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

    move(matrix) {
        var fundCords = this.chooseCell(0, 1, 2, -2, 3, -3, matrix);
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
            else if (matrix[y][x] == 2) {
                matrix[this.y][this.x] = 2;
            }
            else if (matrix[y][x] == -2) {
                matrix[this.y][this.x] = -2;
            }
            else if (matrix[y][x] == 3) {
                matrix[this.y][this.x] = 3;
            }
            else if (matrix[y][x] == -3) {
                matrix[this.y][this.x] = -3;
            }

            matrix[y][x] = 5;


            this.x = x;
            this.y = y;
        }
    }

    eat(grassArr, GrassEaterMaleArr, GrassEaterFemaleArr, PredatorMaleArr, PredatorFemaleArr, matrix, grassLifeArr, GrassEaterMaleLifeArr, GrassEaterFemaleLifeArr, PredatorMaleLifeArr, PredatorFemaleLifeArr) {
        var fundCords = this.chooseCell(99, 1, 2, -2, 3, -3, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        grassLifeArr[1]++;
                    }
                }
            }
            else if (matrix[y][x] == 2) {
                for (var i in GrassEaterMaleArr) {
                    if (x == GrassEaterMaleArr[i].x && y == GrassEaterMaleArr[i].y) {
                        GrassEaterMaleArr.splice(i, 1);
                        GrassEaterMaleLifeArr[1]++;
                    }
                }
            }
            else if (matrix[y][x] == -2) {
                for (var i in GrassEaterFemaleArr) {
                    if (x == GrassEaterFemaleArr[i].x && y == GrassEaterFemaleArr[i].y) {
                        GrassEaterFemaleArr.splice(i, 1);
                        GrassEaterFemaleLifeArr[1]++;
                    }
                }
            }
            else if (matrix[y][x] == 3) {
                for (var i in PredatorMaleArr) {
                    if (x == PredatorMaleArr[i].x && y == PredatorMaleArr[i].y) {
                        PredatorMaleArr.splice(i, 1);
                        PredatorMaleLifeArr[1]++;
                    }
                }
            }
            else if (matrix[y][x] == -3) {
                for (var i in PredatorFemaleArr) {
                    if (x == PredatorFemaleArr[i].x && y == PredatorFemaleArr[i].y) {
                        PredatorFemaleArr.splice(i, 1);
                        PredatorFemaleLifeArr[1]++;
                    }
                }
            }

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.multiply == 10) {
                this.multiply = 0;
            }
        }
        else {
            this.move(matrix);
        }
    }
}
