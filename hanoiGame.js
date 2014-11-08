var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function HanoiGame() {
  this.stacks = [ [3, 2, 1], [], [] ];
}

HanoiGame.prototype.isWon = function () {
  if ('' + this.stacks === [ [], [], [3, 2, 1] ] + '' ||
      '' + this.stacks === [ [], [3, 2, 1], [] ] + '') {
    return true;
  } else {
    return false;
  }        
};

HanoiGame.prototype.isValidMove = function(startTower, endTower) {

  if (startTower.length === 0) {
    return false;
  }
  
  if (endTower.length === 0) {
    return true;
  }

  if (startTower[startTower.length - 1] < endTower[endTower.length - 1]) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.move = function(startTower, endTower) {

  if (this.isValidMove(startTower, endTower)) {
    endTower.push(startTower.pop());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function(callback) {
  var startTowerIdx = null, endTowerIdx = null;
  var that = this;
  
  this.print();
  
  reader.question("Which tower from?", function(startInput) {
    startTowerIdx = parseInt(startInput);
    reader.question("Which tower to?", function(endInput) {
      endTowerIdx = parseInt(endInput);
      var makeMove = callback(that.stacks[startTowerIdx], that.stacks[endTowerIdx]);

      if (!makeMove) {
        console.log("Invalid move!");
      }
      
      that.run(function() {
        reader.close();
      });
    });
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  var hanoiGame = this;

  if (this.isWon()) {
    console.log("You won!");
    completionCallback();
    return;
  }
  
  function loopStep () {
    hanoiGame.promptMove(hanoiGame.move.bind(hanoiGame));
  }
  
  if (!this.isWon()) {
    loopStep();
  }
};

var hanoiGame = new HanoiGame();
hanoiGame.run(function() {
  reader.close();
});
