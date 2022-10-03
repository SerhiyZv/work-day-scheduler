var timeDisplayEl = $('#currentDay');

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

var currentTime = parseInt(moment().format("H"));

var createEvents = function (timeSlots) {
  timeSlots.forEach((element) => {
    console.log(element);
    let text = localStorage.getItem(parseInt(element.time));
    console.log(text);
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

$("button.saveBtn").click(function (event, createEvents) {
  event.preventDefault();

  var $element = $(this).siblings("textarea");
  var time = $element.attr("id");
  // 
  var text = $element.val().trim();
  // 

  if (time && text !== "") {
    //
    localStorage.setItem(time, text);
  }
});

  setInterval(displayTime, 1000);