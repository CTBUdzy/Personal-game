var board = new Array();
var score = 0;
var Boardn = 4; //格子数量
var BoxPosition = new Array();

$(function () {
    createCell(); //创建游戏
    $('#beginGame').click(function () {
        createCell(); //创建游戏
    });
})

//创建n*n个小格子；
function createCell() {
    //创建二维数据数组
    for (var i = 0; i < Boardn; i++) {
        board[i] = new Array();
        BoxPosition[i] = new Array();
    }
    //动态设置每个格子的大小
    var box_width = parseInt($("#grid-container").css('width').replace('px', ''));
    var box_height = parseInt($("#grid-container").css('width').replace('px', ''));
    var margin = box_width / Boardn * 1 / 10;
    var slideWidth = box_width / Boardn * 4 / 5;
    $("#grid-container").css('padding', margin + 'px');
    //设置字体大小
    $("#grid-container .grid-cell").css({
        lineHeight: slideWidth - 6 + 'px',
        fontSize: slideWidth / 3 + 'px'
    })

    for (var x = 0; x < Boardn; x++) {
        for (var y = 0; y < Boardn; y++) {
            var sonmodel = $("#grid-cell-model").clone(true);
            sonmodel.attr('id', 'grid-cell-' + x + '-' + y);
            sonmodel.css({
                width: slideWidth - 6 + 'px',
                height: slideWidth - 6 + 'px',
                margin: margin + 'px',
                top: x * (2 * margin + slideWidth) + margin,
                left: y * (2 * margin + slideWidth) + margin
            });
            board[x][y] = 0; //初始化数据
            BoxPosition[x][y] = {
                top: x * (2 * margin + slideWidth) + margin,
                left: y * (2 * margin + slideWidth) + margin
            }
            $("#grid-container").append(sonmodel);
        }
    }
    $("#grid-cell-model").remove();

    newGame(); //开始游戏
}

//开始游戏
function newGame() {
    //随机生成数字
    generateOneNumeber();
    generateOneNumeber();
    updataBoardView();
}

//随机生成数字
function generateOneNumeber() {
    if (nospace(board)) {
        return false;
    } else {
        var randx = Math.floor(Math.random() * Boardn);
        var randy = Math.floor(Math.random() * Boardn);
        while (true) {
            if (board[randx][randy] == 0)
                break;
            randx = Math.floor(Math.random() * Boardn);
            randy = Math.floor(Math.random() * Boardn);
        }
        board[randx][randy] = Math.random() < 0.6 ? 2 : 4;
        addNumAnimation(randx, randy, board[randx][randy]);
        return true;
    }
}

//显示数据
function updataBoardView() {
    for (var x = 0; x < Boardn; x++) {
        for (var y = 0; y < Boardn; y++) {
            $("#grid-cell-" + x + '-' + y).text('');
            switch (board[x][y]) {
            case 0:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#ccc0b3");
                break;
            case 2:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#ede0c8");
                break;
            case 4:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#ede0c8");
                break;
            case 8:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#f2b179");
                break;
            case 16:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#f59563");
                break;
            case 32:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#f67c5f");
                break;
            case 64:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#f65e3b");
                break;
            case 128:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#edcf72");
                break;
            case 256:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#edcc61");
                break;
            case 512:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#9c0");
                break;
            case 1024:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#33b5e5");
                break;
            case 2048:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#09c");
                break;
            case 4096:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#a6c");
                break;
            case 4096:
                $("#grid-cell-" + x + '-' + y).css('background-color', "#93c");
                break;
            }
            if (board[x][y]) {
                $("#grid-cell-" + x + '-' + y).text(board[x][y]);
            }
            if (board[x][y] <= 4) {
                $("#grid-cell-" + x + '-' + y).css('color', '#776e65');
            } else {
                $("#grid-cell-" + x + '-' + y).css('color', '#fff');
            }
        }
    }
}


