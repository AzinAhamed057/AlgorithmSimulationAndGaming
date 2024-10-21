const gridcontainer = document.querySelector(".grid-container");
const row_size=22;
const col_size=50;
let Grid = [];
let Direction = [];
const startnode = [15, 23];
let points = 0;
let special = false;


//Create Grid 
for (let i = 0; i < row_size; i++) {
    Grid[i] = [];
    Direction[i] = [];
    for (let j = 0; j < col_size; j++) {
        const gridElement = document.createElement('div');
        gridElement.className = 'grid';
        gridcontainer.appendChild(gridElement);
        Grid[i][j] = gridElement;
        Direction[i][j] = [0, 0];
    }
}
//Create Grid

// Cell check
function chk(row, col) {
    if (row < 0) {
        row = 0;
    }
    if (row == row_size) {
        row = row_size-1;
    }
    if (col < 0) {
        col = 0;
    }
    if (col == col_size) {
        col = col_size-1;
    }
    return [row, col];
}
//Cell check

//move node

document.addEventListener("keydown", moveStartNode);
let cur = startnode.slice();

function moveStartNode(event) {
    const key = event.key;
    let [row, col] = cur;
    if (key == " " && row > 0) {
        console.log(1);
        Grid[row - 1][col].classList.add("fire");
        if (Grid[row - 1][col].classList.contains("ghost") || Grid[row - 1][col].classList.contains("dragon") || Grid[row - 1][col].classList.contains("jet") || (Grid[row - 1][col].classList.contains("fire1") && Direction[row-1][col][0]===1)) {
            points++;
            Grid[row - 1][col].classList.remove("fire","fire1","dragon","jet","ghost");
            Direction[row - 1][col] = [0, 0];
            point_display();
            return;
        }
        Direction[row - 1][col] = [-1, 0];
        if (special && col!=0) {
            Grid[row - 1][col-1].classList.add("fire2");
            if (Grid[row - 1][col-1].classList.contains("ghost") || Grid[row - 1][col-1].classList.contains("dragon") || Grid[row - 1][col-1].classList.contains("jet") || (Grid[row - 1][col-1].classList.contains("fire1") && Direction[row-1][col-1][0]===1)) {
                points++;
                Grid[row - 1][col-1].classList.remove("fire2", "fire1", "ghost","dragon","jet");
                Direction[row - 1][col-1] = [0, 0];
                point_display();
                return;
            }
            Direction[row - 1][col-1] = [-1, -1];
        }
        if (special && col!=col_size-1) {
            Grid[row - 1][col+1].classList.add("fire2");
            if (Grid[row - 1][col+1].classList.contains("ghost") || Grid[row - 1][col+1].classList.contains("dragon") || Grid[row - 1][col+1].classList.contains("jet") || (Grid[row - 1][col+1].classList.contains("fire1") && Direction[row-1][col+1][0]===1)) {
                points++;
                Grid[row - 1][col+1].classList.remove("fire2","fire1","ghost","dragon","jet");
                Direction[row - 1][col+1] = [0, 0];
                point_display();
                return;
            }
            Direction[row - 1][col+1] = [-1, 1];
        }


        return;
    }
    if (key == "ArrowUp")
        row--;
    else if (key == "ArrowDown")
        row++;
    else if (key == "ArrowLeft")
        col--;
    else if (key == "ArrowRight")
        col++;
    [row, col] = chk(row, col);
    Grid[cur[0]][cur[1]].classList.remove("start");
    Grid[row][col].classList.add("start");
    cur = [row, col];
    if (Grid[row][col].classList.contains("ghost","fire1","dragon","jet")) {
        showgameoverbox();
        return;
    }
}

//Random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Random

//Maze
function Maze(i, who, k) {
    if (k == 0) {
        let luck = getRandomInt(1, 30);
        if (luck % 6 == 0) {
            Grid[0][i].classList.add("dragon");
        }
        else if (luck % 14 == 0) {
            Grid[0][i].classList.add("jet");
        }
        else {
            Grid[0][i].classList.add("ghost");
        }
        Direction[0][i] = [1, 0];
    }
    else {
        let luck = getRandomInt(2, 4);
        if (luck % 2 == 1) {
            Maze(i, who, k - 1);
        }
    }
}

