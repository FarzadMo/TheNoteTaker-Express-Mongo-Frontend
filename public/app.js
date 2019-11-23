function displayResults() {
  $("#results").empty();

  $.getJSON("/all", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#results").prepend(
        "<p class='data-entry' data-id='" +
          data[i]._id +
          "'><span class='data-title' data-id='" +
          data[i]._id +
          "'>" +
          data[i].title +
          "</span><span class='delete' data-id='" +
          data[i]._id +
          "'>X</span></p>"
      );
    }
  });
}

displayResults();

$(document).on("click", "#make-new", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit",
    data: {
      title: $("#title").val(),
      note: $("#note").val(),
      created: Date.now
    }
  }).then(function(response) {
    // console.log("this is the response" + response);

    $("#results").prepend(
      "<p class='data-entry' data-id='" +
        response._id +
        "'><span class='data-title' data-id='" +
        response._id +
        "'>" +
        response.title +
        "</span><span class='delete' data-id='" +
        response._id +
        "'>X</span></p>"
    );

    $("#title").val("");
    $("#note").val("");
  });
});

$(document).on("click", "#clear-all", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearall",
    success: function(response) {
      $("#results").empty();
    }
  });
});

$(document).on("click", ".delete", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/deleteone/" + selected.attr("data-id"),

    success: function(response) {
      selected.remove();

      $("#note").val("");
      $("#title").val("");

      $("#buttons").html("<button id='make-new' class='btn'>Submit</button>");
    }
  });
});

$(document).on("click", ".data-title", function() {
  var selected = $(this);

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/findone/" + selected.attr("data-id"),
    success: function(response) {
      $("#title").val(response.title);
      $("#note").val(response.note);

      $("#buttons").html(
        "<button id='updater' class='btn' data-id='" +
          response._id +
          "'>Update</button>"
      );
    }
  });
});

$(document).on("click", "#updater", function() {
  var selected = $(this);
  // console.log("this is selected element " + selected);
  // var myAttr = selected.attr("data-id");
  // console.log("this is my attribute" + myAttr);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/update/" + selected.attr("data-id"),

    data: {
      title: $("#title").val(),
      note: $("#note").val()
    },
    success: function(data) {
      $("#note").val("");
      $("#title").val("");

      $("#buttons").html("<button id='make-new' class='btn'>Submit</button>");

      getResults();
    }
  });
});
