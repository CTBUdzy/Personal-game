var board = new Array();
var score = 0;
var Boardn = 4; //格子数量
var BoxPosition = new Array();

$(function () {
    createCell(); //创建游戏
	EventContral();//事件控制
    $('#beginGame').click(function (e) {
        createCell(); //创建游戏
		e.stopPropagation();
    });
	
})

//事件控制
function EventContral(){
	//移动端的滑动控制
	$(window,'.grid-cell').on("touchstart", function(e) {
		//console.log(e.touches[0].clientX);
		e.stopPropagation();
		var contentmain = $("#grid-container");
		var down = {
			x:e.touches[0].clientX,
			y:e.touches[0].clientY
		}
		if(mousePosition(down,contentmain)){ //如果点击点在游戏区域内
			var up = {};
			$(window,'.grid-cell').on('touchmove',function(e){
				up.x = e.touches[0].clientX;
				up.y = e.touches[0].clientY;
			});
			$(window,'.grid-cell').one('touchend',function(e){
				var dx = up.x - down.x;
				var dy = up.y - down.y;
				if(Math.abs(dx) > 30 || Math.abs(dy) > 30){
					if(dx > 0  && dx > Math.abs(dy)){ //Right
						if (moveRight()) {
            				generateOneNumeber(); //新增数字
        				}
					}else if(dx < 0  && -dx > Math.abs(dy)){ //left
						if (moveLeft()) {
            				generateOneNumeber(); //新增数字
        				}
					}else if(dy < 0  && -dy > Math.abs(dx)){  //Up
						if (moveUp()) {
            				generateOneNumeber(); //新增数字
        				}
					}else if(dy > 0  && dy > Math.abs(dx)){  //Down
						if (moveDown()) {
            				generateOneNumeber(); //新增数字
        				}
					}
					viewGameOver();
				}
			});
		}
	});
	//PC端的滑动控制
	$(window,'.grid-cell').mousedown(function(e){
		var contentmain = $("#grid-container");
		var down = {
			x:e.pageX,
			y:e.pageY
		}
		
		if(mousePosition(down,contentmain)){ //如果点击点在游戏区域内
			$(window,'.grid-cell').one('mouseup',function(e){
				var up = {};
				up.x = e.pageX;
				up.y = e.pageY;
				var dx = up.x - down.x;
				var dy = up.y - down.y;
				if(Math.abs(dx) > 30 || Math.abs(dy) > 30){
					if(dx > 0  && dx > Math.abs(dy)){ //Right
						if (moveRight()) {
            				generateOneNumeber(); //新增数字
							viewGameOver();
        				}
					}else if(dx < 0  && -dx > Math.abs(dy)){ //left
						if (moveLeft()) {
            				generateOneNumeber(); //新增数字
							viewGameOver();
        				}
					}else if(dy < 0  && -dy > Math.abs(dx)){  //Up
						if (moveUp()) {
            				generateOneNumeber(); //新增数字
							viewGameOver();
        				}
					}else if(dy > 0  && dy > Math.abs(dx)){  //Down
						if (moveDown()) {
            				generateOneNumeber(); //新增数字
							viewGameOver();
        				}
					}
				}
			});
		}
	});
	
	//按键控制
	$("#control_Left").click(function(){
		if (moveLeft()) {
            generateOneNumeber(); //新增数字
        }
		viewGameOver();
	});
	$("#control_Right").click(function(){
		if (moveRight()) {
            generateOneNumeber(); //新增数字
        }
		viewGameOver();
	});
	$("#control_Up").click(function(){
		if (moveUp()) {
            generateOneNumeber(); //新增数字
        }
		viewGameOver();
	});
	$("#control_Down").click(function(){
		if (moveDown()) {
            generateOneNumeber(); //新增数字
        }
		viewGameOver();
	});
}

//更新视图判断结束
function viewGameOver(){
	updataBoardView();
		if (isOvergame(board)) {
        alert('游戏结束，得分：' + score);
     };
}


//检测鼠标是否在争取区域内
	function mousePosition(e,element){
		if(e.x >= element.offset().left && 
		  e.y >= element.offset().top &&
		  e.x <= (element.offset().left + element.outerWidth()) &&
		  e.y <= (element.offset().top + element.outerHeight()))
			return true;
	}
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
    $("#grid-container").css('height', box_width + 'px');
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


//检测玩家相应(PC端的上下左右控制)
$(document).keydown(function (event) {
    switch (event.keyCode) {
    case 37: //left
        if (moveLeft()) {
            generateOneNumeber(); //新增数字
        }
        break;
    case 38: //up
        if (moveUp()) {
            generateOneNumeber(); //新增数字
        }
        break;
    case 39: //right
        if (moveRight()) {
            generateOneNumeber(); //新增数字
        }
        break;
    case 40: //down
        if (moveDown()) {
            generateOneNumeber(); //新增数字 
        }
        break;
    default:
        break;
    }
    updataBoardView();
	if (isOvergame(board)) {
        alert('游戏结束，得分：' + score);
     };
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