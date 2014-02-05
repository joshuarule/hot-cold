var answer,tries,slideNumber, guess, error1, error2, slideStart, currentSlide, prevGuess, guessList;

$(document).ready(function(){

  var initialize = function() {

    answer = Math.floor(Math.random() * 100) + 1;
    tries = 0;
    slideNumber = 0;
    guess = 0;
    slideStart = currentSlide().find(".instruction");
    prevGuess = 0;
    guessList = [];

    captureSlide();

    // sets up tries

    // updateTries();
    $(".try-wrap span").text('');

    // shows first slide

    $(".slide").removeClass("js-show");
    $(".slide").eq(0).addClass("js-show");

    $("#start").focus();

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
    slideStart = currentSlide().find(".instruction h2").clone(); 
    console.log("capture Slide");
  };

  function resetSlide() {
    currentSlide().find(".instruction").html(slideStart);
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
    console.log("slide # " + slideNumber);
    captureSlide();
    selectInput();

    
  }

  // verify value is a number

  function verifyNum(x) {
    console.log("verify number bang")
    
    if (isNaN(x)) {
      $(".js-show .instruction h2").html("That is not a number");
      $(".js-show .instruction h2").addClass("error");
      selectInput();
      return false;
    } else if (x < 1 || x > 100) {
      $(".js-show .instruction h2").html("Number must be between 1 - 100");
      $(".js-show .instruction h2").addClass("error");
      selectInput();
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

  function proximity(x) {
    var numAway = (answer - x);
    if (numAway < 0) {
      //console.log("numbers away: " + -numAway);
      numAway = -numAway;
    } else {
      //console.log("numbers away: " + numAway);
    } 
    return numAway;
  };
  
  function updateList(listHtml) {

    var closestGuess = guessList[0];
    var closestGuessIndex = 0;
    var listItems = $('.guess-list li');
    
    if (guessList.length === 0) {
      $(".guess-list").html(listHtml);
      guessList.push(Number(guess));
      console.log("guessList length is 0: " + guessList.length);
    } 

    else {
    console.log(guessList);
    guessList = []; //resets the guess list

    // adds all of the existing guesses to array
    $(listItems).each(function(){ 
      guessList.push(Number($(this).text()));
      console.log("guessList after each: " + guessList);
    });
    
    
    for (i = 0; i < guessList.length; i++) {
      if (proximity(guess) < proximity(guessList[i])) {
        closestGuessIndex = i;
        closestGuess = guessList[i];
      }
    }

    console.log("closestGuessIndex: " + closestGuessIndex);
    console.log("closestGuess: " + closestGuess);

    if (proximity(guess) < proximity(closestGuess)) {
        //console.log(guess + " bang");
        console.log(closestGuess + " bang");
        console.log(closestGuessIndex + " bang");

        $(listItems).eq(closestGuessIndex).after(listHtml);
        guessList.splice((closestGuessIndex + 1),0,Number(guess));
        console.log(guess + " is closer than " + closestGuess);

        
      } else {
        //console.log(guess + " bang2");
        console.log(closestGuess + " bang2");
        console.log(closestGuessIndex + " bang2");
        $(listItems).eq(closestGuessIndex).before(listHtml);
        guessList.splice(closestGuessIndex,0,Number(guess));
        console.log(guess + " is further than " + closestGuess);
      }
    }
    console.log(guessList);
  } 


  // check guess

  function checkGuess() {
    var gp;                   // gues proximity
    guess = inputVal();       // get guess from input
    guess = verifyNum(guess); // verify guess

    // resets the hot cold scale
    $(".hot").attr('class', 'hot');    
    $(".cold").attr('class', 'cold');

    // resets after error
    // $(".js-show .instruction h2").removeClass("error"); 

    if (guess) { // if guess is verified
      $(".js-show .instruction h2").removeClass("error");
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

  // function addGuess() {

  // }

  // function addGuess(guessText) {
  //   var prevGuessLoc = $(".guess-list li").find("span:contains('" + prevGuess + "')");

  //   if (guess > prevGuess) {
  //     console.log("greater that previous guess");
  //     console.log($(prevGuessLoc));
  //     $($(prevGuessLoc)).append("append");
  //   } else if (guess < prevGuess) {
  //     console.log("less than previous guess")
  //     $($(prevGuessLoc)).prepend("prepend");
  //   }
  // }

  // updates the settings based on the guess

  function updateGuess(guess) {

    // find the proximity of the guess to the answer
    x = proximity(guess);

    if (guess === answer) { // correct answer *fix
      $(".hot").addClass("hot-5");
      updateList("<li><span class='red-5'>" + guess + "</span></li>");
    } else if (x < 10) {
      $(".js-show .instruction h2").text("Hot! Like Hansel!");
      $(".hot").addClass("hot-4");
      updateList("<li><span class='red-3'>" + guess + "</span></li>");
    } else if (x >= 10 && x < 20) {
      $(".js-show .instruction h2").text("Warm 106.9fm");
      $(".hot").addClass("hot-3");
      updateList("<li><span class='red-1'>" + guess + "</span></li>");
    } else if (x >= 20 && x < 30) {
      $(".js-show .instruction h2").text("Not Hot. Not Cold");
      $(".hot").addClass("hot-2");
      $(".cold").addClass("cold-2");
      updateList("<li><span class='grey'>" + guess + "</span></li>");
    } else if (x >= 30 && x < 40) {
      $(".js-show .instruction h2").text("A light jacket maybe?");
      $(".cold").addClass("cold-3");
      updateList("<li><span class='blue-1'>" + guess + "</span></li>");
    } else if (x >= 40 && x < 50) {
      $(".js-show .instruction h2").text("Someone forgot their long johns");
      $(".cold").addClass("cold-4");
      updateList("<li><span class='blue-3'>" + guess + "</span></li>");
    } else {
      $(".js-show .instruction h2").text("Colder than Ice!!");
      $(".cold").addClass("cold-5");
      updateList("<li><span class='blue-5'>" + guess + "</span></li>");
    } 

    prevGuess = guess; // sets previous guess
  }

  var slideChecker = function(){
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
  };

  // timeline for the game

  $("button").click(slideChecker);

  $(".input").keypress(function(e){
    console.log(e.which);
    if (e.which === 13) {
      slideChecker();
    }
  });

  $(".restart").click(function(){
    resetSlide();
    initialize();
  });

  // call the initialize function
  initialize();

});

