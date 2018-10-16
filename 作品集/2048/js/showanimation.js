function addNumAnimation(x, y, number) {
    var sell = $("#grid-cell" + x + '-' + y);
    sell.css({
        fontSize: 0
    }).animate({
        fontSize: '60px'
    }, 500);
}

//移动动画
function showMoveAnimation(fromx, fromy, tox, toy) {
    console.log(fromx, fromy, tox, toy);
    $('#grid-cell-' + fromx + '-' + fromy).animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
//    $('#grid-cell-' + fromx + '-' + fromy).css({
            //        top: getPosTop(fromx, fromy),
            //        left: getPosLeft(fromx, fromy)
            //    });
}