$(document).ready(function(){

  //
  // initialize
  //

  var initialize = function() {

    // Generates Random Number
    var answer = Math.floor(Math.random() * 100) + 1;
    console.log("answer: " + answer);

    // set tries

    var tries = 0;
    updateTries();
    $(".try-wrap span").text('');

    // set intial slide #

    var slideNumber = 0;
    console.log("slide number #: " + slideNumber);

    // set guess

    var guess = 0;

    // shows first slide

    $(".slide").removeClass("js-show");
    $(".slide").eq(0).addClass("js-show");

    // animates the scale on first load

    $(".hot").addClass("hot-5");
    $(".cold").addClass("cold-5");

    // clears guess list

    $(".guess-list").html("");


    //
    //
    // functions
    //
    //

    // verify value is a number

    function verifyNum(x) {

      // clones the error states 
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

    // selects input on current slide

    function selectInput() {
      currentSlide().find("input").focus(function(){
        $(this).select();
      });
    }

    // moves to next slide

    function next() {
      currentSlide().removeClass("js-show");
      slideNumber++;
      currentSlide().addClass("js-show");
      selectInput();
      console.log("slide # " + slideNumber);
    }

    // Updates tries

    function updateTries() {
      if (tries > 1 || tries === 0) {
        $(".tries").text(tries + " tries left");
      } else {
        $(".tries").text(tries + " try left");
      }
      console.log("Number of tries left: " + (tries));
    };

    // set tries

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

    function usedTry() { // minus 1 try and update
      tries--;
      updateTries();
    };

    // proximity() finds how far guess is from answer

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

    function updateGuess(guess) {

      // find the proximity of the guess to the answer
      x = proximity(guess);

      if (guess === answer) { // correct answer *fix
        $(".hot").addClass("hot-5");
        $(".guess-list").append("<li><span class='red-5'>" + guess + "</span></li>");
        next();
      } else if (x < 10) {
        $(".js-show .instruction").text("Hot! Like Hansel!");
        $(".hot").addClass("hot-4");
        $(".guess-list").append("<li><span class='red-3'>" + guess + "</span></li>");
      } else if (x >= 10 && x < 20) {
        $(".js-show .instruction").text("Warm 106.9");
        $(".hot").addClass("hot-3");
        $(".guess-list").append("<li><span class='red-1'>" + guess + "</span></li>");
      } else if (x >= 20 && x < 30) {
        $(".js-show .instruction").text("Not Hot. Not Cold");
        $(".hot").addClass("hot-2");
        $(".cold").addClass("cold-2");
        $(".guess-list").append("<li><span class='grey'>" + guess + "</span></li>");
      } else if (x >= 30 && x < 40) {
        $(".js-show .instruction").text("A light jacket maybe?");
        $(".cold").addClass("cold-3");
        $(".guess-list").append("<li><span class='blue-1'>" + guess + "</span></li>");
      } else if (x >= 40 && x < 50) {
        $(".js-show .instruction").text("Someone forgot their long johns");
        $(".cold").addClass("cold-4");
        $(".guess-list").append("<li><span class='blue-3'>" + guess + "</span></li>");
      } else {
        $(".js-show .instruction").text("Colder than Ice!!");
        $(".cold").addClass("cold-5");
        $(".guess-list").append("<li><span class='blue-5'>" + guess + "</span></li>");
      } 
    }

    // check guess

    function checkGuess() {
      guess = inputVal(); // get guess from input
      guess = verifyNum(guess);

      // resets the hot cold scale
      $(".hot").attr('class', 'hot');    
      $(".cold").attr('class', 'cold');

      // resets after error
      $(".js-show .instruction").removeClass("error"); 
      
      if (guess) { // if guess is verified
        updateGuess(guess);
        usedTry();
      }
      
      if (tries === 0) { // if you run out of tries
        usedTry();
        next();
        next();
      } 
      
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

  // call the initialize function
  initialize();
  $(".restart").click(initialize);

});

