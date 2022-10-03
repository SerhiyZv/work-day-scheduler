var timeDisplayEl = $('#currentDay');

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
// determination the time blocks for standard biz hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// Current time  returns string
var currentTime = parseInt(moment().format("H"));

//Create event for Saving data after refresh page
var createEvents = function (timeSlots) {
  timeSlots.forEach((element) => {
    let text = localStorage.getItem(parseInt(element.time));
    if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var newArr = [];
  
  //Array iterator method
  $("textarea").each(function (index, elem) {
    newArr.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  createEvents(newArr);
};

//Color block to indicate past, present or future
$("textarea").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < currentTime) {
    $(this).addClass("past");
  }
  if (id > currentTime) {
    $(this).addClass("future");
  }
  if (id === currentTime) {
    $(this).addClass("present");
  }
});

// click save button to add value to events
$("button.saveBtn").click(function (event, createEvents) {
  event.preventDefault();

   // $(this) current button being clicked
  var $element = $(this).siblings("textarea");
   // get time via id attribute
  var time = $element.attr("id");
  // get text content via $.val()
  var text = $element.val().trim();
  
  // save events to localStorage
  if (time && text !== "") {
    //
    localStorage.setItem(time, text);
  }
});

  setInterval(displayTime, 1000);
  
  fetchEvents();