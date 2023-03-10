var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
       [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString(); 
            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile )
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++){
            if (board[i][j] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        // random rows and colums
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile,num) {
    tile.innerText = "";
    tile.classList.value = ""; // Clear de the class List
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    } else if (e.code == "ArrowRight"){
        slideRight();
        setTwo();
    } else if (e.code == "ArrowUp"){
        slideUp();
        setTwo();
    } else if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0)
}

function slide(row){
    row = filterZero(row);

    for (let i = 0; i < row.length-1; i++) {
        // check every 2
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);


    // add zeros
    while (row.length < columns){
        row.push(0);
    }
    return row;

}

function slideLeft(){
    for (let i = 0; i < rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;

        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for (let i = 0; i < rows; i++){
        let row = board[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[i] = row;

        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for (let i = 0; i < columns; i++){
        let row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        row = slide(row);
        board[0][i] = row[0];
        board[1][i] = row[1];
        board[2][i] = row[2];
        board[3][i] = row[3];

        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(j.toString() + "-" + i.toString());
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for (let i = 0; i < columns; i++){
        let row = [board[3][i], board[2][i], board[1][i], board[0][i]];
        row = slide(row);
        board[3][i] = row[0];
        board[2][i] = row[1];
        board[1][i] = row[2];
        board[0][i] = row[3];

        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(j.toString() + "-" + i.toString());
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}