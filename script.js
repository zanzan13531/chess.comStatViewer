hideAll();

const form = document.querySelector("#searchbar");

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const data = form.elements;

    usernameText.innerText = data.username.value;

    if (data.username.value == "no user") {

        showUserNotFound();

    } else {

        showResults();

    }
    //console.log(data.username.value);
    //console.log(data.remember.value);

    return false;

});

function hideAll() { //searchbarPart is always visible

    userNotFound.hidden = true;
    userInfo.hidden = true;
    timeControlRatingInfo.hidden = true;
    openingInfo.hidden = true;

}

function showUserNotFound() {

    hideAll();
    userNotFound.hidden = false;

}

function showResults() {
    
    hideAll();
    userInfo.hidden = false;
    timeControlRatingInfo.hidden = false;
    openingInfo.hidden = false;

}