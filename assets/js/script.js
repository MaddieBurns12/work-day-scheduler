var currentDay = document.querySelector("#currentDay");
var day = moment().format('LLLL').split(", ")[0];
var date = moment().format('LLLL').split(", ")[1];
var eventEls = document.getElementsByClassName("event");


// add current day and time at the top of the page
currentDay.innerHTML = "<p>" + day + ", " + date + "</p>";

// change event div's color based on current Timeblocks


// add save button / save button to localStorage

// enter text into event div 

