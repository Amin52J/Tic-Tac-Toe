//version 0.0.0

var xo=function () {  
    this.type='O';
    this.board=[null,null,null,
                null,null,null,
                null,null,null];
    this.move=null;
    this.nextBoard=null;
};

xo.prototype.play=function () {
    var counts = {};
    for(var i = 0; i< this.board.length; i++) {
        var num = this.board[i];
        counts[num] = counts[num] ? counts[num]+1 : 1;
    }
    if((this.board.indexOf(false)===0 || this.board.indexOf(false)===2 || this.board.indexOf(false)===6 || this.board.indexOf(false)===8) && counts.false===2){
        var plays=['win','block','fork','center','oppositeCorner','emptySide','blockFork','emptyCorner'];
    }
    else{
        var plays=['win','block','fork','blockFork','center','oppositeCorner','emptyCorner','emptySide'];
    }
    for(var playsCount=0, playsLength=plays.length; playsCount < playsLength; playsCount++){
        for(var boardCount=0, boardLength=this.board.length; boardCount < boardLength; boardCount++){
            this.nextBoard=this.board.slice(0);
            if(this.nextBoard[boardCount]===null){
                this.move=boardCount;
                this.nextBoard[boardCount]=true;
                var output=this.checkState(plays[playsCount]);
                if(output!==false){
                    return this.possibleMoves(output);
                }
            }
        }
    }
};
xo.prototype.possibleMoves=function (moves) {
    if(typeof moves!=='object') moves=[moves];
    for(var movesCount=0, movesLength=moves.length; movesCount < movesLength; movesCount++){
        if(this.board[moves[movesCount]]===null){
            this.board[moves[movesCount]]=true;
            return moves[movesCount];
        }
    }
};
xo.prototype.rules=function () {
    var that=this;
    var win=function () {  
        if(that.nextBoard[0] && that.nextBoard[1] && that.nextBoard[2]){
            return [0,1,2];
        }
        else if(that.nextBoard[3] && that.nextBoard[4] && that.nextBoard[5]){
            return [3,4,5];
        }
        else if(that.nextBoard[6] && that.nextBoard[7] && that.nextBoard[8]){
            return [6,7,8];
        }
        else if(that.nextBoard[0] && that.nextBoard[3] && that.nextBoard[6]){
            return [0,3,6];
        }
        else if(that.nextBoard[1] && that.nextBoard[4] && that.nextBoard[7]){
            return [1,4,7];
        }
        else if(that.nextBoard[2] && that.nextBoard[5] && that.nextBoard[8]){
            return [2,5,8];
        }
        else if(that.nextBoard[0] && that.nextBoard[4] && that.nextBoard[8]){
            return [0,4,8];
        }
        else if(that.nextBoard[2] && that.nextBoard[4] && that.nextBoard[6]){
            return [2,4,6];
        }
        else{
            return false;
        }
    };
    var block=function () {  
        if(that.nextBoard[0]===false && that.nextBoard[1]===false && that.nextBoard[2]===false){
            return [0,1,2];
        }
        else if(that.nextBoard[3]===false && that.nextBoard[4]===false && that.nextBoard[5]===false){
            return [3,4,5];
        }
        else if(that.nextBoard[6]===false && that.nextBoard[7]===false && that.nextBoard[8]===false){
            return [6,7,8];
        }
        else if(that.nextBoard[0]===false && that.nextBoard[3]===false && that.nextBoard[6]===false){
            return [0,3,6];
        }
        else if(that.nextBoard[1]===false && that.nextBoard[4]===false && that.nextBoard[7]===false){
            return [1,4,7];
        }
        else if(that.nextBoard[2]===false && that.nextBoard[5]===false && that.nextBoard[8]===false){
            return [2,5,8];
        }
        else if(that.nextBoard[0]===false && that.nextBoard[4]===false && that.nextBoard[8]===false){
            return [0,4,8];
        }
        else if(that.nextBoard[2]===false && that.nextBoard[4]===false && that.nextBoard[6]===false){
            return [2,4,6];
        }
        else{
            return false;
        }
    };
    var fork=function () {
        var conditions=[
            [0,1,2,3,6],
            [2,5,8,7,6],
            [0,4,2,1,6],
            [0,4,2,1,8],
            [0,3,6,4,2],
            [0,3,6,4,8],
            [6,7,8,4,0],
            [2,5,8,4,0],
            [2,5,8,4,6]
        ];
        for (var conditionsCount = 0, conditionsLength=conditions.length; conditionsCount < conditionsLength; conditionsCount++) {
            var output=that.checkFork(conditions[conditionsCount],that.nextBoard);
            if(output){
                return output;
            }
        }
        return false;
    };
    var blockFork=function () {
        var conditions=[
            [0,1,2,3,6],
            [2,5,8,7,6],
            [0,4,2,1,6],
            [0,4,2,1,8],
            [0,3,6,4,2],
            [0,3,6,4,8],
            [6,7,8,4,0],
            [2,5,8,4,0],
            [2,5,8,4,6]
        ];
        for (var conditionsCount = 0, conditionsLength=conditions.length; conditionsCount < conditionsLength; conditionsCount++) {
            var output=that.checkBlockFork(conditions[conditionsCount],that.nextBoard);
            if(output){
                return output;
            }
        }
        return false;
    };
    var center=function () {  
        if(that.board[4]===null){
            return 4;
        }
        else{
            return false;
        }
    };
    var oppositeCorner=function () {  
        if(that.nextBoard[0]===false && that.nextBoard[8]===true && that.move===8){
            return 8;
        }  
        else if(that.nextBoard[2]===false && that.nextBoard[6]===true && that.move===6){
            return 6;
        }  
        else if(that.nextBoard[6]===false && that.nextBoard[2]===true && that.move===2){
            return 2;
        }  
        else if(that.nextBoard[8]===false && that.nextBoard[0]===true && that.move===0){
            return 0;
        }
        return false;
    };
    var emptyCorner=function () {  
        if(that.nextBoard[0]===true && that.move===0){
            return 0;
        }  
        else if(that.nextBoard[2]===true && that.move===2){
            return 2;
        }  
        else if(that.nextBoard[6]===true && that.move===6){
            return 6;
        }  
        else if(that.nextBoard[8]===true && that.move===8){
            return 8;
        }
        return false;
    };
    var emptySide=function () {  
        if(that.nextBoard[1]===true && that.move===1){
            return 1;
        }  
        else if(that.nextBoard[3]===true && that.move===3){
            return 3;
        }  
        else if(that.nextBoard[5]===true && that.move===5){
            return 5;
        }  
        else if(that.nextBoard[7]===true && that.move===7){
            return 7;
        }
        return false;
    };
    return {
        win:win,
        block:block,
        fork:fork,
        blockFork:blockFork,
        center:center,
        oppositeCorner:oppositeCorner,
        emptyCorner:emptyCorner,
        emptySide:emptySide
    };
};
xo.prototype.checkFork=function (fields,board) {
    var isTrue=[],
        isNull=[];  
    for(var fieldsCount=0, fieldsLength=fields.length; fieldsCount < fieldsLength; fieldsCount++){
        if(board[fields[fieldsCount]]===true){
            isTrue.push(fields[fieldsCount]);
        }
        else if(board[fields[fieldsCount]]===null){
            isNull.push(fields[fieldsCount]);
        } 
    }
    if(isTrue.length===3 && isNull.length===2){
        return isTrue;
    }
    return false;
}
xo.prototype.checkBlockFork=function (fields,board) {
    var isTrue=[],
        isNull=[];  
    for(var fieldsCount=0, fieldsLength=fields.length; fieldsCount < fieldsLength; fieldsCount++){
        if(board[fields[fieldsCount]]===false){
            isTrue.push(fields[fieldsCount]);
        }
        else if(board[fields[fieldsCount]]===null){
            isNull.push(fields[fieldsCount]);
        } 
    }
    if(isTrue.length===3 && isNull.length===2){
        return isTrue;
    }
    return false;
}
xo.prototype.checkState=function (state) {
    if(state==='block' || state==='blockFork'){
        this.nextBoard[this.move]=false;
    }
    else{
        this.nextBoard[this.move]=true;
    }
    return this.rules()[state]();
};