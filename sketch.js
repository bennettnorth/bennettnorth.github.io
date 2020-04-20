// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;

var count = 0;
var startTheGame = false;

var goToSettings = false;

var gameFrameCount = 0;

var userAnswer = false;

var correctAnswerChoice;

var answer_choice_A;
var answer_choice_B;
var answer_choice_C;
var answer_choice_D;

var addition_only = false;
var subtraction_only = false;
var division_only = false;
var multiplication_only = false;

var star_wars = false;
var moana = false;
var south_park = false;
var fighter_jet = false;

var question;
var new_question = false;

var correctAnswer = 0;
// var currTime = new Date();
// var startTime = 0;
// var endTime = 0;

function preload() {
  pipeBodySprite = loadImage('graphics/pipe_body.png');
  pipePeakSprite = loadImage('graphics/pipe_body.png');
  birdSprite = loadImage('graphics/og_bird.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);
  reset();

  start_game_button = createButton('Start Game');
  start_game_button.position((width/2)-40,height/2);
  start_game_button.style('background-color', '#4CAF65');
  start_game_button.style('padding: 10px 27px');
  start_game_button.style('border-radius: 25px 25px 25px 25px');
  start_game_button.style('border: none');

  settings_button = createButton('Settings');
  settings_button.position((width/2)-30,(height/2)+50);
  settings_button.style('background-color', '#4CAF65');
  settings_button.style('padding: 10px 27px');
  settings_button.style('border-radius: 25px 25px 25px 25px');
  settings_button.style('border: none');

  restart_button = createButton('Restart');
  restart_button.position((width/2)-20, (height/2)+100);
  restart_button.style('background-color', '#4CAF65');
  restart_button.style('padding: 5px 14px');
  restart_button.style('border-radius: 25px 25px 25px 25px');
  restart_button.style('border: none');
  restart_button.hide();

  leave_button = createButton('Main Menu');
  leave_button.position((width/2)-31.5, (height/2)+140);
  leave_button.style('background-color', '#4CAF65');
  leave_button.style('padding: 5px 14px');
  leave_button.style('border-radius: 25px 25px 25px 25px');
  leave_button.style('border: none');
  leave_button.hide();

  return_to_main = createButton('Return to Main Menu');
  return_to_main.position(600, 500);
  return_to_main.style('background-color', '#4CAF65');
  return_to_main.style('padding: 5px 14px');
  return_to_main.style('border-radius: 25px 25px 25px 25px');
  return_to_main.style('border: none');
  return_to_main.hide();
  
  answer_A = createButton("A");
  answer_A.position(40, 20);
  answer_A.style('background-color', '#4CAF65');
  answer_A.style('padding: 25px 30px');
  answer_A.style('border-radius: 25px 25px 25px 25px');
  answer_A.style('font-size: 40px');
  answer_A.style('cursor: pointer');
  answer_A.style('border: none');
  answer_A.hide();

  hint_a = createP('[Escape]');
  hint_a.position(50, 125);
  hint_a.hide();

  answer_B = createButton("B");
  answer_B.position(680, 20);
  answer_B.style('background-color', '#4CAF65');
  answer_B.style('padding: 25px 30px');
  answer_B.style('border-radius: 25px 25px 25px 25px');
  answer_B.style('font-size: 40px');
  answer_B.style('cursor: pointer');
  answer_B.style('border: none');
  answer_B.hide();

  hint_b = createP('[Backspace]');
  hint_b.position(690, 125);
  hint_b.hide();

  answer_C = createButton("C");
  answer_C.style('background-color', '#4CAF65');
  answer_C.style('padding: 25px 30px');
  answer_C.style('border-radius: 25px 25px 25px 25px');
  answer_C.position(40, 500);
  answer_C.style('font-size: 40px');
  answer_C.style('cursor: pointer');
  answer_C.style('border: none');
  answer_C.hide();

  hint_c = createP('[Shift]');
  hint_c.position(50, 565);
  hint_c.hide();

  answer_D = createButton("D");
  answer_D.style('background-color', '#4CAF65');
  answer_D.style('padding: 25px 30px');
  answer_D.style('border-radius: 25px 25px 25px 25px');
  answer_D.position(680, 500);
  answer_D.style('font-size: 40px');
  answer_D.style('cursor: pointer');
  answer_D.style('border: none');
  answer_D.hide();

  hint_d = createP('[Enter]');
  hint_d.position(690, 565);
  hint_d.hide();


  // Adding Difficulty Buttons
  addition_button = createButton('Addition Only');
  addition_button.position(50, 400);
  addition_button.style('background-color', '#4CAF65');
  addition_button.style('padding: 15px 20px');
  addition_button.style('border-radius: 25px 25px 25px 25px');
  addition_button.style('cursor: pointer');
  addition_button.style('border: none');
  addition_button.hide();

  subtraction_button = createButton('Subtraction Only');
  subtraction_button.position(225, 400);
  subtraction_button.style('background-color', '#4CAF65');
  subtraction_button.style('padding: 15px 20px');
  subtraction_button.style('border-radius: 25px 25px 25px 25px');
  subtraction_button.style('cursor: pointer');
  subtraction_button.style('border: none');
  subtraction_button.hide();

  division_button = createButton('Division Only');
  division_button.position(425, 400);
  division_button.style('background-color', '#4CAF65');
  division_button.style('padding: 15px 20px');
  division_button.style('border-radius: 25px 25px 25px 25px');
  division_button.style('cursor: pointer');
  division_button.style('border: none');
  division_button.hide();

  multiplication_button = createButton('Multiplication Only');
  multiplication_button.position(600, 400);
  multiplication_button.style('background-color', '#4CAF65');
  multiplication_button.style('padding: 15px 20px');
  multiplication_button.style('border-radius: 25px 25px 25px 25px');
  multiplication_button.style('cursor: pointer');
  multiplication_button.style('border: none');
  multiplication_button.hide();

  starWars_button = createButton("Star Wars");
  starWars_button. position(75, 200);
  starWars_button.style('color: white')
  starWars_button.style('background-color', '#000000');
  starWars_button.style('padding: 15px 20px');
  starWars_button.style('border-radius: 25px 25px 25px 25px');
  starWars_button.style('cursor: pointer');
  starWars_button.hide();

  moana_button = createButton("Moana");
  moana_button. position(250, 200);
  moana_button.style('color: white')
  moana_button.style('background-color', '#1BAAD8');
  moana_button.style('padding: 15px 20px');
  moana_button.style('border-radius: 25px 25px 25px 25px');
  moana_button.style('cursor: pointer');
  moana_button.hide();

  southPark_button = createButton("South Park");
  southPark_button. position(450, 200);
  southPark_button.style('color: white')
  southPark_button.style('background-color', '#D8241B');
  southPark_button.style('padding: 15px 20px');
  southPark_button.style('border-radius: 25px 25px 25px 25px');
  southPark_button.style('cursor: pointer');
  southPark_button.hide();

  fighterJet_button = createButton("Fighter Jet");
  fighterJet_button. position(625, 200);
  fighterJet_button.style('color: white')
  fighterJet_button.style('background-color', '#C2C2BD');
  fighterJet_button.style('padding: 15px 20px');
  fighterJet_button.style('border-radius: 25px 25px 25px 25px');
  fighterJet_button.style('cursor: pointer');
  fighterJet_button.hide();

  answer_A.mousePressed(() => {
    if (correctAnswerChoice == 0) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  });

  answer_B.mousePressed(() => {
    if (correctAnswerChoice == 1) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  });

  answer_C.mousePressed(() => {
    if (correctAnswerChoice == 2) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  });

  answer_D.mousePressed(() => {
    if (correctAnswerChoice == 3) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  });

  start_game_button.mousePressed(() => { // home menu start
    startTheGame=true;
    goToSettings = false;
    start_game_button.hide();
    settings_button.hide();
  });

  settings_button.mousePressed(() => { // go to settings
    goToSettings=true;
    start_game_button.hide();
    settings_button.hide();

    addition_button.show();
    subtraction_button.show();
    division_button.show();
    multiplication_button.show();

    starWars_button.show();
    moana_button.show();
    southPark_button.show();
    fighterJet_button.show();

    star_wars = false;
    moana = false;
    south_park = false;
    fighter_jet = false;

    return_to_main.show();
  });

  restart_button.mousePressed(() => { // restart the game w/out going to menu
    startTheGame=true;
    goToSettings = false;
    restart_button.hide();
    leave_button.hide();
    reset();
  });

  leave_button.mousePressed(() => { // return to main menu from game
    startTheGame=false;
    goToSettings = false;
    leave_button.hide();
    restart_button.hide();
    start_game_button.show();
    settings_button.show();
    reset();
  });

  return_to_main.mousePressed(() => { // return to main menu from settings
    goToSettings = false;
    start_game_button.show();
    settings_button.show();
    return_to_main.hide();

    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    starWars_button.hide();
    moana_button.hide();
    southPark_button.hide();
    fighterJet_button.hide();
  });

  // Math Button Functionality
    //Addition 

   // Addition Start the Game
  addition_button.mousePressed(() => { // home menu start
    subtraction_only = false;
    division_only = false;
    multiplication_only = false;

    addition_only = true;
    startTheGame=true;
    goToSettings = false;

    start_game_button.hide();
    settings_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();
  });

   // Subtraction Start the Game
  subtraction_button.mousePressed(() => { // home menu start
    addition_only = false;
    division_only = false;
    multiplication_only = false;

    subtraction_only = true;
    startTheGame=true;
    goToSettings = false;

    start_game_button.hide();
    settings_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();
  });
   // Division Start the Game
  division_button.mousePressed(() => { // home menu start
    addition_only = false;
    subtraction_only = false;
    multiplication_only = false;

    division_only = true;
    startTheGame=true;
    goToSettings = false;

    start_game_button.hide();
    settings_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();
  });

    // Multiplication Start the Game
  multiplication_button.mousePressed(() => { // home menu start
    addition_only = false;
    subtraction_only = false;
    division_only = false;
  
    multiplication_only = true;
    startTheGame=true;
    goToSettings = false;

    start_game_button.hide();
    settings_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();
  });

  starWars_button.mousePressed(() => { // start game with star wars theme
    
    pipeBodySprite = loadImage('graphics/lightsaber.png');
    pipePeakSprite = loadImage('graphics/lightsaber.png');
    birdSprite = loadImage('graphics/babyYoda.png');
    //bgImg = loadImage('graphics/starWarsBackg.png');
    
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();

    return_to_main.hide();
    startTheGame=true;
    goToSettings = false;
  });

  // moana_button.mousePressed(() => { // moana themed game
  //   moana = true;

  //   addition_only = false;
  //   subtraction_only = false;
  //   multiplication_button = false;
  //   division_only = false;
    
  //   startTheGame=true;
  //   goToSettings = false;

  //   start_game_button.hide();
  //   settings_button.hide();

  //   addition_button.hide();
  //   subtraction_button.hide();
  //   division_button.hide();
  //   multiplication_button.hide();
  
  //   return_to_main.hide();
  // });

  // southPark_button.mousePressed(() => { // south park themed game
  //   south_park = true;

  //   addition_only = false;
  //   subtraction_only = false;
  //   multiplication_button = false;
  //   division_only = false;
    
  //   startTheGame=true;
  //   goToSettings = false;

  //   start_game_button.hide();
  //   settings_button.hide();

  //   addition_button.hide();
  //   subtraction_button.hide();
  //   division_button.hide();
  //   multiplication_button.hide();
  
  //   return_to_main.hide();
  // });

  // fighterJet_button.mousePressed(() => { // fighter jet theme
  //   fighter_jet = true;

  //   addition_only = false;
  //   subtraction_only = false;
  //   multiplication_button = false;
  //   division_only = false;
    
  //   startTheGame=true;
  //   goToSettings = false;

  //   start_game_button.hide();
  //   settings_button.hide();

  //   addition_button.hide();
  //   subtraction_button.hide();
  //   division_button.hide();
  //   multiplication_button.hide();
  
  //   return_to_main.hide();
  // });

}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  if (!startTheGame) {
    textSize(64);
    textAlign(CENTER);
    text('Mathy Bird', width / 2, height / 5.5);
  }
  if (!startTheGame && !goToSettings) {
    textSize(12);
    textAlign(CENTER);
    text('How to Play: \n Select the correct answer before your time runs out! \n choose with either your mouse or with the arrow keys \n Most importantly, Have Fun!', width /2, height -175);
  }

  if (startTheGame) {
    if (gameFrameCount==0) {
      question = createQuestion();
    }
    if (gameFrameCount<(420*2)) {
        hint_a.show();
        hint_b.show();
        hint_c.show();
        hint_d.show();
    } else if (gameFrameCount>(420*2)) {
        hint_a.hide();
        hint_b.hide();
        hint_c.hide();
        hint_d.hide();
    }
    answer_A.show();
    answer_B.show();
    answer_C.show();
    answer_D.show();

    starWars_button.hide();
    moana_button.hide();
    southPark_button.hide();
    fighterJet_button.hide();


    // if(moana) {
    //   pipeBodySprite = loadImage('graphics/waterSpout.jpg');
    //   pipePeakSprite = loadImage('graphics/pipe_body.jpg');
    //   birdSprite = loadImage('graphics/moana.jpg');
    //   bgImg = loadImage('graphics/moanaBackgroung.jpg');
    // }

    // if(south_park) {
    //   pipeBodySprite = loadImage('graphics/scottTenorman.png');
    //   pipePeakSprite = loadImage('graphics/scottTenorman.png');
    //   birdSprite = loadImage('graphics/cartman.png');
    //   bgImg = loadImage('graphics/southParkBackground.png');
    // }

    // if(fighter_jet) {
    //   pipeBodySprite = loadImage('graphics/skyscraper.png');
    //   pipePeakSprite = loadImage('graphics/skyscraper.png');
    //   birdSprite = loadImage('graphics/fighterJet.png');
    //   bgImg = loadImage('graphics/blueSkyBackground.png');
    // }

    gameFrameCount++;
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].pass(bird)) {
        score++;
        count++;
      }

      if (pipes[i].hits(bird)) {
        gameover();
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if ((gameFrameCount - gameoverFrame) % 150 == 0) {
      pipes.push(new Pipe());
    }

    // if ((frameCount - gameoverFrame) % 150 == 0) {
    //   pipes.push(new Pipe());
    // }


  // after every 3 pipes, check if the user's answer was correct
    if (count==3) {
      if (userAnswer) {
        count=0;
        userAnswer=false;
        question = createQuestion();
      } else {
        bird.wrongAnswer();
        bird.update();
      }
    }

    if (!isOver) {
      fill('#ffffff');
      rect(200, 20, 395, 120, 20);

      fill('#000000');
      textSize(64);
      text(question, width / 2, (height / 2) - 190);
      textSize(25);
      var pipeCount = 3-count;
      text('Pipes left: ' + pipeCount.toString(), (width/2), height - 555);
    }

    showScores();

    // touches is an list that contains the positions of all
    // current touch points positions and IDs
    // here we check if touches' length is bigger than one
    // and set it to the touched var
    // touched = (touches.length > 0);
    //
    // // if user has touched then make bird jump
    // // also checks if not touched before
    // if (touched && !prevTouched) {
    //   bird.up();
    // }
    //
    // // updates prevTouched
    // prevTouched = touched;
  } else if (goToSettings) {
      // this is where we can add costomization
      textSize(35);
      textAlign(CENTER, CENTER);
      text('Choose a Theme', width/2, height/3.9);
      textAlign(LEFT, BASELINE);

      textSize(16);
      textAlign(CENTER, CENTER);
      text('(These buttons are not yet functional.)', width/2, height/3.3)
      
      textSize(35);
      textAlign(CENTER, CENTER);
      text('Choose An Operation', width / 2, height / 1.7);
      textAlign(LEFT, BASELINE);
  }

}

