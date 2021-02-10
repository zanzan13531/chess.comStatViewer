/*


fetch(dataAPILink).then(r=>r.json()).then(data=>{
        
    //i assume that the code in here needs to wait for fetch to be done though?

});



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

*/