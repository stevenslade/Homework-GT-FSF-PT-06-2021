//Declare my variables
var introContainer = document.querySelector("#intro");
var questionContainer = document.querySelector("#question-container");
var scoreContainer = document.querySelector("#score-container");
var summaryContainer = document.querySelector("#summary");
var highScore = document.querySelector("#high-score");
var correctMessage = document.querySelector("#correct-message");
var scoreMessage = document.querySelector("#score-message");

//using these variables to display my questions
var achoice = document.querySelector("#achoice");
var bchoice = document.querySelector("#bchoice");
var cchoice = document.querySelector("#cchoice");
var dchoice = document.querySelector("#dchoice");

var question = document.querySelector('#question');
var answerChoices = document.querySelector("#answer-choices");
var submitButton = document.querySelector("#submit-button");
var returnButton = document.querySelector("#return-button");
var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");
var clearButton = document.querySelector("#clear-button");

var timer;
var timerCount;

var initials = "BSS";
var score = 10;

var respose;

//New variables to attempt the render question method
var questionCounter = 0;


//questions with placeholder information

var quizQuestions = [
    {
      question: "This is question one",
      answers: ["A1", "B1", "Correct", "D1"],
      correctAnswer: "c"
    },
    {
      question: "Q2",
      answers: ["Correct", "B1", "C1", "D1"],
      correctAnswer: "a"
    },
    {
      question: "Q3",
      answers: ["A1", "Correct", "C1", "D1"],
      correctAnswer: "b"
    },
    {
        question: "Q4",
        answers: ["A1", "B1", "Correct", "D1"],
        correctAnswer: "c"
      },
      {
        question: "Q5",
        answers: ["A1", "B1", "Correct", "D1"],
        correctAnswer: "c"
      }
  ];

//init function - when page loads it presents the instructions, header and a start button, it clears questions, submit and high scores
function init() {
    //This function will hide the uneeded cards at load
 console.log("I'm init");
 introContainer.style.display = "block";
 //these will be uncommented to activate hidden when page loads
 //questionContainer.style.display = "none";
 //scoreContainer.style.display = "none";
 //summaryContainer.style.display = "none"; 
}

// The startGame function is called when the start button is clicked
function startGame() {
  
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    introContainer.style.display = "none";

    startTimer()
    askQuestions();
  }

// Function to cycle thru the questions

// This function needs an redo, once the start game button is pressed the 
// question-container should be displayed
// the question container should use questioncounter to populate the card
// each choice would need to be a button
// each button could have the same response a compare answer function
// compare answer adjusts score and increments the questioncounter, it runs ask 
// question until the counter reaches the max value

// var questionIndex = 0;

function renderQuestion(){

        question.textContent = quizQuestions[questionIndex].question;
        achoice.textContent = quizQuestions[i].answers[0];
        bchoice.textContent = quizQuestions[i].answers[1];
        cchoice.textContent = quizQuestions[i].answers[2];
        dchoice.textContent = quizQuestions[i].answers[3];

}

function askQuestions() {
  
  response = "";

    for (var i =0; i < quizQuestions.length; i++) {
        correctMessage.style.display = "none";

        question.textContent = quizQuestions[i].question;
        achoice.textContent = quizQuestions[i].answers[0];
        bchoice.textContent = quizQuestions[i].answers[1];
        cchoice.textContent = quizQuestions[i].answers[2];
        dchoice.textContent = quizQuestions[i].answers[3];

        achoice.addEventListener("click", function() {
          response = "a";
          console.log(response);
        });


        //collect a user click event

        //compare user click event to correct response

        //if response if wrong, then decrease timer by five seconds
        //else continue
        
        //using this broken line of code to pause the program
        //answerChoices.textContent = quizQuestions[i].answers.a;
    }
    //outside the question asking loop, the main game is over, save score and run the summary function
}


//display high score function - displays the high scores when the button is clicked

//timer function - starts at 75 seconds counts down
// The startTimer function starts and stops the timer 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = "Timer: " + timerCount;
      //this needs to be if timer >0 and all questions answered save time, clear interval, win game
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

function showSummary() {
 //This functions displays the summary card
 scoreContainer.style.display = "block";
 // Displays the users score with a message
 scoreMessage.textContent = "You finished the Game with a score of " + score;

 //collects the users initals and stores in var userInitials

 //offers a button to submit your intials and automatically loads the high score page 
 // when submit is clicked


}

//This function responds to clicking submit button for user initials
  function submitButtonFunction () {

  console.log("This game is epic");

  //collects input from tetxtbox
  initials = document.getElementById("initials").value

  console.log("initials: ", initials);

  //it displays the high score card by running the showScore function
  // showScores();

    };
    
// This function shows high scores when you click on the high score button
function showScores(){
  console.log("clicked highscores");

// should also run my scoreManager function
manageScores();

//hides the cards we are not using
  introContainer.style.display = "none";
  questionContainer.style.display = "none";
  scoreContainer.style.display = "block";
  summaryContainer.style.display = "none";
}
  
function manageScores () {
  var scoreArray =[];
  var userInitScore = {};

  // pull from local memory
  var retrievedScores = localStorage.getItem('scores');

  // If their is no memory item scoreArray will become null unless...
  if (retrievedScores !== null) { 
  var scoreArray = JSON.parse(retrievedScores);
  }

  // if new initials and score add to the current storage array 
  if (initials !== "" && score !== 0) {
    //make an object of each initial and score set
    userInitScore.initials = initials;
    userInitScore.score = score;
    //add the inital score object to an array
    scoreArray.unshift(userInitScore);
    console.log(scoreArray);

   // Put the array into storage
    localStorage.setItem('scores', JSON.stringify(scoreArray));

}
  //populate a high score list on the score-container using append


}

  //This function responds to clicking the clear button, it clears local memory
  function clearScores () {
    localStorage.clear();
  }
  

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Attach event listener to submit button to call save game results function on click
submitButton.addEventListener("click", submitButtonFunction);

// Attach event listener to start button to call startGame function on click
clearButton.addEventListener("click", clearScores);

// Event listener to show high scores
highScore.addEventListener("click", showScores);

//Event listener for return button
returnButton.addEventListener("click", init);

// Calls init() when page loads
init();