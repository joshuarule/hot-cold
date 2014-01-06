$(document).ready(function(){

// initialize

// Generates Random Number

var answer = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + answer);

var tries = 0;
var slideNumber = 0;
var guess = 0;

// functions

// verify value is a number

function verifyNum(x) {
  
  if (isNaN(x)) {
    currentSlide().find(".instruction").addClass("error").text('That is not a number!');
    return false;
    console.log("not a number");
  } else if (x < 1 || x > 100) {
    currentSlide().find(".instruction").addClass("error").text('Number must be between 1 - 100');
    return false;
    console.log("not within range");
  } else {
    return Number(x);
  }
};

// targets current slide

function currentSlide() {
  return $(".slide:eq("+slideNumber+")");
}

// finds value of input on current slide

function inputVal() {
  return currentSlide().find("input").val();
}

// moves to next slide

function next() {
  currentSlide().removeClass("js-show");
  slideNumber++;
  currentSlide().addClass("js-show");
  console.log("slide # " + slideNumber);
}

// returns the current slide

function setTries() {
    tries = inputVal(); // gets value input
    if (verifyNum(tries)) {
      console.log(tries + " tries verified")
      $(".try-wrap").addClass("js-show"); // turns on try amount info
      updateTries(); // changes try amount
      next();
      $(".hot").removeClass("hot-5");
      $(".cold").removeClass("cold-5");
    }
    
};

// checks to see if we can move forward

function updateTries() {
  if (tries > 1 || tries === 0) {
    $(".tries").text(tries + " tries left");
  } else {
    $(".tries").text(tries + " try left");
  }
  console.log("Number of tries left: " + (tries));
};

function usedTry() { // minus 1 try and update
  console.log("proximity " + proximity());
  if (proximity() < 20) {
    $(".guess-list").append("<li><span class='red-1'>" + guess + "</span></li>");
  } else {
    $(".guess-list").append("<li><span class='blue-1'>" + guess + "</span></li>");
  }
  
  tries--;
  updateTries();
};

// check guess

function checkGuess() {
  guess = inputVal(); // get guess from input
  guess = verifyNum(guess);
  proximity(guess);
  if (guess) {
     // how many numbers away from answer

      if (tries > 1) {

        $(".hot").removeClass("hot-5");
        $(".cold").removeClass("cold-5");

        if (guess < answer) {
          $(".js-show .instruction").addClass("error").text('Too Low');
          $(".cold").addClass("cold-5");
          usedTry();
          console.log("guess is less than answer");

        } else if (guess > answer){
          $(".js-show .instruction").addClass("error").text('Too High');
          $(".hot").addClass("hot-5");
          usedTry();
          console.log("guess is higher than answer");
        } else { // correct answer
          usedTry();
          next();
        }
      }

      else {
        usedTry();
        next();
        next();
      } 
  }
  
};

// finds how far guess is from answer

function proximity() {
  var numAway = (answer - guess);
  if (numAway < 0) {
    console.log("numbers away: " + -numAway);
  } else {
    console.log("numbers away: " + numAway);
  } 
  return numAway;
};

// start up

$(".hot").addClass("hot-5");
$(".cold").addClass("cold-5");

// timeline for the game

$("button").click(function(){
  if (slideNumber === 1) {
    setTries();
  } 
  else if (slideNumber === 2) {
    checkGuess();
  }
  else {
    next();
  };
});


});

