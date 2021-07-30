//Content to display time 
var datetime = document.querySelector('#currentDay');

//APIKey for the request to openweather
var APIKey = "18478b8e8991a96f7973ebca1c12f563";

var date = moment(new Date())
datetime.textContent = (date.format('dddd, MMMM Do YYYY'));

//Need the date in MM/DD/YY for the weather card
var todayDate = (date.format('MM/D/YY'));

//APIKey for the request to openweather
var APIKey = "18478b8e8991a96f7973ebca1c12f563";

var historyEl = document.getElementById("history");
var searchInputEl = document.getElementById("cityname");
var searchInputBtn = document.getElementById("searchBtn");

var parsedLocations = [];

//Need an API pull to get the 5 day forecast using the same key and same city
function getFiveDayApi(city) {

  //need a request Url 
  var queryFiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + APIKey;

  // This request is for  
  fetch(queryFiveDayUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // console.log("City: ", data.name);
      // console.log("Temp: ", data.main.temp);
      // console.log("Wind: ", data.wind.speed);
      // console.log("Humidity: ", data.main.humidity);
      // console.log("UV Index: ", data.wind.speed);
      // console.log("Description: ", data.weather[0].description);

      // the query is successful I have the values I need to set the today card
      // you don't need variable to use textContent if you have ids
      // searchCityDate.textContent = data.name + "   (" + todayDate +")";
      // searchTemp.textContent =  "Temp (F): " + data.main.temp;
      // searchWind.textContent = "Wind (mph): " + data.wind.speed;
      // searchHumidity.textContent = "Humidity (%): " + data.main.humidity;
      // searchDescription.textContent = "Description: " + data.weather[0].description;    
    });
  }


// Send an API request to the URL

function getApi(city) {

  //need a request Url 
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

  // This request is for  
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log("City: ", data.name);
      console.log("Temp: ", data.main.temp);
      console.log("Wind: ", data.wind.speed);
      console.log("Humidity: ", data.main.humidity);
      console.log("UV Index: ", data.wind.speed);
      console.log("Description: ", data.weather[0].description);

      // the query is successful I have the values I need to set the today card
      // you don't need variable to use textContent if you have ids
      searchCityDate.textContent = data.name + "   (" + todayDate +")";
      searchTemp.textContent =  "Temp (F): " + data.main.temp;
      searchWind.textContent = "Wind (mph): " + data.wind.speed;
      searchHumidity.textContent = "Humidity (%): " + data.main.humidity;
      searchDescription.textContent = "Description: " + data.weather[0].description;    
    });
  }


//This saves a new location to the local storage and then reruns the display saved locations function
function saveNewLocation() {
  localStorage.setItem("savedLocations", JSON.stringify(parsedLocations));
  displaySavedLocations();
}


function displaySavedLocations() {
  var locations = localStorage.getItem("savedLocations");
  if (locations) {
    parsedLocations = JSON.parse(locations);
    console.log(parsedLocations);

    //need to clear any existing html elements
    while (historyEl.firstChild) {
      historyEl.removeChild(historyEl.firstChild);
    }

    //this function runs a for each loop over each city in the parsedlocations Array
    //for each city it makes a list element
    //it creates content in the form of a button with a data location where
    //the data attribute is the item, the city name
    //then the inner html of the listitem is set to the button/attribute

    parsedLocations.forEach(function (item) {
      var listItem = document.createElement('li');
      var content = `<button data-location ="${item}">${item}</button>`;
      
      listItem.innerHTML = content;
      historyEl.appendChild(listItem);
  }); 
  }
}

function updateContentPane (evt){
  var buttonClicked = evt.target;
  var location = buttonClicked.getAttribute("data-location");
  console.log("location from updateContentPane: ", location);
  // call the fetch function with the location from the attribute
  getApi(location);
}

function getLocation(evt) {
  evt.preventDefault();
  var location = searchInputEl.value;
  console.log(location);

  //adding the new location to parsedLocations
  if (parsedLocations.includes(location) === false && location !== ""){
  parsedLocations.push(location);
  console.log("parsedLocations: ", parsedLocations);

  //call the function to save my updated parsedLocations
  saveNewLocation();
  }
  // Call the fetch Function here aftering getting the location
  // and hand the function the location
  getApi(location);
}

function setEventListeners(){
  historyEl.addEventListener("click", updateContentPane);
  searchInputBtn.addEventListener("click", getLocation);
}

function init() {
  setEventListeners();
  displaySavedLocations();
}

//calls init on page load
init();