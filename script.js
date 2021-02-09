function doSearchStuff() {

    var form = document.getElementById("searchbar");
    var inputText = form.getElementsByTagName("Username");
    var testyText = document.getElementById("testyText");
    testyText.innerText = inputText.innerText;

}