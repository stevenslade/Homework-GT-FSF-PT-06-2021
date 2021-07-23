//declare variable for todays date and set to currentDay id 
var today = moment ().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);





//this is reference content for displaying continually updating time

var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});




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

