function Board () {
  //console.log a representation of the grid
  this.grid = [ [ [], [], [] ], 
                [ [], [], [] ], 
                [ [], [], [] ] ]
}

Board.prototype.printGrid = function () {
  var i = 0;
  
  for( ; i < this.grid.length; i++) {
    console.log(JSON.stringify(this.grid[i]));
  }
}

Board.prototype.atPos = function(pos) {
  var x = pos[0], y = pos[1];
  return this.grid[x][y];
}

Board.prototype.isEmpty = function(pos) {
  return ((this.atPos(pos).length === 0) ? true : false); 
}

Board.prototype.placeMark = function(pos, mark) {
  if (!this.isEmpty(pos)) {
    var x = pos[0], y = pos[1];
    this.grid[x][y] = mark;
    return true;
  } else {
    return false;
  }
}

Board.prototype.cols = function() {
  var cols = [ [], [], [] ];
  this.grid.forEach(function(row) {
    
  });
}

Board.prototype.isWon = function () {
  
}

Board.prototype.winner = function () {
  
}







var board = new Board();
board.printGrid();
console.log(board.isEmpty([0,1]));