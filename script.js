const form = document.querySelector("#searchbar");

form.addEventListener("submit", (event)=>{

    event.preventDefault();

    const data = form.elements;

    testyText.innerText = data.username.value;
    
    //console.log(data.username.value);
    //console.log(data.remember.value);

});