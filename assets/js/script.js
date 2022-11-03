var time = moment();
const hourTotal = 9;
const startHour = 9;

function divGenerate() {
    var olElement = $("<ol>");
    olElement.attr("class", "time-block");
    $('div.container').append(olElement);

    for (var i = startHour; i < startHour + hourTotal; i++) {
    var liElement = $("<li>");
    liElement.attr("class", "row");
    $('ol').append(liElement);

    var timeString = '';
    var hour = i % 24;
    if (hour < 12) {
        timeString = hour + "AM";
    }
     else if (hour == 12) {
        timeString = hour + "PM";
     } 
     else {
        timeString = (hour - 12) + "PM";
     }

     var timeP = $("<p>");
     timeP.attr("class", "col-1 hour py-3");
     timeP.text(timeString);

     var taskInput = $("<textarea>");
     taskInput.attr("class", "col-10");
     taskInput.attr("id", "taskString");
     taskInput.attr("data-start", "hour");
    
     timeP.attr("for", taskInput.attr("id"));
     taskInput.val(localStorage.getItem(taskInput.attr('id')));

     var saveButton = $('<button>');
     saveButton.attr("class", "col-1 saveButton");
     saveButton.html("<h1>SAVE</h1>");

     liElement.append(timeP).append(taskInput).append(saveButton);

     saveButton.click(function(e) {buttonSave(e)});

    }
}

function changeColor(element, target) {
    var timeColor = ['past', 'present', 'future'];
    var timeCompare = timeColor.indexOf(target);

    for (var i = 0; i < timeColor.length; i++) {
        if (i === timeCompare) {
            element.toggleClass(timeCompare[i], true);
        } 
        else {
            element.toggleClass(timeCompare[i], false);
        }
    }
}

function taskTime() {
    todaysDate = time.format('dddd, MMMM DD');
    $('#currentDay').text(todaysDate);

    $('textarea').each(function() {
        if ($(this).attr('data-start') < time.hour()) {
            changeColor($(this), 'past');
        }
        else if ($(this).attr('data-start') == time.hour()) {
            changeColor($(this), 'present');
        } else {
            changeColor($(this), 'future')
        }
    });
}

function buttonSave(event) {
    var element = $(event.target);
    if (element.is ("i")) {
        element = element.parent();
    }
    var inputtedTask = element.prev();
    var key = inputtedTask.attr("id");
    var value = inputtedTask.val();
    localStroage.setItem(key, value);
}

$(document).ready(function() {
    divGenerate();
    taskTime();

    var timer = setInterval(function() {
        time = moment();
        var curMin = curTime.minute();
        refreshTimer = (60 - curMin) % 60;
        if (refreshTime === 0) {
            changeColor();
        }
    }, 1000 * 60);
});

