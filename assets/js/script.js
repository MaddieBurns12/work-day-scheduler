

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
        } else if (hour == 12) {
            timeString = hour + "PM";
        } else {
            timeString = (hour - 12) + "PM";
        }

       
        var timeLabel = $("<timeLabel>");
        timeLabel.attr("class", "col-1 hour py-3");
        timeLabel.text(timeString);
        
        var taskInput = $("<textarea>");
        taskInput.attr({
            'class': "col-10",
            'id': timeString,
            'data-start': hour, 
        });

        timeLabel.attr("for", taskInput.attr('id'));
    
        taskInput.val(localStorage.getItem(taskInput.attr('id'))); 

        var saveButton = $('<button>');
        saveButton.attr("class", "col-1 saveButton");

        saveButton.html("<i class='fa fa-save'></i>")

        liElement.append(timeLabel).append(taskInput).append(saveButton);  
      
        saveButton.click(function(e) {buttonSave(e)});
    }
}

function timeFxn() {
    
    todaysDate = time.format('dddd, MMMM DD');
    $('#currentDay').text(todaysDate);
    
     
    $('textarea').each(function() {
        if ($(this).attr('data-start') < time.hour()) { 
            changeColor($(this), 'past');     
        }  else if ($(this).attr('data-start') == time.hour()) {
            changeColor($(this), 'present'); 
        } else {
            changeColor($(this), 'future');
        }
    });
}


function changeColor(element, target) {
    var timeColor = ['past', 'present','future'];
    var timeCompare = timeColor.indexOf(target);

    for (var i = 0; i < timeColor.length; i++) {
        if (i === timeCompare) {
            element.toggleClass(timeColor[i], true);
        } else {
            element.toggleClass(timeColor[i], false);
        }
    }
}


function buttonSave(event) {
    var htmlElement = $( event.target );
    if (htmlElement.is( "i" )) { 
        htmlElement = htmlElement.parent();
    }
    var taskInput = htmlElement.prev();
    var key = taskInput.attr('id');
    var value = taskInput.val();
    localStorage.setItem(key, value);
}

$( document ).ready(function() {
    divGenerate(); 
    timeFxn(); 
    var timer = setInterval(function() {
        time = moment(); 
        var curMin = curTime.minute();
        minLeftBfRefresh = (60 - curMin) % 60;
        if (minLeftBfRefresh === 0) {
            timeFxn();
        }
    }, 1000 * 60);  
});