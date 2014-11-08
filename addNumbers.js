var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function incrementSum(callback) {
  reader.question("Enter a number:", function(numString) {
    var num = parseInt(numString);
    
    callback(num);
  });
}

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
    return;
  }
    
  function loopStep() {
    numsLeft -= 1;
    addNumbers(sum, numsLeft, completionCallback);
  }
  
  if (numsLeft > 0) {
    incrementSum(function (result) {
      sum += result;

      console.log("sum: " + sum);
      loopStep();
    });
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
  