function showScores() {
  textSize(32);
  textAlign(CENTER, CENTER)
  text('Score: ' + score, width/2, height-50);
  text('Record: ' + maxScore, width/2, height-20);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  let correctString = 'Correct Answer: '
  textSize(24);
  textAlign(CENTER, CENTER);
  text(correctString.concat(correctAnswer.toString()), width / 2, (height / 2)+50);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;

  leave_button.show();
  restart_button.show();

  answer_A.hide();
  answer_B.hide();
  answer_C.hide();
  answer_D.hide();

  //answer_choice_A.html(' ');
  //answer_choice_B.html(' ');
  //answer_choice_C.html(' ');
  //answer_choice_D.html(' ');

  hint_a.hide();
  hint_b.hide();
  hint_c.hide();
  hint_d.hide();

  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  //gameoverFrame = frameCount - 1;
  gameoverFrame = gameFrameCount - 1;
  count = 0;
  gameFrameCount = 0;
  loop();
}

function createQuestion() {
  let strings_of_equations = ['+', '-', 'x', '/']; // add filter
  let z = Math.floor(Math.random() * Math.floor(strings_of_equations.length)) // the operation

  if(addition_only == true ){
     z = 0;
  } 
  if(subtraction_only == true){
     z = 1;
  }
  if(division_only == true){
     z = 3;
  }
  if(multiplication_only == true){
     z =2;
  } 
  
  
  
  //let strings_of_equations = ['+', '-', 'x', '/']; // add filter

  //generate random range_of_numbers
  let x = Math.floor(Math.random() * Math.floor(10)) // change 10 to a factor variable
  let y = Math.floor(Math.random() * Math.floor(10))
  //let z = Math.floor(Math.random() * Math.floor(strings_of_equations.length)) // the operation

  while (x == 0 && y == 0) {
    x = Math.floor(Math.random() * Math.floor(10))
    y = Math.floor(Math.random() * Math.floor(10))
  }

  while (x == 0 || y == 0) {
    x = Math.floor(Math.random() * Math.floor(10))
    y = Math.floor(Math.random() * Math.floor(10))
  }

  switch(z) {
    case 0:
      correctAnswer=x+y;
      break;
    case 1:
      correctAnswer=x-y;
      break;
    case 2:
      correctAnswer=x*y;
      if (x==0 || y==0) {
        zeroCatch = true;
      }
      break;
    case 3:
      while (x%y!=0) {
        y = Math.floor(Math.random() * Math.floor(10));
      }
      correctAnswer=x/y;
      break;
  }


  let danger = 0
  
  let randomChoice = Math.floor(Math.random() * Math.floor(correctAnswer-y,correctAnswer+x));
  while (randomChoice==correctAnswer || randomChoice==(correctAnswer+x) || randomChoice==(correctAnswer-y)) {
    randomChoice = Math.floor(Math.random() * Math.floor(correctAnswer-y,correctAnswer+x));
    danger++;
    if (danger>5) {
      console.log('danger danger');
      randomChoice = correctAnswer+x+y+2;
      break;
    } 
  }
  let choices = [correctAnswer, correctAnswer+x, correctAnswer-y, randomChoice];
  

  let shuffled = shuffleThis(choices);

  answer_A.html(shuffled[0]);
  answer_B.html(shuffled[1]);
  answer_C.html(shuffled[2]);
  answer_D.html(shuffled[3]);

  switch (shuffled.findIndex(element => element==correctAnswer)) {
    case 0:
      correctAnswerChoice = 0;
      break;
    case 1:
      correctAnswerChoice = 1;
      break;
    case 2:
      correctAnswerChoice = 2;
      break;
    case 3:
      correctAnswerChoice = 3;
      break;
  }

  var return_string = x.toString().concat(' ', strings_of_equations[z]);
  return_string = return_string.concat(' ', y.toString());

  return return_string.concat(' =  ?');
}

// stolen from stack overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleThis(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function keyPressed() {
  // if (key === ' ') {
  //   //bird.up();
  //   gameover()
  //   if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  // }
  if (keyCode == ESCAPE) {
    if (correctAnswerChoice == 0) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  } else if (keyCode == BACKSPACE) {
    if (correctAnswerChoice == 1) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  } else if (keyCode == SHIFT) {
    if (correctAnswerChoice == 2) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  } else if (keyCode == ENTER) {
    if (correctAnswerChoice == 3) {
      userAnswer = true;
    } else {
      userAnswer = false;
    }
  }

}
//
// function touchStarted() {
//   if (isOver) reset();
// }
