hideAll();

var playerProfileAPILink = "https://api.chess.com/pub/player/"; // plus username at the end
// player profile = https://api.chess.com/pub/player/{username}
// player stats = https://api.chess.com/pub/player/{username}/stats
// player online status = https://api.chess.com/pub/player/{username}/is-online
// monthly game archives avaliable = https://api.chess.com/pub/player/{username}/games/archives
// actual games from montly archives = https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}

var additionalUserInfoShown = true;

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
    
                // data.hasOwnProperty("title")

                var temporaryUrlHolder = data.url.split("/");
                capitalizedUsername = temporaryUrlHolder[temporaryUrlHolder.length - 1];

                profilePicture.src = data.avatar;
                
                usernameText.innerText = capitalizedUsername;
                usernameText.href = data.url;

                playerID.innerText = data.player_id;
                if (data.hasOwnProperty("title")) {
                    playerTitle.innerText = data.title;
                    playerTitle.hidden = false;
                }
                accountStatus.innerText = data.status;
                if (data.hasOwnProperty("name")) {
                    suppliedName.innerText = data.name;
                    suppliedName.hidden = false;
                }
                if (data.hasOwnProperty("location")) {
                    location.innerText = data.location;
                    location.hidden = false;
                }
                country.innerText = data.country;
                joinDate.innerText = timeConverter(data.joined);
                lastOnline.innerText = timeConverter(data.last_online);
                followers.innerText = data.followers;
                isStreamer.innerText = "Not a streamer.";
                if (data.is_streamer) {
                    isStreamer.innerText = "Streamer.";
                    twitchUrl.innerText = data.twitch_url;
                    twitchUrl.hidden = false;
                }
                if (data.hasOwnProperty("fide")) {
                    fideRating.innerText = data.fide + " (Self reported)";
                    fideRating.hidden = false;
                }
        
                showResults();
        
            })

        }

    });

}

function additionalUserInformation() {

    if (additionalUserInfoShown) {

        additionalUserInfo.hidden = true;
        expandAdditionalUserInfo.innerText = "[+]";
        additionalUserInfoShown = false;

    } else {

        additionalUserInfo.hidden = false;
        expandAdditionalUserInfo.innerText = "[-]";
        additionalUserInfoShown = true;

    }

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

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }