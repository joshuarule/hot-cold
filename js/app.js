$(document).ready(function(){

  // Generates Random Number

var answer = Math.floor(Math.random() * 100) + 1;

console.log("answer: " + answer);

// capture # of tries

var tries = 0;

var slideNum = 0;

function getVal(x) {
    return x.val();
};

function nextSlide() {
  $(".slide").eq(slideNum).removeClass("js-show");
  slideNum = slideNum + 1;
  $(".slide").eq(slideNum).addClass("js-show");
  console.log("remove class");
}

// when button is clicked go to next slide

var slide = $(".slide").eq(slideNum);

$(slide.find("button")).click(function() {
    nextSlide();
});

function setTries() {
  $(".js-setTries button").click(function() {
    tries = getVal($(this).prev()); // gets value from prev input
    console.log(tries + " tries")
    nextSlide();
  });
};

// check to see if guess is a number

// function verifyNum(x) {
//   if (isNaN(x) ) {
//     $(".instruction").text('You must enter a number');
//     setTries();
//   } else if (x < 1 || x > 100) {
//     $(".instruction").text('Number must be between 1 - 100');
//     setTries();
//   }
// }


setTries();

    
console.log(tries);




// finds how far guess is from answer

// var proximity = function() {
//   var numAway = (answer - guess);
//   if (numAway < 0) {
//     console.log("numbers away: " + -numAway);
//   } else {
//     console.log("numbers away: " + numAway);
//   }
// };



//  set up guess and start game with prompt

// var guess = prompt("Take a guess");

// check guess

// for (var i = 1; i < tries; i++) {
//   // verify guess is a number
//   verifyNum(guess);
//   // log guess
//   console.log("guess #" + i + ": " + guess);
//   // log tries
//   console.log("Number of tries left: " + (5 - i));
//   // how many numbers away
//   proximity();

//   if (guess == answer) {
//     alert("correct");
//     break;
//   } else if (guess < answer) {
//     guess = prompt("too low, try again");
//   } else {
//     guess = prompt("too high, try again");
//   }
// }

});

