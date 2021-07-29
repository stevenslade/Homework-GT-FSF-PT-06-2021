var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#cityname');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getUserRepos(cityname);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a valid City Name');
  }
};

var buttonClickHandler = function (event) {

  var language = event.target.getAttribute('data-language');
  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

var getUserRepos = function (user) {
  var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var getFeaturedRepos = function (language) {
  // What are the query parameters doing here?
  // TODO: Write your answer here

  // 

  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
//languageButtonsEl.addEventListener('click', buttonClickHandler);

//Content I added 

var datetime = document.querySelector('#currentDay');

var APIkey = "18478b8e8991a96f7973ebca1c12f563";

var date = moment(new Date())
datetime.textContent = (date.format('dddd, MMMM Do YYYY'));
console.log(datetime);



// Start of Trey's tutorial script

var historyEl = document.getElementById("history");
var searchInputEl = 


function init() {
  displaySavedLocations();
}

function displaySavedLocations() {
  var locations = localStorage.getItem("savedLocations");
  if (locations) {
    var parsedLocations = JSON.parse(locations);
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
}

function getLocation(evt) {
  evt.preventDefault;
  var location = serachInputEl.value;
}

function setEventListeners(){
  historyEl.addEventListener('click', updateContentPane);
  searchInputEl.addEventListner("click", getLocation);
}

function init() {
  setEventListeners();
  displaySavedLocations();
}

//calls init on page load
init();