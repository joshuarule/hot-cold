$(document).ready(function(){

// initialize

var initialize = function() {

  // Generates Random Number
  var answer = Math.floor(Math.random() * 100) + 1;
  console.log("answer: " + answer);

  var tries = 0;
  updateTries();
  $(".try-wrap span").text('');

  var slideNumber = 0;
  console.log("slide number #: " + slideNumber);

  var guess = 0;

  $(".slide").removeClass("js-show");
  $(".slide").eq(0).addClass("js-show");

  $(".hot").addClass("hot-5");
  $(".cold").addClass("cold-5");

  $(".guess-list").html("");
  

  // functions

  // verify value is a number

  function verifyNum(x) {

    error1= $(".error-1").clone();
    error2= $(".error-2").clone();;
    
    if (isNaN(x)) {
      currentSlide().find(".instruction").hide();
      currentSlide().prepend(error1.show());
      return false;
    } else if (x < 1 || x > 100) {
      currentSlide().find(".instruction").hide();
      currentSlide().prepend(error2.show());
      return false;
    } else {

      return Number(x); // return number in number format
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
    tries--;
    updateTries();
  };

  // check guess

  function checkGuess() {
    guess = inputVal(); // get guess from input
    guess = verifyNum(guess);

    
    if (guess) {
       // how many numbers away from answer

        $(".js-show .instruction").removeClass("error"); // resets after error

        if (tries > 1) {

          // resets
          $(".hot").attr('class', 'hot');    // resets hot classes
          $(".cold").attr('class', 'cold');  // resets cold classes

          x = proximity(guess);
          console.log("proximity " + x);

          if (guess === answer) { // correct answer
            usedTry();
            $(".hot").addClass("hot-5");
            $(".guess-list").append("<li><span class='red-2'>" + guess + "</span></li>");
            next();
          } else if (x < 10) {
            $(".js-show .instruction").text("Hot! Like Hansel!");
            $(".hot").addClass("hot-5");
            $(".guess-list").append("<li><span class='red-2'>" + guess + "</span></li>");
            usedTry();
          } else if (x >= 10 && x < 20) {
            $(".js-show .instruction").text("It\'s really heating up!");
            $(".hot").addClass("hot-4");
            $(".guess-list").append("<li><span class='red-1'>" + guess + "</span></li>");
            usedTry();
          } else if (x >= 20 && x < 30) {
            $(".js-show .instruction").text("Warm 106.9");
            $(".hot").addClass("hot-3");
            $(".guess-list").append("<li><span class=''>" + guess + "</span></li>");
            usedTry();
          } else if (x >= 30 && x < 40) {
            $(".js-show .instruction").text("A light jacket maybe?");
            $(".hot").addClass("hot-2");
            $(".cold").addClass("cold-2");
            $(".guess-list").append("<li><span class='blue-1'>" + guess + "</span></li>");
            usedTry();
          } else if (x >= 40 && x < 50) {
            $(".js-show .instruction").text("Someone forgot their long johns");
            $(".cold").addClass("cold-4");
            $(".guess-list").append("<li><span class='blue-2'>" + guess + "</span></li>");
            usedTry();
          } else {
            console.log("bang");
            $(".js-show .instruction").text("Colder than Ice!!");
            $(".cold").addClass("cold-5");
            $(".guess-list").append("<li><span class='blue-2'>" + guess + "</span></li>");
            usedTry();
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
      numAway = -numAway;
    } else {
      console.log("numbers away: " + numAway);
    } 
    return numAway;
  };

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
}

initialize();
$(".restart").click(initialize);








});

