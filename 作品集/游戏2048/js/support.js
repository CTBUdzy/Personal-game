//判断游戏是否有空位置
function nospace(board) {
    for (var x = 0; x < Boardn; x++) {
        for (var y = 0; y < Boardn; y++) {
            if (board[x][y] == 0) {
                return false;
            }
        }
    }
    return true;
}
//判断游戏是否结束
function isOvergame(board) {
    console.log(nospace(board));
    console.log(canMoveUp(board), canMoveDown(board), canMoveLeft(board), canMoveRight(board));
    if (!nospace(board) || (canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)))
        return false;
    //    for (var x = 0; x < board.length; x++) {
    //        for (var y = 0; y < board.length; y++) {
    //            if (x == 0 && board[x][y] == board[x + 1][y] ||
    //                x == board.length - 1 && board[x][y] == board[x - 1][y] ||
    //                y == 0 && board[x][y] == board[x][y + 1] ||
    //                y == board.length - 1 && board[x][y] == board[x][y - 1]) {
    //                return false;
    //            }
    //            if (x != 0 && y != 0 && x != board.length - 1 && y != board.length - 1) {
    //                if (board[x][y] == board[x - 1][y] ||
    //                    board[x][y] == board[x + 1][y] ||
    //                    board[x][y] == board[x][y - 1] ||
    //                    board[x][y] == board[x][y + 1]) {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    return true;
}


//判断当前局势
function canMoveUp(board) {
    for (var x = 1; x < board.length; x++)
        for (var y = 0; y < board.length; y++)
            if (board[x][y] != 0)
                if (board[x - 1][y] == 0 || board[x - 1][y] == board[x][y])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var x = board.length - 2; x >= 0; x--)
        for (var y = 0; y < board.length; y++)
            if (board[x][y] != 0)
                if (board[x + 1][y] == 0 || board[x + 1][y] == board[x][y])
                    return true;
    return false;
}

function canMoveLeft(board) {
    for (var x = 0; x < board.length; x++)
        for (var y = 1; y < board.length; y++)
            if (board[x][y] != 0)
                if (board[x][y - 1] == 0 || board[x][y - 1] == board[x][y])
                    return true;
    return false;
}

function canMoveRight(board) {
    for (var x = 0; x < board.length; x++)
        for (var y = board.length - 2; y >= 0; y--)
            if (board[x][y] != 0)
                if (board[x][y + 1] == 0 || board[x][y + 1] == board[x][y])
                    return true;
    return false;
}

//function canMoveUp(board) {
//    for (var x = 1; x < board.length; x++)
//        for (var y = 0; y < board.length; y++)
//            if (board[x][y] != 0)
//                if (board[x - 1][y] == 0 || board[x - 1][y] == board[x][y])
//                    return true;
//    return false;
//}

//判断是否可以移动
function noBlockHorizontalTop(x, flagx, y, board) {
    for (var i = x + 1; x < flagx; i++) {
        if (board[i][y] != 0)
            return false;
    }
    return true;
}

function noBlockHorizontalDown(x, flagx, y, board) {
    for (var i = x - 1; x >= flagx; x--) {
        if (board[i][y] != 0)
            return false;
    }
    return true;
}

function noBlockHorizontalLeft(x, y, flagy, board) {
    for (var i = y; y < flagy; i++) {
        if (board[x][i] != 0)
            return false;
    }
    return true;
}

function noBlockHorizontalRight(x, y, flagy, board) {
    for (var i = y - 1; y >= flagy; y--) {
        if (board[x][i] != 0)
            return false;
    }
    return true;
}


//计算得分
function addScore(addscore, Oldscore) {
    score = parseInt(addscore) + parseInt(Oldscore);
    $("#score").text(score);
    return score;
}