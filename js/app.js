// Generates Random Number

var answer = Math.floor(Math.random() * 100) + 1;
console.log(answer);

// # of tries

var tries = 5;

//  set up guess

var guess = prompt("Take a guess");

// check guess

for (var i = 1; i < tries; i++) {
  console.log(guess);
  console.log("Number of tries left: " + (5 - i));
  if (guess == answer) {
    alert("correct");
    break;
  } else {
    if (guess < answer) {
      guess = prompt("too low, try again");
    } else {
      guess = prompt("too high, try again");
    }
  } 
}

// call to check answer
