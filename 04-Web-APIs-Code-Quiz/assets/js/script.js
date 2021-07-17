//Declare my variables
var introHeader = document.querySelector("h1");
var instructions = document.querySelector("#instructions");
var highScore = document.querySelector('#highscore');
var question = document.querySelector('#question');
var answerChoices = document.querySelector("#answer-choices");
var submitBtn = document.querySelector("#submit-button");

var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");


var timer;
var timerCount;
var isWin = false;

var userInitials;
var score;

//questions

var quizQuestions = [
    {
      question: "Q1",
      answers: {
        a: "A1",
        b: "B1",
        c: "Correct",
        d: "D1"
      },
      correctAnswer: "c"
    },
    {
      question: "Q2",
      answers: {
        a: "Correct",
        b: "B2",
        c: "C2",
        d: "D2"
      },
      correctAnswer: "a"
    },
    {
      question: "Q3",
      answers: {
        a: "A3",
        b: "Correct",
        c: "C3",
        d: "D3"
      },
      correctAnswer: "b"
    },
    {
        question: "Q4",
        answers: {
          a: "A4",
          b: "B4",
          c: "Correct",
          d: "D4"
        },
        correctAnswer: "c"
      },
      {
        question: "Q5",
        answers: {
          a: "A5",
          b: "B5",
          c: "Correct",
          d: "D5"
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


// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
    askQuestions();
  }

// Function to cycle thru the questions
function askQuestions() {
    var response;
    for (var i =0; i < quizQuestions.length; i++) {
        question.textContent = quizQuestions[i].question;
        answerChoices.textContent = quizQuestions[i].answers.a;
        response = window.prompt('Answer');
    }
}

//Function to check if answer correct or incorrect
//Incorrect needs to decrement timerCount

//win function, if the user wins it records the score and initials


//display high score function - displays the high scores when the button is clicked

//function to reset highscore memory

//timer function - starts at 75 seconds counts down
// The startTimer function starts and stops the timer 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = "Timer: " + timerCount;
      //thisneeds to be if timer >0 and all questions answered save time, clear interval, win game
      if (timerCount >= 0 ) {
        // Tests if win condition is met
        //if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          //clearInterval(timer);
          //winGame();
        //}
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        //loseGame();
      }
    }, 1000);
  }

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() when page loads
init();