//检测玩家相应
$(document).keydown(function (event) {
    switch (event.keyCode) {
    case 37: //left
        if (moveLeft()) {
            generateOneNumeber(); //新增数字
            if (isOvergame(board)) {
                alert('游戏结束，得分：' + score);
            }
        }
        break;
    case 38: //up
        if (moveUp()) {
            generateOneNumeber(); //新增数字
            if (isOvergame(board)) {
                alert('游戏结束，得分：' + score);
            }
        }
        break;
    case 39: //right
        if (moveRight()) {
            generateOneNumeber(); //新增数字
            if (isOvergame(board)) {
                alert('游戏结束，得分：' + score);
            }
        }
        break;
    case 40: //down
        if (moveDown()) {
            generateOneNumeber(); //新增数字
            if (isOvergame(board)) {
                alert('游戏结束，得分：' + score);
            }
        }
        break;
    default:
        break;
    }
    updataBoardView();
    //    if (!isOvergame(board)) {
    //        alert('游戏结束，得分：' + score);
    //    }
    //    setTimeout('updataBoardView()', 200);
    //    setTimeout(function () {
    //        if (isOvergame(board)) {
    //            alert('游戏结束，得分：' + score);
    //        }
    //    }, 200); //判断游戏是否结束
});

//移动操作
function moveUp() {
    if (!canMoveUp(board))
        return false;

    //向上移动
    for (var x = 1; x < board.length; x++)
        for (var y = 0; y < board.length; y++) {
            if (board[x][y] != 0) {
                for (var flagx = 0; flagx < x; flagx++) {
                    if (board[flagx][y] == 0 && noBlockHorizontalTop(x, flagx, y, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[flagx][y] = board[x][y];
                        board[x][y] = 0;
                        continue;
                    } else if (board[flagx][y] == board[x][y] && noBlockHorizontalTop(x, flagx, y, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[flagx][y] += board[x][y];
                        score = addScore(board[x][y], score); //计算分数
                        board[x][y] = 0;
                        //add
                        continue;
                    }
                }
            }
        }
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;

    //向下移动
    for (var x = board.length - 2; x >= 0; x--)
        for (var y = 0; y < board.length; y++) {
            if (board[x][y] != 0) {
                for (var flagx = board.length - 1; flagx > x; flagx--) {
                    if (board[flagx][y] == 0 && noBlockHorizontalDown(x, flagx, y, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[flagx][y] = board[x][y];
                        board[x][y] = 0;
                        continue;
                    } else if (board[flagx][y] == board[x][y] && noBlockHorizontalDown(x, flagx, y, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[flagx][y] += board[x][y];
                        score = addScore(board[x][y], score); //计算分数
                        board[x][y] = 0;
                        //add
                        continue;
                    }
                }
            }
        }
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    //向左移动
    for (var x = 0; x < board.length; x++)
        for (var y = 1; y < board.length; y++) {
            if (board[x][y] != 0) {
                for (var flagy = 0; flagy < y; flagy++) {
                    if (board[x][flagy] == 0 && noBlockHorizontalLeft(x, y, flagy, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[x][flagy] = board[x][y];
                        board[x][y] = 0;
                        continue;
                    } else if (board[x][flagy] == board[x][y] && noBlockHorizontalLeft(x, y, flagy, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[x][flagy] += board[x][y];
                        score = addScore(board[x][y], score); //计算分数
                        board[x][y] = 0;
                        //add
                        continue;
                    }
                }
            }
        }
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;

    //向下移动
    for (var x = 0; x < board.length; x++)
        for (var y = board.length - 2; y >= 0; y--) {
            if (board[x][y] != 0) {
                for (var flagy = board.length - 1; flagy > y; flagy--) {
                    if (board[x][flagy] == 0 && noBlockHorizontalRight(x, y, flagy, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[x][flagy] = board[x][y];
                        board[x][y] = 0;
                        continue;
                    } else if (board[x][flagy] == board[x][y] && noBlockHorizontalRight(x, y, flagy, board)) {
                        //move
                        //showMoveAnimation(x, y, flagx, y);
                        board[x][flagy] += board[x][y];
                        score = addScore(board[x][y], score); //计算分数
                        board[x][y] = 0;
                        //add
                        continue;
                    }
                }
            }
        }
    return true;
}



//获取小方块位置
function getPosTop(x, y) {
    return BoxPosition[x][y].top;
}

function getPosLeft(x, y) {
    return BoxPosition[x][y].left;
}