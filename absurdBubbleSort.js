var readline = require("readline");

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askIfLessThan (el1, el2, callback) {
  // Prompt user to tell us whether el1 < el2; pass true back to the
  // callback if true; else false.
  var msg = "Is " + el1 + " smaller than " + el2 + " ?";
  reader.question(msg, function(input) {
      if (input === "yes") {
          callback(true);
      } else {
          callback(false);
      }
  });
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfLessThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
  if (i == arr.length - 1) {
      outerBubbleSortLoop(madeAnySwaps);
  } 
  
  if (i < arr.length - 1) {
      askIfLessThan(arr[i], arr[i + 1], function(isLessThan) {
          if (!isLessThan) {
              var tmp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = tmp;
              madeAnySwaps = true;
          }
          
          innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      });
  }
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    if (madeAnySwaps) {
        innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
        sortCompletionCallback(arr);
    }    
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 1, 6, 98], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});