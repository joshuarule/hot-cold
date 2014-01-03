// Generates Random Number

var answer = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + answer);

// check to see if guess is a number

var verifyNum = function(x) {
  if (isNaN(x) ) {
    guess = prompt("Please enter a number value");
    verifyNum(guess);
  } else if (x < 1 || x > 100) {
    guess = prompt("Please enter a number between 1 and 100");
    verifyNum(guess);
  }
}

// finds how far guess is from answer

var proximity = function() {
  var numAway = (answer - guess);
  if (numAway < 0) {
    console.log("numbers away: " + -numAway);
  } else {
    console.log("numbers away: " + numAway);
  }
}

// # of tries

var tries = 5;

//  set up guess and start game with prompt

var guess = prompt("Take a guess");

// check guess

for (var i = 1; i < tries; i++) {
  // verify guess is a number
  verifyNum(guess);
  // log guess
  console.log("guess #" + i + ": " + guess);
  // log tries
  console.log("Number of tries left: " + (5 - i));
  // how many numbers away
  proximity();

  if (guess == answer) {
    alert("correct");
    break;
  } else if (guess < answer) {
    guess = prompt("too low, try again");
  } else {
    guess = prompt("too high, try again");
  }
}