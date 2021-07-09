// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//make a global array to assemble acceptable char types
var passCharSelectionArray = [];

//Write a function called "generatePassword"
function generatePassword() {

//Declare one array for each type of character set

//Array of numbers
var numArray = ["0","1","2","3","4","5","6","7","8","9"];

//Array of lower case letters
var lowCaseCharArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//Array of uppercase letters
var upCaseCharArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

//Array of special characters, space, double quotation and backslash removed from OWASP list
var specCharArray = ['!','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[',']','^','_','`','{','|','}','~'];

//Prompts to inquire to user about four types of possible characters

//Alert user to program options
alert("You will be given the chance to select from four types of characters to include in your password.  Lower and Upper case letters, Numbers and Symbols.  You must select at least one character set.");

//First prompt lowercase letters
var lowCaseChoice = getUserChoice("lower case letters");

//use the check function to make sure the user has input Y or N
lowCaseChoice = checkUserChoice(lowCaseChoice, "lower case letters")

//Add lower case characters if selected
addCharToArray(lowCaseChoice, lowCaseCharArray, "lower case letters");

//Second prompt is for uppercase letters
var upCaseChoice = getUserChoice("upper case letters");

//use the check function to make sure the user has input Y or N
upCaseChoice = checkUserChoice(upCaseChoice, "upper case letters")

//add upper case letters to seclection array
addCharToArray(upCaseChoice, upCaseCharArray, "upper case letters");
   
//Third prompt is for numeric characters
var numCaseChoice = getUserChoice("numeric characters");

//use the check function to make sure the user has input Y or N
numCaseChoice = checkUserChoice(numCaseChoice, "numeric characters")

//Numeric characters added to selection Array
addCharToArray(numCaseChoice, numArray, "numeric characters");

//Fourth prompt is for special characters
var specCharChoice = getUserChoice("special characters");

//use the check function to make sure the user has input Y or N
specCharChoice = checkUserChoice(specCharChoice, "special characters")

//Special characters added to selection array
addCharToArray(specCharChoice, specCharArray, "special characters");

//Everything below this line is Final

//If the user did not select any character sets the program will end and give an alert
if (passCharSelectionArray.length <1) {
  alert("You did not select any character sets, no password generation possible. Start again and select at least one character set.");
  return (" ");
}

//use a prompt to determine the length of the password 
//between 8 and 128 characters
var passwordLength = 0;
passwordLength = prompt('Please select a password length between 8 and 128 characters: ');

//Keep asking the question if an incorrect length is specified
while (passwordLength <8 || passwordLength > 128) {
  passwordLength = prompt('Please select a password length between 8 and 128 characters: ');
  }

//Then I make a passwordArray by running a random selector over the password character selection array
//in a loop of the password length
var passwordArray = [];
var i = 0;
while (i<passwordLength) {
  var randomChar = passCharSelectionArray[Math.floor(Math.random()*passCharSelectionArray.length)];
  passwordArray.push(randomChar);
  i++;
}

//Then this password needs to get returned to the function call in the form of a 
//string.  This requires a conversion from array to string
var passwordString = passwordArray.join("");

//return the password
return passwordString;
}


function getUserChoice(characterSet) {
  //prompt user to determine if using character set
  var userChoice = prompt('Do you wish for your Password to contain ' + characterSet +'? Please enter "Y" or "N"');
  //Normalize user input
  userChoice = userChoice.toUpperCase();
  return userChoice;
}

function checkUserChoice(userChoice, characterSet) {
  while (userChoice !== "Y" && userChoice !== "N") {
    userChoice = prompt('You must enter "Y" or "N" for ' + characterSet);
    userChoice = userChoice.toUpperCase();
  } return userChoice;
}

function addCharToArray(userChoice, characterArray, characterSet) {
  if (userChoice === "Y") {
    passCharSelectionArray = passCharSelectionArray.concat(characterArray);
    alert("You selected to include " + characterSet + ".");
  } else {
      alert("You choose Not to include " + characterSet + ".");
  }
}

