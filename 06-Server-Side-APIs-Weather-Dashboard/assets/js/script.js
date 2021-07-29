// Reference Content for commands

// var userFormEl = document.querySelector('#user-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#cityname');
// var repoContainerEl = document.querySelector('#repos-container');
// var repoSearchTerm = document.querySelector('#repo-search-term');

// var formSubmitHandler = function (event) {
//   event.preventDefault();

//   var cityname = nameInputEl.value.trim();

//   if (cityname) {
//     getUserRepos(cityname);

//     repoContainerEl.textContent = '';
//     nameInputEl.value = '';
//   } else {
//     alert('Please enter a valid City Name');
//   }
// };

// var buttonClickHandler = function (event) {

//   var language = event.target.getAttribute('data-language');
//   if (language) {
//     getFeaturedRepos(language);

//     repoContainerEl.textContent = '';
//   }
// };

// var getUserRepos = function (user) {
//   var apiUrl = 'https://api.github.com/users/' + user + '/repos';

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayRepos(data, user);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
// };

// var getFeaturedRepos = function (language) {
//   // What are the query parameters doing here?
//   // TODO: Write your answer here

//   // 

//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

// var displayRepos = function (repos, searchTerm) {
//   if (repos.length === 0) {
//     repoContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('div');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };

// userFormEl.addEventListener('submit', formSubmitHandler);
// //languageButtonsEl.addEventListener('click', buttonClickHandler);



//Content I added 

var datetime = document.querySelector('#currentDay');

var APIKey = "18478b8e8991a96f7973ebca1c12f563";

var date = moment(new Date())
datetime.textContent = (date.format('dddd, MMMM Do YYYY'));

// Start of Trey's tutorial script

var historyEl = document.getElementById("history");
var searchInputEl = document.getElementById("cityname");
var searchInputBtn = document.getElementById("searchBtn");

var parsedLocations = [];

// Send an API request to the URL

function getApi() {
  // need a location variable I can pass one in to the function
  // for now I'm going to just make a city variable

  var city = "Detroit";

  //need a request Url
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;


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

      //Just console log the returned data right now

      //Loop over the data to generate a table, each table row will have a link to the repo url
      // for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        // var createTableRow = document.createElement('tr');
        // var tableData = document.createElement('td');
        // var link = document.createElement('a');

        // Setting the text of link and the href of the link
        // link.textContent = data[i].html_url;
        // link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
       // tableData.appendChild(link);
       // createTableRow.appendChild(tableData);
       //  tableBody.appendChild(createTableRow);
      //}
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
  //var location = buttonClicked.getAttribute("data-location");
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
  getApi();
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