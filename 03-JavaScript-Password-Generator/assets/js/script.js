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

//Write a function called "generatePassword"
function generatePassword() {

//Declare one array for each type of character set

//Array of numbers
var numArray = ["0","1","2","3","4","5","6","7","8","9"];

//Array of lower case letters
var lowCaseCharArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//Array of uppercase letters
var upCaseCharArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

//Array of special characters, space, comma, double quotations marks removed from OWASP list
var specCharArray = ["!","#","$","%","&","(",")","*","+","-",".","/",":",";","<","=",">","?","@","[","\","^"","{","|","}","~"];

//make a local array to assemble acceptable char types
var passCharSelectionArray = [];

//Prompts to inquire to user about four types of possible characters
//For each prompt I need to assemble an array of acceptable characters

//First prompt lowercase letters
var lowCaseChoice = prompt('Do you wish for your Password to contain Lower Case letters? Please enter "Y" or "N"');
//Normalize user input
lowCaseChoice = lowCaseChoice.toUpperCase();

//Add lower case characters if selected
if (lowCaseChoice === "Y") {
    passCharSelectionArray = passCharSelectionArray.concat(lowCaseCharArray);
  }

//Second prompt is for uppercase letters
var upCaseChoice = prompt('Do you wish for your Password to contain Upper Case letters? Please enter "Y" or "N"');
upCaseChoice = upCaseChoice.toUpperCase();
if (upCaseChoice === "Y") {
    passCharSelectionArray = passCharSelectionArray.concat(upCaseCharArray);
  }

//Third prompt is for numeric characters
var numCaseChoice = prompt('Do you wish for your Password to contain numeric characters? Please enter "Y" or "N"');
numCaseChoice = numCaseChoice.toUpperCase();
if (numCaseChoice === "Y") {
    passCharSelectionArray = passCharSelectionArray.concat(numArray);
  }

//Fourth prompt is for special characters
var specCharChoice = prompt('Do you wish for your Password to contain special characters? Please enter "Y" or "N"');
specCharChoice = specCharChoice.toUpperCase();
if (specCharChoice === "Y") {
    passCharSelectionArray = passCharSelectionArray.concat(specCharArray);
  }

//If the user did not select any character sets the program will end and give an alert
if (passCharSelectionArray.length <1) {
  alert("You did not select any character sets, no password generation possible.");
  return (" ");
}

//Then I need to use a prompt to determine the length of the password 
//between 8 and 128 characters
var passwordLength = prompt('Please select a password length between 8 and 128 characters: ');

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

return passwordString;
}

