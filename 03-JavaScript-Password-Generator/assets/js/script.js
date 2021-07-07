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


//Array of numbers
var numArray = [0,1,2,3,4,5,6,7,8,9];

//Array of lower case letters
var lowCaseCharArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];

//Array of uppercase letters

//Array of special characters

//Write a function called "generatePassword" I think
function generatePassword() {
//Prompts to inquire to user about four types of possible characters
//For each prompt I need to assemble a passwordCharList

//Then I need to use a prompt to determine the length of the password 
//between 8 and 128 characters

//Then I make a passwordArray by running a random selector over the passwordCharlist
//in a loop of the password length

//Then this password needs to get returned to the function call in the form of a 
//string.  this might require a conversion from array to string

}

