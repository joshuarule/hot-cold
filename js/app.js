$(document).ready(function(){

// initialize

// Generates Random Number

var answer = Math.floor(Math.random() * 100) + 1;
console.log("answer: " + answer);

var tries = 0;
var slideNumber = 0;
var guess = 0;

// functions

function next() {
  $(".slide").eq(slideNumber).removeClass("js-show");
  console.log("slide # " + slideNumber);
  slideNumber = slideNumber + 1;
  $(".slide").eq(slideNumber).addClass("js-show");
  console.log("slide # " + slideNumber);
}

// checks to see if we can move forward

function setTries(loc) {
    tries = $(loc).prev().val(); // gets value from prev input
    if (verifyNum(tries) == false) {
      console.log(tries + " after false");
    } else {
      console.log(tries + " tries verified")
      $(".try-wrap").addClass("js-show"); // turns on try amount info
      updateTries(); // changes try amount
      next();
    }
};

// verify value is a number

function verifyNum(x) {
  if (isNaN(x)) {
    $(".js-show .instruction").addClass("error").text('That is not a number!');
    return false;
  } else if (x < 1 || x > 100) {
    $(".js-show .instruction").addClass("error").text('Number must be between 1 - 100');
    return false;
  }
};

function updateTries() {
  if (tries > 1) {
    $(".tries").text(tries + " guesses left");
  } else {
    $(".tries").text(tries + " guess left");
  }
};

function usedTry() { // minus 1 try and update 
  tries--;
  updateTries();
};

// check guess

function checkGuess(loc) {
  for (var i = 1; i < tries; i++) {
    guess = Number($(loc).prev().val());
    verifyNum(guess); // verify guess is a number
    console.log("guess #" + i + ": " + guess);
    console.log("Number of tries left: " + (tries - i));
    proximity(); // how many numbers away

    if (guess === answer) {
      next();
      break;
    } else if (guess < answer) {
      $(".js-show .instruction").addClass("error").text('Too Low');
      usedTry();
    } else {
      $(".js-show .instruction").addClass("error").text('Too High');
      usedTry();
    } 
  }
};

// finds how far guess is from answer

var proximity = function() {
  var numAway = (answer - guess);
  if (numAway < 0) {
    console.log("numbers away: " + -numAway);
  } else {
    console.log("numbers away: " + numAway);
  }
};

$(".hot").addClass("hot-5");
$(".cold").addClass("cold-5");

// timeline for the game

$("button").click(function(){
  if (slideNumber === 1) {
    setTries($(this));
    $(".hot").removeClass("hot-5");
    $(".cold").removeClass("cold-5");

  } 
  else if (slideNumber === 2) {
    console.log("we are at 2!");
    if (checkGuess($(this)) == false) {
      console.log("false");
    }
  }
  else {
    next();
  };
});


});

