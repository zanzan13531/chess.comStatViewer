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


    //user info pane
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

                userInfoPane(data);
        
            })

        }

    });


    //player stats pane
    var playerStatsLink = playerProfileAPILink + usernameQuery + "/stats";

    fetch(playerStatsLink).then(r=>{

        if (r.status == 404) {

            showUserNotFound();
            return;

        } else if (r.status == 410 || r.status == 429) {

            showAnErrorOccured();
            return;

        } else {

            r.json().then(data=>{
    
                // data.hasOwnProperty("title")

                timeControlRatingInfoPane(data);
        
            })

        }

    });

    showResults();

}

function timeControlRatingInfoPane(data) {

    //daily
    if (data.hasOwnProperty("chess_daily")) {

        var dwins = data.chess_daily.record.win;
        var ddraws = data.chess_daily.record.draw;
        var dlosses = data.chess_daily.record.loss;
        var dtotal = dwins + ddraws + dlosses;

        dailyRating.innerText = "Rating: " + data.chess_daily.last.rating;
        dailyMaxRating.innerText = "Best Rating: " + data.chess_daily.best.rating;
        dailyMaxDate.innerText = "Achieved on: " + timeConverter(data.chess_daily.best.date);
        dailyWins.innerText = "Wins: " + dwins;
        dailyDraws.innerText = "Draws: " + ddraws;
        dailyLosses.innerText = "Losses: " + dlosses;
        dailyTotalGames.innerText = "Games Played: " + dtotal;
        dailyWinLossRatio.innerText = "Win/Loss Percentage: " + (100 * (dwins + ddraws * 0.5) / (dtotal));

        daily.hidden = false;

    }


    //bullet

    if (data.hasOwnProperty("chess_bullet")) {

        var buwins = data.chess_bullet.record.win;
        var budraws = data.chess_bullet.record.draw;
        var bulosses = data.chess_bullet.record.loss;
        var butotal = buwins + budraws + bulosses;

        bulletRating.innerText = "Rating: " + data.chess_bullet.last.rating;
        bulletMaxRating.innerText = "Best Rating: " + data.chess_bullet.best.rating;
        bulletMaxDate.innerText = "Achieved on: " + timeConverter(data.chess_bullet.best.date);
        bulletWins.innerText = "Wins: " + buwins;
        bulletDraws.innerText = "Draws: " + budraws;
        bulletLosses.innerText = "Losses: " + bulosses;
        bulletTotalGames.innerText = "Games Played: " + butotal;
        bulletWinLossRatio.innerText = "Win/Loss Percentage: " + (100 * (buwins + budraws * 0.5) / (butotal));

        bullet.hidden = false;

    }


    //blitz

    if (data.hasOwnProperty("chess_blitz")) {

        var blwins = data.chess_blitz.record.win;
        var bldraws = data.chess_blitz.record.draw;
        var bllosses = data.chess_blitz.record.loss;
        var bltotal = blwins + bldraws + bllosses;

        blitzRating.innerText = "Rating: " + data.chess_blitz.last.rating;
        blitzMaxRating.innerText = "Best Rating: " + data.chess_blitz.best.rating;
        blitzMaxDate.innerText = "Achieved on: " + timeConverter(data.chess_blitz.best.date);
        blitzWins.innerText = "Wins: " + blwins;
        blitzDraws.innerText = "Draws: " + bldraws;
        blitzLosses.innerText = "Losses: " + bllosses;
        blitzTotalGames.innerText = "Games Played: " + bltotal;
        blitzWinLossRatio.innerText = "Win/Loss Percentage: " + (100 * (blwins + bldraws * 0.5) / (bltotal));

        blitz.hidden = false;

    }


    //rapid

    if (data.hasOwnProperty("chess_rapid")) {

        var rwins = data.chess_rapid.record.win;
        var rdraws = data.chess_rapid.record.draw;
        var rlosses = data.chess_rapid.record.loss;
        var rtotal = rwins + rdraws + rlosses;

        rapidRating.innerText = "Rating: " + data.chess_rapid.last.rating;
        rapidMaxRating.innerText = "Best Rating: " + data.chess_rapid.best.rating;
        rapidMaxDate.innerText = "Achieved on: " + timeConverter(data.chess_rapid.best.date);
        rapidWins.innerText = "Wins: " + rwins;
        rapidDraws.innerText = "Draws: " + rdraws;
        rapidLosses.innerText = "Losses: " + rlosses;
        rapidTotalGames.innerText = "Games Played: " + rtotal;
        rapidWinLossRatio.innerText = "Win/Loss Percentage: " + (100 * (rwins + rdraws * 0.5) / (rtotal));

        rapid.hidden = false;

    }

}

function openingInfoPane() {



}

function userInfoPane(data) {

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