//Maze

//firerow
function firerow() {
    for (let i = 0; i < row_size; i++) {
        for (let j = 0; j < col_size; j++) {
            if (i == 0) {
                Grid[i][j].classList.remove("fire","fire2");
            }
            else if (Grid[i][j].classList.contains("fire")) {
                // if (Direction[i][j][0] === 1) {
                //     continue;
                // }
                Grid[i][j].classList.remove("fire");
                if (Grid[i - 1][j].classList.contains("fire1") || Grid[i - 1][j].classList.contains("ghost") || Grid[i - 1][j].classList.contains("jet") || Grid[i - 1][j].classList.contains("dragon")) {
                    Grid[i - 1][j].classList.remove("fire1", "ghost", "jet", "dragon");
                    Direction[i - 1][j] = [0, 0];
                    points++;
                }
                else {
                    Grid[i - 1][j].classList.add("fire");
                    Direction[i - 1][j] = [-1, 0];
                }
            }
            else if (Grid[i][j].classList.contains("fire2")) {
                // if (Direction[i][j][0] === 1) {
                //     continue;
                // }
                Grid[i][j].classList.remove("fire2");
                if(Direction[i][j][1]==-1 && j>0){    
                    if (Grid[i - 1][j-1].classList.contains("fire1") || Grid[i - 1][j-1].classList.contains("ghost") || Grid[i - 1][j-1].classList.contains("jet") || Grid[i - 1][j-1].classList.contains("dragon")) {
                        Grid[i - 1][j-1].classList.remove("fire1", "ghost", "jet", "dragon");
                        Direction[i - 1][j-1] = [0, 0];
                        points++;
                    }
                    else {
                        Grid[i - 1][j-1].classList.add("fire2");
                        Direction[i - 1][j-1] = [-1, -1];
                    }
                }
                if(Direction[i][j][1]==1 && j<col_size-1){    
                    if (Grid[i - 1][j+1].classList.contains("fire1") || Grid[i - 1][j+1].classList.contains("ghost") || Grid[i - 1][j+1].classList.contains("jet") || Grid[i - 1][j+1].classList.contains("dragon")) {
                        Grid[i - 1][j+1].classList.remove("fire1", "ghost", "jet", "dragon");
                        Direction[i - 1][j+1] = [0, 0];
                        points++;
                    }
                    else {
                        Grid[i - 1][j+1].classList.add("fire2");
                        Direction[i - 1][j+1] = [-1, 1];
                    }
                }

            }
        }
    }

    for (let i = row_size-1; i >= 0; i--) {
        for (let j = 0; j < col_size; j++) {
            if (Direction[i][j][0] == -1) {
                continue;
            }
            if (i == row_size-1) {
                Grid[i][j].classList.remove("fire1");
            }
            else if (Grid[i][j].classList.contains("fire1")) {
                Grid[i][j].classList.remove("fire1");

                if (Direction[i][j][0] === 1 && Direction[i][j][1] === 0) {
                    if (Grid[i + 1][j].classList.contains("fire") || Grid[i + 1][j].classList.contains("fire2")) {
                        Grid[i + 1][j].classList.remove("fire","fire2");
                        Direction[i + 1][j] = [0, 0];
                        points++;
                    }
                    else if (Grid[i + 1][j].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else {
                        Grid[i + 1][j].classList.add("fire1");
                        Direction[i + 1][j] = [1, 0];
                    }

                }
                else if (j<col_size-1 && Direction[i][j][0] === 1 && Direction[i][j][1] === 1) {

                    if (Grid[i + 1][j + 1].classList.contains("fire") || Grid[i + 1][j+1].classList.contains("fire2")) {
                        Grid[i + 1][j + 1].classList.remove("fire","fire2");
                        Direction[i + 1][j + 1] = [0, 0];
                        points++;
                    }
                    else if (Grid[i + 1][j + 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else {
                        Grid[i + 1][j + 1].classList.add("fire1");
                        Direction[i + 1][j + 1] = [1, 1];
                    }
                }
                else if (j>0 && Direction[i][j][0] === 1 && Direction[i][j][1] === -1) {

                    if (Grid[i + 1][j - 1].classList.contains("fire") || Grid[i + 1][j-1].classList.contains("fire2")) {
                        Grid[i + 1][j - 1].classList.remove("fire","fire2");
                        Direction[i + 1][j - 1] = [0, 0];
                        points++;
                    }
                    else if (Grid[i + 1][j - 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else {
                        Grid[i + 1][j - 1].classList.add("fire1");
                        Direction[i + 1][j - 1] = [1, -1];
                    }
                }

            }
        }
    }
    point_display();
}
//firerow
//moverow
function moverow() {
    for (let i = row_size-1; i >= 0; i--) {
        for (let j = 0; j < col_size; j++) {
            if (i == row_size-1) {
                Grid[i][j].classList.remove("ghost", "jet", "dragon");
            }
            else if (Grid[i][j].classList.contains("ghost")) {
                Grid[i][j].classList.remove("ghost");
                if (Grid[i + 1][j].classList.contains("start")) {
                    showgameoverbox();
                    return;
                }
                else if ((Grid[i + 1][j].classList.contains("fire") || Grid[i + 1][j].classList.contains("fire2") ) &&  Direction[i + 1][j][0] === -1) {
                    Grid[i + 1][j].classList.remove("fire","fire2");
                    points++;
                }
                else {
                    Grid[i + 1][j].classList.add("ghost");
                    Direction[i + 1][j] = [1, 0];
                }
            }
            else if (Grid[i][j].classList.contains("dragon")) {
                Grid[i][j].classList.remove("dragon");

                let luck = getRandomInt(1, 3);
                if (luck == 1 && j !== 0) {
                    if (Grid[i + 1][j - 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if ((Grid[i + 1][j-1].classList.contains("fire") || Grid[i + 1][j-1].classList.contains("fire2") ) && Direction[i + 1][j - 1][0] === -1) {
                        Grid[i + 1][j - 1].classList.remove("fire","fire2");
                        points++;
                    }
                    else {
                        Grid[i + 1][j - 1].classList.add("dragon");
                        Direction[i + 1][j - 1] = [1, 0];
                    }
                }
                else if (luck == 2) {
                    if (Grid[i + 1][j].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if ((Grid[i + 1][j].classList.contains("fire") || Grid[i + 1][j].classList.contains("fire2") ) && Direction[i + 1][j][0] === -1) {
                        Grid[i + 1][j].classList.remove("fire","fire2");
                        points++;
                    }
                    else {
                        Grid[i + 1][j].classList.add("dragon");
                        Direction[i + 1][j] = [1, 0];
                    }
                }
                else if (luck == 3 && j!=col_size-1) {
                    if (Grid[i + 1][j + 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if ((Grid[i + 1][j+1].classList.contains("fire") || Grid[i + 1][j+1].classList.contains("fire2") ) && Direction[i + 1][j + 1][0] === -1) {
                        Grid[i + 1][j + 1].classList.remove("fire","fire2");
                        points++;
                    }
                    else {
                        Grid[i + 1][j + 1].classList.add("dragon");
                        Direction[i + 1][j + 1] = [1, 0];
                    }
                }
            }
            else if (Grid[i][j].classList.contains("jet")) {
                Grid[i][j].classList.remove("jet");
                if (Grid[i + 1][j].classList.contains("start")) {
                    showgameoverbox();
                    return;
                }
                else if ((Grid[i + 1][j].classList.contains("fire") || Grid[i + 1][j].classList.contains("fire2") ) && Direction[i + 1][j][0] === -1) {
                    Grid[i + 1][j].classList.remove("fire","fire2");
                    points++;
                }
                else {
                    Grid[i + 1][j].classList.add("jet");
                    Direction[i + 1][j] = [1, 0];
                }
                if (Grid[i + 1][j].classList.contains("jet") == false)
                    continue;
                if (i > 0 && i % 3 == 0 && i < 10) {
                    if (Grid[i + 2][j].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if ((Grid[i + 2][j].classList.contains("fire") || Grid[i + 2][j].classList.contains("fire2") ) && Direction[i + 2][j][0] === -1) {
                        Grid[i + 2][j].classList.remove("fire","fire2");
                        points++;
                    }
                    else {
                        Grid[i + 2][j].classList.add("fire1");
                        Direction[i + 2][j] = [1, 0];
                    }

                    if (j > 0 && Grid[i + 2][j - 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if (j > 0 && (Grid[i + 2][j-1].classList.contains("fire") || Grid[i + 2][j-1].classList.contains("fire2") ) && Direction[i + 2][j - 1][0] === -1) {
                        Grid[i + 2][j - 1].classList.remove("fire","fire2");
                        points++;
                    }
                    else if (j > 0) {
                        Grid[i + 2][j - 1].classList.add("fire1");
                        Direction[i + 2][j - 1] = [1, -1];
                    }
                    if (j < col_size-1 && Grid[i + 2][j + 1].classList.contains("start")) {
                        showgameoverbox();
                        return;
                    }
                    else if (j < col_size-1 && (Grid[i + 2][j+1].classList.contains("fire") || Grid[i + 2][j+1].classList.contains("fire2") ) && Direction[i + 2][j + 1][0] === -1) {
                        Grid[i + 2][j + 1].classList.remove("fire","fire2");
                        points++;
                    }
                    else if (j < col_size-1) {
                        Grid[i + 2][j + 1].classList.add("fire1");
                        Direction[i + 2][j + 1] = [1, 1];
                    }
                    
                    
                }
            }
        }
    }
    point_display();
    for (let i = 0; i < col_size; i++) {
        Maze(i, 1, 4);
    }
    
    if (Grid[cur[0]][cur[1]].classList.contains("ghost")) {
        showgameoverbox();
        return;
    }
    
    
    if (cnt % 100 == 0) {
        special = true;
        setTimeout(function () {
            special = false;
        }, 10000);
    }
    cnt++;
    console.log("console",cnt,special);
}

//moverow

//start
let gameon = null;
let fireon = null;
let cnt = 1;
function start() {

    if (gameon !== null) {
        clearInterval(gameon);
        gameon = null;
    }
    if (fireon !== null) {
        clearInterval(fireon);
        fireon = null;
    }
    cur = startnode.slice();
    for (let i = 0; i < row_size; i++) {
        for (let j = 0; j < col_size; j++) {
            Grid[i][j].classList.remove("start", "ghost", "fire");
        }
    }
    Grid[cur[0]][cur[1]].classList.add("start");

    point_display();
    if (fireon === null) {
        fireon = setInterval(firerow, 70);
    }
    if (gameon === null) {
        gameon = setInterval(moverow, 200);
    }
}
//start
Grid[startnode[0]][startnode[1]].classList.add("start");

//point display
function point_display() {
    const pointdisplay = document.getElementById("Point-display");
    pointdisplay.textContent = "Score: " + points;
}
point_display();

//Game over
const gameOverBox = document.createElement("div");
gameOverBox.id = "game-over-box";
gameOverBox.innerHTML = `
        <h1>Game Over</h1>
        <p>Your Score is: <span id="score-value"></span></p>
        <button id="restart-btn">Restart</button>
        <button id="quit-btn">Quit</button>
`;
document.body.appendChild(gameOverBox);
document.getElementById("restart-btn").addEventListener("click", restartgame);
document.getElementById("quit-btn").addEventListener("click", quitgame);

function showgameoverbox() {
    document.getElementById("score-value").textContent = points;
    document.getElementById("game-over-box").style.display = "block";
}

function restartgame() {
    window.location.href = "combat.html";
}
function quitgame() {
    window.location.href = "../../category.html";
}
//Game over