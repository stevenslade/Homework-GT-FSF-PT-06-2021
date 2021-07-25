//declare variable for todays date and set to currentDay id 
//var today = moment ().format("dddd, MMMM Do YYYY");
//$("#currentDay").text(today);

//this is displays continually updating time

var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    checkTimeBlockColor ();
};

$(document).ready(function(){
    datetime = $('#currentDay')
    update();
    setInterval(update, 1000);
});


//get the current hour to set attribute of rows
var currentHour = moment().hour();

// make an array of all activitytext to iterate across for
//setting the time color
var activityBlocks = $('.activitytext');

// make a variable of the text value input into the activitytext
//this is a dead end
//var activityEl = "HelloWorld";
//console.log (activityEl);

//Make a click event using relationships to work on all
// the text areas
$(".saveBtn").on("click", function() {
    console.log(this);
    var text = $(this).siblings(".activitytext").val();
    console.log("text:", text);
    var forTime = $(this).parent().attr("id");
    console.log("forTime: ", forTime);

    //save to local storage
    localStorage.setItem(forTime, text);

})

//try without an array first just with variable
//This can be REMOVED for production
// var ninehour = $('#9am');
// ninehour.addClass("past");

// Create a loop to iterate over the array of activityBlocks
function checkTimeBlockColor () {
  for(var i=0; i < activityBlocks.length; i++) {
    var currentBlock = activityBlocks[i];
    var compareTime = (i+9);

    if (compareTime < currentHour){
        //addpast class
        $(currentBlock).addClass("past");
    } else if (compareTime === currentHour) {
        //addpresent class
        $(currentBlock).addClass("present");
    } else {
        //addfuture class
        $(currentBlock).addClass("future");
    }
  }
}

//need a function to push from local storage to my activitytext
function retrieveActivityText() {


}




//need an init function that calls the local storage push on page load
function init () {
    retrieveActivityText();
    checkTimeBlockColor ();
}

// Calls init function on page load
init ();


// This is all reference content

// TODO: 2. What day of the week will 1/1/2022 be?
var weekDay = moment("1-1-2022", "M-D-YYY").format("ddd MMM Do, YYYY");
$("#2a").text(weekDay);

// TODO: 3. Out of 365, what day of the year is today?
var dayYear = moment()
//var now = moment();
//$("#3a").moment().dayOfYear();

// TODO: 4. What is the current time in the format: hours:minutes:seconds
var time = moment().format("hh:mm:ss");
$("#4a").text(time);

// TODO: 5. What is the current Unix timestamp?
var unix = moment().format("X");
$("#5a").text(unix);

// TODO: 6. Parse the following Unix timestamp, 1318781876, and convert into any time/date format.
var unixFormat = moment.unix(1318781876).format("MMM Do, YYY, hh:mm:ss");
$("#6a").text(unixFormat);

