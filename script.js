$(document).ready(function () {
    // Get the current date using Day.js
    var currentDate = dayjs().format("dddd, MMMM D");
  
    // Display the current date in the header
    $("#currentDay").text(currentDate);
  
    // loop through hours 9 AM to 5 PM 
    for (var hour = 9; hour <= 17; hour++) {
      // Create a unique ID for each time block
      var timeBlockId = "hour-" + hour;
  
      // a new row for each hour
      var timeBlock = $("<div>").addClass("row time-block").attr("id", timeBlockId);
  
      // a column for the hour
      var hourCol = $("<div>").addClass("col-md-1 hour").text(dayjs().hour(hour).minute(0).format("hA"));
  
      // a column for the event input
      var eventCol = $("<textarea>").addClass("col-md-10 description");
  
      // Set the background color of the event input based on past, present, or future
      if (hour < dayjs().hour()) {
        eventCol.addClass("past");
      } else if (hour === dayjs().hour()) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }
  
      // a column for the save button
      var saveBtnCol = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
  
      // Add an event listener to the save button
      saveBtnCol.on("click", function () {
        var eventText = $(this).siblings(".description").val();
        var eventHour = $(this).parent().attr("id");
        localStorage.setItem(eventHour, eventText);
      });
  
      // Load saved events from local storage
      var savedEvent = localStorage.getItem(timeBlockId);
      if (savedEvent !== null) {
        eventCol.val(savedEvent);
      }
  
      // Append columns to the time block row
      timeBlock.append(hourCol, eventCol, saveBtnCol);
  
      // Add the time block row to the container
      $(".container").append(timeBlock);
    }
  });
  