var answer,tries,slideNumber, guess, error1, error2, slideStart, currentSlide;

$(document).ready(function(){

  var initialize = function() {

    answer = Math.floor(Math.random() * 100) + 1;
    tries = 0;
    slideNumber = 0;
    guess = 0;
    error1 = $(".error-1");
    error2 = $(".error-2");
    slideStart = currentSlide().find(".instruction");

    // sets up tries

    // updateTries();
    $(".try-wrap span").text('');

    // shows first slide

    $(".slide").removeClass("js-show");
    $(".slide").eq(0).addClass("js-show");

    // animates the scale on first load

    $(".hot").addClass("hot-5");
    $(".cold").addClass("cold-5");

    // clears guess list

    $(".guess-list").html("");

    console.log("answer: " + answer);
    console.log("slide number #: " + slideNumber);
  };

  //
  //
  // functions
  //
  //

  // captures slide for reset

  function captureSlide() {
    slideStart = currentSlide().find(".instruction"); 
  };

  function resetSlide() {
    currentSlide().find(".instruction").replaceWith(slideStart);
    resetInput();
    console.log("reset Slide");
  }

  // targets current slide

  function currentSlide() {
    return $(".slide:eq("+slideNumber+")");
  }

  // finds value of input on current slide

  function inputVal() {
    return currentSlide().find(".input").val();
  }

  // selects input on current slide

  function selectInput() {
    field = currentSlide().find(".input");
    field.focus();
    field.val('');
  }

  function resetInput() {
    field = currentSlide().find(".input");
    field.val('');
    console.log("reset input");
  }

  // moves to next slide

  function next() {
    currentSlide().removeClass("js-show");
    resetSlide();
    slideNumber += 1;
    currentSlide().addClass("js-show");
    captureSlide();
    selectInput();

    console.log("slide # " + slideNumber);
  }

  // verify value is a number

  function verifyNum(x) {
    console.log("verify number bang")

    // finds message area
    instruction = currentSlide().find(".instruction");
    
    if (isNaN(x)) {
      instruction.replaceWith(error1.show());
      selectInput();
      console.log("nan");
      return false;
    } else if (x < 1 || x > 100) {
      instruction.replaceWith(error2.show());
      selectInput();
      console.log("outside range");
      return false;
    } else {
      return Number(x); // return number in number format
    }
  };

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
    console.log("set tries bang")
    tries = inputVal(); // gets value input
    if (verifyNum(tries)) {
      console.log(tries + " tries verified")
      $(".try-wrap").addClass("js-show"); // turns on try amount info
      updateTries(); // changes try amount
      $(".hot").removeClass("hot-5");
      $(".cold").removeClass("cold-5");
      next();
    }
  };

  // subtract 1 try and update tries

  function usedTry() {
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

  // check guess

  function checkGuess() {
    var gp;                   // gues proximity
    guess = inputVal();       // get guess from input
    guess = verifyNum(guess); // verify guess

    // resets the hot cold scale
    $(".hot").attr('class', 'hot');    
    $(".cold").attr('class', 'cold');

    // resets after error
    $(".js-show .instruction").removeClass("error"); 

    if (guess) { // if guess is verified
      usedTry();
      gp = proximity(guess);
      updateGuess(guess);
      if (gp === 0) {
        next(); // you won slide
      } else if (tries === 0) {
        next(); //you lose slide;
        next();
      } else if (gp !== 0) {
        selectInput(); // clear input field;
      }
    }
  };

  // updates the settings based on the guess

  function updateGuess(guess) {

    // find the proximity of the guess to the answer
    x = proximity(guess);

    if (guess === answer) { // correct answer *fix
      $(".hot").addClass("hot-5");
      $(".guess-list").append("<li><span class='red-5'>" + guess + "</span></li>");
      // next();
    } else if (x < 10) {
      $(".js-show .instruction h2").text("Hot! Like Hansel!");
      $(".hot").addClass("hot-4");
      $(".guess-list").append("<li><span class='red-3'>" + guess + "</span></li>");
    } else if (x >= 10 && x < 20) {
      $(".js-show .instruction h2").text("Warm 106.9fm");
      $(".hot").addClass("hot-3");
      $(".guess-list").append("<li><span class='red-1'>" + guess + "</span></li>");
    } else if (x >= 20 && x < 30) {
      $(".js-show .instruction h2").text("Not Hot. Not Cold");
      $(".hot").addClass("hot-2");
      $(".cold").addClass("cold-2");
      $(".guess-list").append("<li><span class='grey'>" + guess + "</span></li>");
    } else if (x >= 30 && x < 40) {
      $(".js-show .instruction h2").text("A light jacket maybe?");
      $(".cold").addClass("cold-3");
      $(".guess-list").append("<li><span class='blue-1'>" + guess + "</span></li>");
    } else if (x >= 40 && x < 50) {
      $(".js-show .instruction h2").text("Someone forgot their long johns");
      $(".cold").addClass("cold-4");
      $(".guess-list").append("<li><span class='blue-3'>" + guess + "</span></li>");
    } else {
      $(".js-show .instruction h2").text("Colder than Ice!!");
      $(".cold").addClass("cold-5");
      $(".guess-list").append("<li><span class='blue-5'>" + guess + "</span></li>");
    } 
  }

  // timeline for the game

  $("button").click(function(){
    if (slideNumber === 0) {
      next();
      console.log("start button");
    } 
    else if (slideNumber === 1) {
      setTries();
      console.log("set tries button");
    } 
    else if (slideNumber === 2) {
      checkGuess();
      console.log("check guess button")
    }
    else {
      next();
    };
  }); 

  $(".restart").click(function(){
    resetSlide();
    initialize();
  });

  // call the initialize function
  initialize();

});

