const form = document.querySelector("#my-form");

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const data = form.elements;

    testyText.innerText = data.username.value;
    
    //console.log(data.username.value);
    //console.log(data.remember.value);

});


function doSearchStuff() {

    var form = document.getElementById("searchbar");
    var inputText = form.getElementsByTagName("Username");
    var testyText = document.getElementById("testyText");
    testyText.innerText = inputText.innerText;

}