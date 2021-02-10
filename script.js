hideAll();

var playerProfileAPILink = "https://api.chess.com/pub/player/"; // plus username at the end
// player profile = https://api.chess.com/pub/player/{username}
// player stats = https://api.chess.com/pub/player/{username}/stats
// player online status = https://api.chess.com/pub/player/{username}/is-online
// monthly game archives avaliable = https://api.chess.com/pub/player/{username}/games/archives
// actual games from montly archives = https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}


var usernamey;
var capitalizedUsername;
const form = document.querySelector("#searchbar");

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const data = form.elements;

    usernamey = data.username.value;

    searchForData(usernamey);

    return (false);

});

function searchForData(usernameQuery) {

    var playerProfileLink = playerProfileAPILink + usernameQuery;

    fetch(playerProfileLink).then(r=>{

        if (r.status == 404) {

            showUserNotFound();
            return;

        } else if (r.status == 410 || r.status == 429) {

            showAnErrorOccured();
            return;

        } else {

            r.json().then(data=>{
    
                var temporaryUrlHolder = data.url.split("/");
                capitalizedUsername = temporaryUrlHolder[temporaryUrlHolder.length - 1];
                usernameText.innerText = capitalizedUsername;
        
                showResults();
        
            })

        }

    });

}

function hideAll() { //searchbarPart is always visible

    userNotFound.hidden = true;
    anErrorOccured.hidden = true;
    userInfo.hidden = true;
    timeControlRatingInfo.hidden = true;
    openingInfo.hidden = true;

}

function showUserNotFound() {

    hideAll();
    userNotFound.innerText = "No user found with the username of " + usernamey;
    userNotFound.hidden = false;

}

function showAnErrorOccured() {

    hideAll();
    anErrorOccured.hidden = false;

}

function showResults() {
    
    hideAll();
    userInfo.hidden = false;
    timeControlRatingInfo.hidden = false;
    openingInfo.hidden = false;

}