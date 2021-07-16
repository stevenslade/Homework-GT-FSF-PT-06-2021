//Declare my variables
var introHeader = document.querySelector("h1");
var instructions = document.querySelector("#instructions");
var highScore = document.querySelector('#highscore');
var question = document.querySelector('#question');
var submitBtn = document.querySelector("#submit");

var timer =0;

//user initials
//score
//timer
//start button
//submit button
//question

var quizQuestions = [
    {
      question: "Q1",
      answers: {
        a: "A1",
        b: "B1",
        c: "C1"
      },
      correctAnswer: "c"
    },
    {
      question: "Q2",
      answers: {
        a: "A2",
        b: "B2",
        c: "C2"
      },
      correctAnswer: "c"
    },
    {
      question: "Q3",
      answers: {
        a: "A3",
        b: "B3",
        c: "C3",
        d: "D3"
      },
      correctAnswer: "c"
    },
    {
        question: "Q4",
        answers: {
          a: "A4",
          b: "B4",
          c: "C4"
        },
        correctAnswer: "c"
      },
      {
        question: "Q5",
        answers: {
          a: "A5",
          b: "B5",
          c: "C5"
        },
        correctAnswer: "c"
      }
  ];

//init function - when page loads it presents the instructions, header and a start button, it clears questions, submit and high scores
function init() {
    introHeader.textContent = "Coding Quiz Challenge";
    instructions.textContent = "Answer the following questions as quickly as possible to acheive a high score. Incorrect answers will penalize you ten seconds."
    highScore.textContent = "";
    question.textContent = "";
    
}


//Game function - when the user clicks start it starts the game

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
  }



//win function, if the user wins it records the score and initials


//display high score function - displays the high scores when the button is clicked



//timer function - starts at 75 seconds counts down



// Calls init() when page loads
init();