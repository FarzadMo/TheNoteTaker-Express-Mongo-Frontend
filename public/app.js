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
