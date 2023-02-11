var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
//    board = [
//       [0,0,0,0],
//        [0,0,0,0],
//        [0,0,0,0],
//        [0,0,0,0]
//    ];

    board = [
        [2,2,2,2],
        [2,2,2,2],
        [4,4,8,8],
        [4,4,8,8]
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
    }
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