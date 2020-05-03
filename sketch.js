// The original game, from which our game was adapted, is attributed to:
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

var timeLimit = 5;

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
  start_game_button.position((width / 2) - 56, height / 2);
  start_game_button.style('background-color', '#4CAF65');
  start_game_button.style('padding: 10px 27px');
  start_game_button.style('border-radius: 25px 25px 25px 25px');
  start_game_button.style('border: none');

  start_game_button.id('StartGameID');

  settings_button = createButton('Settings');
  settings_button.position((width / 2) - 45, (height / 2) + 50);
  settings_button.style('background-color', '#4CAF65');
  settings_button.style('padding: 10px 27px');
  settings_button.style('border-radius: 25px 25px 25px 25px');
  settings_button.style('border: none');

  settings_button.id('SettingsID');

  restart_button = createButton('Restart');
  restart_button.position((width / 2) - 20, (height / 2) + 100);
  restart_button.style('background-color', '#4CAF65');
  restart_button.style('padding: 5px 14px');
  restart_button.style('border-radius: 25px 25px 25px 25px');
  restart_button.style('border: none');
  restart_button.hide();

  restart_button.id('RestartID');

  leave_button = createButton('Main Menu');
  leave_button.position((width / 2) - 31.5, (height / 2) + 140);
  leave_button.style('background-color', '#4CAF65');
  leave_button.style('padding: 5px 14px');
  leave_button.style('border-radius: 25px 25px 25px 25px');
  leave_button.style('border: none');
  leave_button.hide();

  leave_button.id('LeaveID');

  return_to_main = createButton('Return to Main Menu');
  return_to_main.position(600, 575);
  return_to_main.style('background-color', '#4CAF65');
  return_to_main.style('padding: 5px 14px');
  return_to_main.style('border-radius: 25px 25px 25px 25px');
  return_to_main.style('border: none');
  return_to_main.hide();

  return_to_main.id("ReturnID");

  easiestModeButton = createButton(`10 pipes`);
  easiestModeButton.position(((width / 2) / 3) + 485, ((height / 1.6) + 75));
  easiestModeButton.style('background-color', '#4CAF65');
  easiestModeButton.style('padding: 15px 20px');
  easiestModeButton.style('border-radius: 25px 25px 25px 25px');
  easiestModeButton.style('cursor: pointer');
  easiestModeButton.style('border: none');
  easiestModeButton.hide();

  easiestModeButton.mousePressed(() => {
    speedSlider.value(10);
  });
  easiestModeButton.id('easiestMode');

  esayModeButton = createButton(`Easy`);
  esayModeButton.position(((width / 2) / 3) + 365, ((height / 1.6) + 75));
  esayModeButton.style('background-color', '#4CAF65');
  esayModeButton.style('padding: 15px 20px');
  esayModeButton.style('border-radius: 25px 25px 25px 25px');
  esayModeButton.style('cursor: pointer');
  esayModeButton.style('border: none');
  esayModeButton.hide();

  esayModeButton.mousePressed(() => {
    speedSlider.value(7);
  });
  esayModeButton.id('easyMode');

  normalModeButton = createButton(`Normal`);
  normalModeButton.position(((width / 2) / 3) + 225, ((height / 1.6) + 75));
  normalModeButton.style('background-color', '#4CAF65');
  normalModeButton.style('padding: 15px 20px');
  normalModeButton.style('border-radius: 25px 25px 25px 25px');
  normalModeButton.style('cursor: pointer');
  normalModeButton.style('border: none');
  normalModeButton.hide();

  normalModeButton.mousePressed(() => {
    speedSlider.value(5);
  });
  normalModeButton.id('normalMode');

  hardModeButton = createButton(`Hard`);
  hardModeButton.position(((width / 2) / 3) + 102, ((height / 1.6) + 75));
  hardModeButton.style('background-color', '#4CAF65');
  hardModeButton.style('padding: 15px 20px');
  hardModeButton.style('border-radius: 25px 25px 25px 25px');
  hardModeButton.style('cursor: pointer');
  hardModeButton.style('border: none');
  hardModeButton.hide();

  hardModeButton.mousePressed(() => {
    speedSlider.value(3);
  });
  hardModeButton.id('hardMode');

  hardestModeButton = createButton(`1 pipe`);
  hardestModeButton.position(((width / 2) / 3) - 30, ((height / 1.6) + 75));
  hardestModeButton.style('background-color', '#4CAF65');
  hardestModeButton.style('padding: 15px 20px');
  hardestModeButton.style('border-radius: 25px 25px 25px 25px');
  hardestModeButton.style('cursor: pointer');
  hardestModeButton.style('border: none');
  hardestModeButton.hide();

  hardestModeButton.mousePressed(() => {
    speedSlider.value(1);
  });
  hardestModeButton.id('hardestMode');

  // Slider
  speedSlider = createSlider(1, 9, 5, 1);
  speedSlider.position((width / 2) / 3, (height / 1.6) + 50);
  speedSlider.style('width', `${width * (2 / 3)}`);
  speedSlider.hide();

  // Answer Buttons
  answer_A = createButton("A");
  answer_A.position(40, 20);
  answer_A.style('background-color', '#4CAF65');
  answer_A.style('padding: 25px 30px');
  answer_A.style('border-radius: 25px 25px 25px 25px');
  answer_A.style('font-size: 40px');
  answer_A.style('cursor: pointer');
  answer_A.style('border: none');
  answer_A.hide();

  answer_A.id("AID");


  answer_B = createButton("B");
  answer_B.position(680, 20);
  answer_B.style('background-color', '#4CAF65');
  answer_B.style('padding: 25px 30px');
  answer_B.style('border-radius: 25px 25px 25px 25px');
  answer_B.style('font-size: 40px');
  answer_B.style('cursor: pointer');
  answer_B.style('border: none');
  answer_B.hide();

  answer_B.id("BID");


  answer_C = createButton("C");
  answer_C.style('background-color', '#4CAF65');
  answer_C.style('padding: 25px 30px');
  answer_C.style('border-radius: 25px 25px 25px 25px');
  answer_C.position(40, 500);
  answer_C.style('font-size: 40px');
  answer_C.style('cursor: pointer');
  answer_C.style('border: none');
  answer_C.hide();

  answer_C.id('CID');


  answer_D = createButton("D");
  answer_D.style('background-color', '#4CAF65');
  answer_D.style('padding: 25px 30px');
  answer_D.style('border-radius: 25px 25px 25px 25px');
  answer_D.position(680, 500);
  answer_D.style('font-size: 40px');
  answer_D.style('cursor: pointer');
  answer_D.style('border: none');
  answer_D.hide();

  answer_D.id("DID");


  // Changing Operations Buttons
  allOps_button = createButton('All Operations');
  allOps_button.position(334, 220);
  allOps_button.style('background-color', '#4CAF65');
  allOps_button.style('padding: 15px 20px');
  allOps_button.style('border-radius: 25px 25px 25px 25px');
  allOps_button.style('cursor: pointer');
  allOps_button.style('border: none');
  allOps_button.hide();

  allOps_button.id('AllOpsID');

  addition_button = createButton('Addition Only');
  addition_button.position(50, 270);
  addition_button.style('background-color', '#4CAF65');
  addition_button.style('padding: 15px 20px');
  addition_button.style('border-radius: 25px 25px 25px 25px');
  addition_button.style('cursor: pointer');
  addition_button.style('border: none');
  addition_button.hide();

  addition_button.id('AddID');

  subtraction_button = createButton('Subtraction Only');
  subtraction_button.position(225, 270);
  subtraction_button.style('background-color', '#4CAF65');
  subtraction_button.style('padding: 15px 20px');
  subtraction_button.style('border-radius: 25px 25px 25px 25px');
  subtraction_button.style('cursor: pointer');
  subtraction_button.style('border: none');
  subtraction_button.hide();

  subtraction_button.id("SubID");

  division_button = createButton('Division Only');
  division_button.position(425, 270);
  division_button.style('background-color', '#4CAF65');
  division_button.style('padding: 15px 20px');
  division_button.style('border-radius: 25px 25px 25px 25px');
  division_button.style('cursor: pointer');
  division_button.style('border: none');
  division_button.hide();

  division_button.id("DivID");

  multiplication_button = createButton('Multiplication Only');
  multiplication_button.position(600, 270);
  multiplication_button.style('background-color', '#4CAF65');
  multiplication_button.style('padding: 15px 20px');
  multiplication_button.style('border-radius: 25px 25px 25px 25px');
  multiplication_button.style('cursor: pointer');
  multiplication_button.style('border: none');
  multiplication_button.hide();

  multiplication_button.id("MultID");

  // Mouse Press Functionality
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
    startTheGame = true;
    goToSettings = false;
    start_game_button.hide();
    settings_button.hide();
  });

  settings_button.mousePressed(() => { // go to settings
    goToSettings = true;
    start_game_button.hide();
    settings_button.hide();

    allOps_button.show();
    addition_button.show();
    subtraction_button.show();
    division_button.show();
    multiplication_button.show();

    speedSlider.show();
    esayModeButton.show();
    normalModeButton.show();
    hardModeButton.show();

    hardestModeButton.show();
    easiestModeButton.show();

    star_wars = false;
    moana = false;
    south_park = false;
    fighter_jet = false;

    return_to_main.show();
  });

  restart_button.mousePressed(() => { // restart the game w/out going to menu
    startTheGame = true;
    goToSettings = false;
    restart_button.hide();
    leave_button.hide();
    reset();
  });

  leave_button.mousePressed(() => { // return to main menu from game
    startTheGame = false;
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

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });

  // Math Button Functionality
  allOps_button.mousePressed(() => { // home menu start
    subtraction_only = false;
    division_only = false;
    multiplication_only = false;
    addition_only = false;

    goToSettings = false;

    start_game_button.show();
    settings_button.show();

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });

  // Addition Start the Game
  addition_button.mousePressed(() => { // home menu start
    subtraction_only = false;
    division_only = false;
    multiplication_only = false;
    addition_only = true;

    goToSettings = false;

    start_game_button.show();
    settings_button.show();

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });

  // Subtraction Start the Game
  subtraction_button.mousePressed(() => { // home menu start
    addition_only = false;
    division_only = false;
    multiplication_only = false;
    subtraction_only = true;
    
    goToSettings = false;

    start_game_button.show();
    settings_button.show();

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });
  // Division Start the Game
  division_button.mousePressed(() => { // home menu start
    addition_only = false;
    subtraction_only = false;
    multiplication_only = false;
    division_only = true;

    goToSettings = false;

    start_game_button.show();
    settings_button.show();

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });

  // Multiplication Start the Game
  multiplication_button.mousePressed(() => { // home menu start
    addition_only = false;
    subtraction_only = false;
    division_only = false;
    multiplication_only = true;

    goToSettings = false;

    start_game_button.show();
    settings_button.show();

    allOps_button.hide();
    addition_button.hide();
    subtraction_button.hide();
    division_button.hide();
    multiplication_button.hide();
    return_to_main.hide();

    speedSlider.hide();
    esayModeButton.hide();
    normalModeButton.hide();
    hardModeButton.hide();
    hardestModeButton.hide();
    easiestModeButton.hide();
  });

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
    textSize(22);
    textAlign(CENTER);
    text('HOW TO PLAY:', width / 2, height/1.45);
    textSize(15);
    textAlign(CENTER);
    text('Pick the correct answer before time runs out!', width / 2, height/1.4);
    textAlign(CENTER);
    text('Select your answer by clicking with your mouse', width/2, height/1.35);
    textAlign(CENTER);
    text('OR', width/2, height/1.3);
    textAlign(CENTER);
    text('Select your answer with the TAB key & press ENTER', width/2, height/1.25);
  }

  if (startTheGame) {
    if (gameFrameCount == 0) {
      question = createQuestion();
    }
    answer_A.show();
    answer_B.show();
    answer_C.show();
    answer_D.show();

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

    // after every 3 pipes, check if the user's answer was correct
    if (count == speedSlider.value()) { // change to timelimit var
      if (userAnswer) {
        count = 0;
        userAnswer = false;
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
      var pipeCount = speedSlider.value() - count; // change 3 to timlimit var
      text('Pipes left: ' + pipeCount.toString(), (width / 2), height - 555);
    }

    showScores();

  } else if (goToSettings) {
    textSize(35);
    textAlign(CENTER, CENTER);
    text('Choose An Operation', width / 2, (height / 2)-110);
    textAlign(LEFT, BASELINE);

    textSize(35);
    textAlign(CENTER, CENTER);
    text('Set Game Speed', width / 2, (height / 1.6));
    textAlign(LEFT, BASELINE);

    textSize(12);
    textAlign(CENTER, CENTER);
    text(`(Pipes Per Question)`, width / 2, (height / 1.6)+25);
    textAlign(LEFT, BASELINE);
  }

}

