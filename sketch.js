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

let title_text = 'Mathy Bird';

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
  start_game_button.position(400,300);

  settings_button = createButton('Settings');
  settings_button.position(400,325);

  restart_button = createButton('Restart');
  restart_button.position(380, 400);
  restart_button.hide();

  leave_button = createButton('Main Menu');
  leave_button.position(380, 425);
  leave_button.hide();

  return_to_main = createButton('Return to Main Menu');
  return_to_main.position(600, 500);
  return_to_main.hide();

  start_game_button.mousePressed(() => {
    startTheGame=true;
    start_game_button.hide();
    settings_button.hide();
  });

  settings_button.mousePressed(() => {
    goToSettings=true;
    start_game_button.hide();
    settings_button.hide();
    return_to_main.show();
  });

  restart_button.mousePressed(() => {
    startTheGame=true;
    restart_button.hide();
    leave_button.hide();
    reset();
  });

  leave_button.mousePressed(() => {
    startTheGame=false;
    leave_button.hide();
    restart_button.hide();
    start_game_button.show();
    settings_button.show();
    reset();
  });

  return_to_main.mousePressed(() => {
    goToSettings = false;
    start_game_button.show();
    settings_button.show();
    return_to_main.hide();
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

  

  if (startTheGame) {
    title_text.hide();
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

    if ((frameCount - gameoverFrame) % 150 == 0) {
      pipes.push(new Pipe());
    }

  // this is where we are going to put the prompt for questions
    if (count==3) {
      //noLoop()
      // call a function returns true or false
      // if (true) {
      //   loop()
      // } else {
      //   false
      // }
      bird.wrongAnswer();
      bird.update();
    }
    //print(count)

    showScores();

    // touches is an list that contains the positions of all
    // current touch points positions and IDs
    // here we check if touches' length is bigger than one
    // and set it to the touched var
    touched = (touches.length > 0);

    // if user has touched then make bird jump
    // also checks if not touched before
    if (touched && !prevTouched) {
      bird.up();
    }

    // updates prevTouched
    prevTouched = touched;
  } else if (goToSettings) {
      // this is where we can add costomization
      textSize(64);
      textAlign(CENTER, CENTER);
      text('COMING SOON', width / 2, height / 2);
      textAlign(LEFT, BASELINE);
  }

}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;

  leave_button.show();
  restart_button.show();

  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  count = 0;
  loop();
}

// function keyPressed() {
//   if (key === ' ') {
//     //bird.up();
//     gameover()
//     if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
//   }
//
// }
//
// function touchStarted() {
//   if (isOver) reset();
// }
