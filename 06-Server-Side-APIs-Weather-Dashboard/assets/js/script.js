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
function getFiveDayApi(lat, lon) {

  //The five day API request is not working, try the one call request

  var oneCallQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

  // This request is for  
  fetch(oneCallQueryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //[0] is the current day
      console.log(data);
      console.log("date");
      console.log("Icon", data.daily[0].weather[0].icon);
      console.log("Temp", data.daily[0].temp.max);
      console.log("Humidity", data.daily[0].humidity);
      console.log("UV Index", data.daily[0].uvi);

      for(i = 1; i <6; i++){
        // need to populate the 5 day forcast containers
        // steps create a variable with the value I want to display
        // create the elements I need on my html page but alo make the
        // containers to hold them
        // append the items to each other, the appended item is a child
        // set the attributes, notice multiple classes in one statement
        // 

        // create the variables
        var date = "day";
        var temp = data.daily[i].temp.max;
        var icon = data.daily[i].weather[0].icon;
        var iconHttp = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        var humidity = data.daily[i].humidity;
        var uv = data.daily[i].uvi;
        //create an element
        var col = document.createElement("div");
        var card = document.createElement("div");
        var cardTitle = document.createElement("h4");
        var body = document.createElement("div");
        var iconEl = document.createElement("img");
        var tempEl = document.createElement("p");
        var humEl = document.createElement("p");
        var uviEl = document.createElement("p");

        //append to html - need to append before attaching a class
        col.append(card);
        card.append(body);
        body.append(cardTitle, iconEl, tempEl, humEl, uviEl);
        
       
        //attach a class - set attribute
        col.setAttribute('class', "col weatherDay");

        //use text content to to assign content to html elements
        cardTitle.textContent = date;
        iconEl.setAttribute('src', iconHttp);
        tempEl.textContent = temp;
        humEl.textContent = humidity;
        uviEl.textContent = uv;

        //appened the new container to the document
        forecastAnchor.append(col);

      }

      searchUVindex.textContent = "UV Index: " + data.current.uvi;
        
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
      // the query is successful I have the values I need to set the today card
      // you don't need variable to use textContent if you have ids
      searchCityDate.textContent = data.name + "   (" + todayDate +")";
      searchTemp.textContent =  "Temp (F): " + data.main.temp;
      searchWind.textContent = "Wind (mph): " + data.wind.speed;
      searchHumidity.textContent = "Humidity (%): " + data.main.humidity;
      searchDescription.textContent = "Description: " + data.weather[0].description;      

      //NEED TO MAKE THESE ACTUAL VARIABLE PULLS FROM THE FETCH DATA
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      getFiveDayApi(lat, lon);      

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
    //console.log(parsedLocations);

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
  //console.log("location from updateContentPane: ", location);
  // call the fetch function with the location from the attribute
  getApi(location);
}

function getLocation(evt) {
  evt.preventDefault();
  var location = searchInputEl.value;

  //adding the new location to parsedLocations
  if (parsedLocations.includes(location) === false && location !== ""){
  parsedLocations.push(location);

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