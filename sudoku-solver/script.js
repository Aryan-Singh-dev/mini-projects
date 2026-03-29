// Grab all input fields
const inputs = document.querySelectorAll('input');
const solveBtn = document.getElementById('solve-btn');

// Convert inputs into 9x9 matrix
function getBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let val = inputs[i*9 + j].value;
            row.push(val === '' ? 0 : parseInt(val));
        }
        board.push(row);
    }
    return board;
}

// Update inputs after solving
function updateBoard(board) {
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            inputs[i*9 + j].value = board[i][j] === 0 ? '' : board[i][j];
}

// Check if number is valid in position
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[startRow+i][startCol+j] === num) return false;

    return true;
}

// Backtracking solver
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board,row,col,num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Solve button click
solveBtn.addEventListener('click', () => {
    let board = getBoard();
    if (solveSudoku(board)) {
        updateBoard(board);
        alert('Sudoku solved!');
    } else {
        alert('No solution exists!');
    }
});