function showScores() {
  textSize(32);
  textAlign(CENTER, CENTER)
  text('Score: ' + Math.floor(score / speedSlider.value()), width / 2, height - 50);
  text('Record: ' + Math.floor(maxScore / speedSlider.value()), width / 2, height - 20);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  let correctString = 'Correct Answer: '
  textSize(24);
  textAlign(CENTER, CENTER);
  text(correctString.concat(correctAnswer.toString()), width / 2, (height / 2) + 50);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;

  leave_button.show();
  restart_button.show();

  answer_A.hide();
  answer_B.hide();
  answer_C.hide();
  answer_D.hide();

  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = gameFrameCount - 1;
  count = 0;
  gameFrameCount = 0;
  loop();
}

function createQuestion() {
  let strings_of_equations = ['+', '-', 'x', '/']; // add filter
  let z = Math.floor(Math.random() * Math.floor(strings_of_equations.length)) // the operation

  if (addition_only == true) {
    z = 0;
  }
  if (subtraction_only == true) {
    z = 1;
  }
  if (division_only == true) {
    z = 3;
  }
  if (multiplication_only == true) {
    z = 2;
  }

  //generate random range_of_numbers
  let x = Math.floor(Math.random() * Math.floor(10)) // change 10 to a factor variable
  let y = Math.floor(Math.random() * Math.floor(10))
  
  while (x == 0 && y == 0) {
    x = Math.floor(Math.random() * Math.floor(10))
    y = Math.floor(Math.random() * Math.floor(10))
  }

  while (x == 0 || y == 0) {
    x = Math.floor(Math.random() * Math.floor(10))
    y = Math.floor(Math.random() * Math.floor(10))
  }

  switch (z) {
    case 0:
      correctAnswer = x + y;
      break;
    case 1:
      correctAnswer = x - y;
      break;
    case 2:
      correctAnswer = x * y;
      if (x == 0 || y == 0) {
        zeroCatch = true;
      }
      break;
    case 3:
      while (x % y != 0) {
        y = Math.floor(Math.random() * Math.floor(10));
      }
      correctAnswer = x / y;
      break;
  }


  let danger = 0

  let randomChoice = Math.floor(Math.random() * Math.floor(correctAnswer - y, correctAnswer + x));
  while (randomChoice == correctAnswer || randomChoice == (correctAnswer + x) || randomChoice == (correctAnswer - y)) {
    randomChoice = Math.floor(Math.random() * Math.floor(correctAnswer - y, correctAnswer + x));
    danger++;
    if (danger > 5) {
      console.log('danger danger');
      randomChoice = correctAnswer + x + y + 2;
      break;
    }
  }
  let choices = [correctAnswer, correctAnswer + x, correctAnswer - y, randomChoice];


  let shuffled = shuffleThis(choices);

  answer_A.html(shuffled[0]);
  answer_B.html(shuffled[1]);
  answer_C.html(shuffled[2]);
  answer_D.html(shuffled[3]);

  switch (shuffled.findIndex(element => element == correctAnswer)) {
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

// taken from stack overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
  if (keyCode == ENTER) {
    switch (document.activeElement) {
      case document.getElementById("StartGameID"):
        startTheGameF();
        break;
      case document.getElementById("SettingsID"):
        settingsF();
        break;
      case document.getElementById("RestartID"):
        resetF();
        break;
      case document.getElementById("ReturnID"):
        returnMainF();
        break;
      case document.getElementById("LeaveID"):
        leaveF();
        break;
      case document.getElementById("AID"):
        if (correctAnswerChoice == 0) {
          userAnswer = true;
        } else {
          userAnswer = false;
        }
        break;
      case document.getElementById("BID"):
        if (correctAnswerChoice == 1) {
          userAnswer = true;
        } else {
          userAnswer = false;
        }
        break;
      case document.getElementById("CID"):
        if (correctAnswerChoice == 2) {
          userAnswer = true;
        } else {
          userAnswer = false;
        }
        break;
      case document.getElementById("DID"):
        if (correctAnswerChoice == 3) {
          userAnswer = true;
        } else {
          userAnswer = false;
        }
        break;
      case document.getElementById("AddID"):
        addF();
        break;
      case document.getElementById("SubID"):
        subF();
        break;
      case document.getElementById("DivID"):
        divF();
        break;
      case document.getElementById("MultID"):
        multF();
        break;
      case document.getElementById("AllOpsID"):
        allOpsF();
        break;
      case document.getElementById("easyMode"):
        setEasyMode();
        break;
      case document.getElementById("normalMode"):
        setNormalMode();
        break;
      case document.getElementById("hardMode"):
        setHardMode();
        break;
      case document.getElementById("hardestMode"):
        setHarderMode();
        break;
      case document.getElementById("easiestMode"):
        setEasierMode();
        break;  
    }
  }
}

function setHarderMode() {
  speedSlider.value(1);
}

function setEasierMode() {
  speedSlider.value(10);
}

function setEasyMode() {
  speedSlider.value(7);
}

function setNormalMode() {
  speedSlider.value(5);
}

function setHardMode() {
  speedSlider.value(3);
}

function startTheGameF() {
  startTheGame = true;
  goToSettings = false;
  start_game_button.hide();
  settings_button.hide();
}

function settingsF() {
  goToSettings = true;
  start_game_button.hide();
  settings_button.hide();

  allOps_button.show();
  addition_button.show();
  subtraction_button.show();
  division_button.show();
  multiplication_button.show();

  speedSlider.show();
  esayModeButton.show();
  normalModeButton.show();
  hardModeButton.show();
  hardestModeButton.show();
  easiestModeButton.show();

  star_wars = false;
  moana = false;
  south_park = false;
  fighter_jet = false;

  return_to_main.show();
}

function resetF() {
  startTheGame = true;
  goToSettings = false;
  restart_button.hide();
  leave_button.hide();
  reset();
}

function leaveF() {
  startTheGame = false;
  goToSettings = false;
  leave_button.hide();
  restart_button.hide();
  start_game_button.show();
  settings_button.show();
  reset();
}

function returnMainF() {
  goToSettings = false;
  start_game_button.show();
  settings_button.show();
  return_to_main.hide();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}

function allOpsF() {
  subtraction_only = false;
  division_only = false;
  multiplication_only = false;
  addition_only = false;

  goToSettings = false;

  start_game_button.show();
  settings_button.show();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}

function addF() {
  subtraction_only = false;
  division_only = false;
  multiplication_only = false;
  addition_only = true;

  goToSettings = false;

  start_game_button.show();
  settings_button.show();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}

function subF() {
  addition_only = false;
  division_only = false;
  multiplication_only = false;
  subtraction_only = true;

  goToSettings = false;

  start_game_button.show();
  settings_button.show();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}

function divF() {
  addition_only = false;
  subtraction_only = false;
  multiplication_only = false;
  division_only = true;
  
  goToSettings = false;

  start_game_button.show();
  settings_button.show();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}

function multF() {
  addition_only = false;
  subtraction_only = false;
  division_only = false;
  multiplication_only = true;

  goToSettings = false;

  start_game_button.show();
  settings_button.show();

  allOps_button.hide();
  addition_button.hide();
  subtraction_button.hide();
  division_button.hide();
  multiplication_button.hide();
  return_to_main.hide();

  speedSlider.hide();
  esayModeButton.hide();
  normalModeButton.hide();
  hardModeButton.hide();
  hardestModeButton.hide();
  easiestModeButton.hide();
}