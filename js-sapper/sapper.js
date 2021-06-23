class Sapper {
    constructor(size) {
        this.createCell(size);
        this.drawMines(size, this.generateMines(size));
    }

    createCell(size) { /* метод -createCell- создает поле с ячейками */
        let count = size * size;
        const $field = document.querySelector(".field");
        $field.style.width = size * 34 + 'px';
        for (let i = 0; i < count; i++) {
            const $cell = document.createElement('div');
            $cell.classList.add('cell');
            const $field = document.querySelector(".field");
            $field.appendChild($cell);
        }
    }

    generateMines(size) { /* метод -generateMines- генерирует матрицу рандомных целых чисел в интервале [0, 1]*/
        let countMines;
        if (size === 9)
            countMines = 10;
        else if (size === 16)
            countMines = 40;
        else if (size === 22)
            countMines = 100;

        let matrix = new Array(size);

        for (let i = 0; i < size; i++) {
            matrix[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                matrix[i][j] = 0;
            }
        }
        let count = countMines;
        for (let q = 0, i = 0, j = 0; q < count;) {
            i = Math.floor(Math.random() * size);
            j = Math.floor(Math.random() * size);
            if (matrix[i][j] !== true) {
                q++;
                matrix[i][j] = true;
            }
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j] !== true) {
                    /* проверка по углам матрицы */
                    if (i === 0 && j === 0) {
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                    } else if (i === 0 && j === (size - 1)) {
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                    } else if (i === (size - 1) && j === 0) {
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                    } else if (i === (size - 1) && j === (size - 1)) {
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                    }
                    /* проверка на границы сторон */
                    else if (i === 0) {
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                    } else if (i === (size - 1)) {
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                    } else if (j === 0) {
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                    } else if (j === (size - 1)) {
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                    } else {
                        if (matrix[i - 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j - 1] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j] === true)
                            matrix[i][j]++;
                        if (matrix[i + 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j + 1] === true)
                            matrix[i][j]++;
                        if (matrix[i - 1][j] === true)
                            matrix[i][j]++;
                    }


                }
            }
        }

        return matrix;
    }

    drawMines(size, matrix) { /* отрисовка мин */
        const $array_cells = document.querySelectorAll(".cell");
        for (let i = 0, index = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                $array_cells[index].value = matrix[i][j];
                index++;
            }
        }

        for (let i = 0; i < $array_cells.length; i++) {

            $array_cells[i].oncontextmenu = function () {
                $array_cells[i].classList.add("checkbox_img");
            }
            $array_cells[i].onclick = function () {
                if ($array_cells[i].value === true) {
                    onclickMine();
                } else {
                    onclickEmptyCell($array_cells, i);
                }
            }

        }

        function onclickMine() {
            for (let i = 0; i < $array_cells.length; i++) {
                if ($array_cells[i].value === true) {
                    $array_cells[i].classList.add("bomb_img");
                }

            }
            document.getElementsByClassName("field")[0].style.pointerEvents = "none";
        }

        function onclickEmptyCell($elem, index) {

            if ($elem[index].value > 0) {
                $elem[index].innerHTML = $elem[index].value;
            } else {
                let matrix = new Array(Math.sqrt($elem.length));
                let clickI = null;
                let clickJ = null;
                for (let i = 0, j = 0, q = 0; i < Math.sqrt($elem.length); i++) {
                    matrix[i] = new Array(Math.sqrt($elem.length));
                    for (j = 0; j < Math.sqrt($elem.length); j++) {
                        matrix[i][j] = $elem[q];
                        q++;
                        if ($elem[index] === matrix[i][j]) {
                            clickI = i;
                            clickJ = j;
                        }
                    }
                }



                regexLeft(clickJ);
                regexRight(clickJ);
                regexUp(clickI);
                regexDown(clickI);
                regexLeftUp(clickI, clickJ);
                regexLeftDown(clickI, clickJ);
                regexRightUp(clickI, clickJ);
                regexRightDown(clickI, clickJ);

                function regexLeft(_j) {
                    if (!(_j < 0)) {
                        if (matrix[clickI][_j].value === 0) {
                            matrix[clickI][_j].innerHTML = matrix[clickI][_j].value;
                            _j--;
                            regexLeft(_j);

                        }
                    }
                }

                function regexRight(_j) {
                    if (_j < Math.sqrt($elem.length)) {
                        if (matrix[clickI][_j].value === 0) {
                            matrix[clickI][_j].innerHTML = matrix[clickI][_j].value;
                            _j++;
                            regexRight(_j);
                        }
                    }
                }

                function regexUp(_i) {
                    if (!(_i < 0)) {
                        if (matrix[_i][clickJ].value === 0) {
                            matrix[_i][clickJ].innerHTML = matrix[_i][clickJ].value;
                            _i--;
                            regexUp(_i);
                        }
                    }
                }

                function regexDown(_i) {
                    if (_i < Math.sqrt($elem.length)) {
                        if (matrix[_i][clickJ].value === 0) {
                            matrix[_i][clickJ].innerHTML = matrix[_i][clickJ].value;
                            _i++;
                            regexDown(_i);
                        }
                    }
                }

                function regexLeftUp(_i, _j) {
                    if(!(_j < 0) && !(_i < 0)) {
                        if (matrix[_i][_j].value === 0) {
                            matrix[_i][_j].innerHTML = matrix[_i][_j].value;
                            _j--; _i--;
                            regexLeftUp(_i, _j);
                        }
                    }
                }

                function regexLeftDown(_i, _j) {
                    if(!(_j < 0) && (_i < Math.sqrt($elem.length))) {
                        if (matrix[_i][_j].value === 0) {
                            matrix[_i][_j].innerHTML = matrix[_i][_j].value;
                            _j--; _i++;
                            regexLeftDown(_i, _j);
                        }
                    }
                }

                function regexRightUp(_i, _j) {
                    if((_j < Math.sqrt($elem.length)) && !(_i < 0)) {
                        if (matrix[_i][_j].value === 0) {
                            matrix[_i][_j].innerHTML = matrix[_i][_j].value;
                            _j++; _i--;
                            regexRightUp(_i, _j);
                        }
                    }
                }

                function regexRightDown(_i, _j) {
                    if((_j < Math.sqrt($elem.length)) && (_i < Math.sqrt($elem.length))) {
                        if (matrix[_i][_j].value === 0) {
                            matrix[_i][_j].innerHTML = matrix[_i][_j].value;
                            _j++; _i++;
                            regexRightDown(_i, _j);
                        }
                    }
                }

                for (let i = 0, j = 0, q = 0; i < Math.sqrt($elem.length); i++) {
                    for (j = 0; j < Math.sqrt($elem.length); j++) {
                        if(matrix[i][j].innerHTML === '0'){
                            matrix[i][j].style.backgroundColor = "green"
                            console.log(matrix[i][j].style.backgroundColor);
                        }


                    }
                }



            }
        }


    }
}

function createSapper(count) {
    new Sapper(count);
}

createSapper(9);