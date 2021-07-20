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

var initials = "";
var score = 0;

var respose;

var correctAnswer;

//Variable for render question function
var questionIndex;


//question and answer array

var quizQuestions = [
    {
      question: "In Javascript, what property do you use to determine the number of elements in an array?",
      answers: [".elements", ".ArrayElements", "Correct - .length", ".arguments"],
      correctAnswer: "c"
    },
    {
      question: "In Javascript, JSON values can be all but which of the following data types?",
      answers: ["a function", "a string", "a number", "null"],
      correctAnswer: "a"
    },
    {
      question: "In JavaScript all the following are comparison operators except which?",
      answers: ["==", " ! ", "===", "<"],
      correctAnswer: "b"
    },
    {
        question: "Array indexes are ______-based in Javascript.  What word completes the statement correctly?",
        answers: ["key", "origin", "zero", "number"],
        correctAnswer: "c"
      },
      {
        question: "What is used to store multiple values in a single variable in JavaScript?",
        answers: ["object", "concat", "array", "string"],
        correctAnswer: "c"
      }
  ];

//init function - when page loads it presents the instructions, header and a start button, it clears questions, submit and high scores
function init() {
    //This function hides the uneeded cards at load
 introContainer.style.display = "block";
 questionContainer.style.display = "none";
 scoreContainer.style.display = "none";
 summaryContainer.style.display = "none";
   //This cleans the user info and score in case you go right into another game
   //without reloading the page
  initials = "";
  score = 0;

}

// The startGame function is called when the start button is clicked
function startGame() {
    questionIndex = 0;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    //startButton.disabled = true;
    introContainer.style.display = "none";
    questionContainer.style.display = "block";
    scoreContainer.style.display = "none";
    summaryContainer.style.display = "none";
    correctMessage.style.display ="none";
    startTimer()
    renderQuestion();
  }

// Once the start game button is pressed the 
// question-container should be displayed
// the question container should use questioncounter to populate the card
// each choice would need to be a button
// each button could have the same response a compare answer function
// compare answer adjusts score and increments the questioncounter, it runs ask 
// question until the counter reaches the max value

function renderQuestion(){

        question.textContent = quizQuestions[questionIndex].question;
        achoice.textContent = quizQuestions[questionIndex].answers[0];
        bchoice.textContent = quizQuestions[questionIndex].answers[1];
        cchoice.textContent = quizQuestions[questionIndex].answers[2];
        dchoice.textContent = quizQuestions[questionIndex].answers[3];

        correctAnswer = quizQuestions[questionIndex].correctAnswer

}

function checkAnswer() {
  if(response !== correctAnswer) {
    timerCount -= 10;
  }
  if (questionIndex < quizQuestions.length -1) {
  questionIndex++;
  renderQuestion();
} else {
  score = timerCount;
  clearInterval(timer);
  showSummary();
}
}

//timer function - starts at 75 seconds counts down
// The startTimer function starts and stops the timer 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = "Timer: " + timerCount;
      //this needs to be if timer >0 and all questions answered save time, clear interval, win game
      if (timerCount >= 0 ) {
        
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        score = timerCount;
        clearInterval(timer);
        showSummary()
      }
    }, 1000);
  }

function showSummary() {
 //This functions displays the summary card
   introContainer.style.display = "none";
   questionContainer.style.display = "none";
   scoreContainer.style.display = "none";
   summaryContainer.style.display = "block";
 // Displays the users score with a message
 scoreMessage.textContent = "You finished the Game with a score of " + score;
}

//This function responds to clicking submit button for user initials
  function submitButtonFunction () {

  //collects input from tetxtbox
  initials = document.getElementById("initials").value

  //it displays the high score card by running the showScore function
  showScores();

  }
    
// This function shows high scores when you click on the high score button
function showScores(){

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
  console.log("scoreArray: ", scoreArray);
  console.log("score: ", score);

  // if new initials and score add to the current storage array 
  if (initials !== "" && score !== 0) {
    //make an object of each initial and score set
    userInitScore.initials = initials;
    userInitScore.score = score;
    //add the inital score object to an array
    scoreArray.unshift(userInitScore);

   // Put the array into storage but first clear the previous content
    localStorage.clear();
    localStorage.setItem('scores', JSON.stringify(scoreArray));
}
  //populate a high score list on the score-container using append
  for ( var i = 0; i < scoreArray.length; i++){
       var node = document.createElement("LI");
       var textnode = document.createTextNode(scoreArray[i].initials + "           " + scoreArray[i].score);
       node.appendChild(textnode);
       document.getElementById("high-score-list").appendChild(node);
  }

  //Clears the variables so it won't load more entries just by switching cards but it still does
  initials = "";
  score = 0;
}

  //This function responds to clicking the clear button, it clears local memory
  function clearScores () {
    localStorage.clear();
    //reloads page so not staring at an empty list
    location.reload();
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
returnButton.addEventListener("click", function() {
  location.reload();
});

achoice.addEventListener("click", function() {
  response = "a";
  checkAnswer();
});

bchoice.addEventListener("click", function() {
  response = "b";
  checkAnswer();
});

cchoice.addEventListener("click", function() {
  response = "c";
  checkAnswer();
});

dchoice.addEventListener("click", function() {
  response = "d";
  checkAnswer();
});

// Calls init() when page loads
init();