// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

var edamamId = "2f3b3f36";
var edamamKey = "81a5257dbddd57f03ee488440bdbff36";

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// AJAX REQUEST TO THE EDAMAM EPI

// API needs a query search, that won't work with multiple values.
// Suggestions (pick of the day):
// To pick ramdomly among chicken, beef, fish, vegan.

// It always displays the same recipe from the same query, we can request more results and pick randomly from the result

$(document).ready(function() {
  var options = ["chicken", "beef", "fish", "vegan"];
  var query = options[Math.floor(Math.random() * 4)];

  console.log(query);
  var edamamURL =
    "https://api.edamam.com/search?q=" +
    query +
    "&app_id=" +
    edamamId +
    "&app_key=" +
    edamamKey +
    "&from=0&to=3&calories=591-722&health=alcohol-free";

  //Pick of the day request.
  $.ajax({
    url: edamamURL,
    method: "GET"
  }).then(function(response) {
    var newRecipe = {};
    console.log(
      "searching for recipes from random ingredient, 0-3, 591-722 calories, alcohol-free"
    );
    console.log(response);

    var pickRandomResult = Math.floor(Math.random() * response.hits.length);
    console.log("Picking recipe #" + pickRandomResult);

    //Name
    newRecipe.name = response.hits[pickRandomResult].recipe.label;
    newRecipe.categories = "";
    // Health Labels (Categories)
    for (
      var i = 0;
      i < response.hits[pickRandomResult].recipe.healthLabels.length;
      i++
    ) {
      newRecipe.categories +=
        response.hits[pickRandomResult].recipe.healthLabels[i] + ",";
    }
    newRecipe.ingredients = "";
    // Ingredients
    for (
      var i = 0;
      i < response.hits[pickRandomResult].recipe.ingredients.length;
      i++
    ) {
      newRecipe.ingredients +=
        response.hits[pickRandomResult].recipe.ingredients[i].text + ",";
    }

    // Img URL
    newRecipe.imgURL = response.hits[pickRandomResult].recipe.image;

    // URL
    newRecipe.url = response.hits[pickRandomResult].recipe.url;

    console.log(newRecipe);
  });
});
