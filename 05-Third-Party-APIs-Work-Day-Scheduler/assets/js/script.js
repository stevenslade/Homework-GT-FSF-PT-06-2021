//this displays continually updating time

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

//Make a click event using relationships to work on all
// the text areas
$(".saveBtn").on("click", function() {
    var text = $(this).siblings(".activitytext").val();
    var forTime = $(this).parent().attr("id");

    //save to local storage
    localStorage.setItem(forTime, text);

})

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

// need a function to push from local storage to my activitytext
// I can't figure out how to do this in a loop since all my local storage
// is saved as a key and value not an array, need to revisit how I am saving

function retrieveActivityText() {
 $("#9am .activitytext").val(localStorage.getItem("9am"));
 $("#10am .activitytext").val(localStorage.getItem("10am"));
 $("#11am .activitytext").val(localStorage.getItem("11am"));
 $("#12pm .activitytext").val(localStorage.getItem("12pm"));
 $("#1pm .activitytext").val(localStorage.getItem("1pm"));
 $("#2pm .activitytext").val(localStorage.getItem("2pm"));
 $("#3pm .activitytext").val(localStorage.getItem("3pm"));
 $("#4pm .activitytext").val(localStorage.getItem("4pm"));
 $("#5pm .activitytext").val(localStorage.getItem("5pm"));
}

//need an init function that calls the local storage push on page load
// also include the timeblock color change function
function init () {
    retrieveActivityText();
    checkTimeBlockColor ();
}

// Calls init function on page load
init ();




