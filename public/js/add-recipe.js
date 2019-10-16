console.log("Add Recipe JS Linked");

$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    chefId = data.id;
  });

  var chefId;
  var ingredientID = 3;
  var stepID = 3;

  $(document).on("click", "#add-ingredient", function() {
    if (ingredientID === 15) {
      alert("Only 15 Ingredients allowed");
      return false;
    } else {
      var newIngredientField = $(
        "<input type='text' class='form-control mb-1'>"
      ).attr("id", "ingredient-" + (ingredientID + 1));
      $("#list-ingredients").append(newIngredientField);

      ingredientID++;
      console.log(ingredientID);
    }
  });

  $(document).on("click", "#add-step", function() {
    if (stepID === 15) {
      alert("Only 15 Steps allowed");
      return false;
    } else {
      var newInstructionField = $(
        "<input type='text' class='form-control mb-1'>"
      ).attr("id", "step-" + (stepID + 1));
      $("#list-instructions").append(newInstructionField);

      stepID++;
      console.log(stepID);
    }
  });

  $(document).on("click", "#add-recipe", function() {
    var recipeTitle = $("#recipeName")
      .val()
      .trim();
    var recipeDesc = $("#recipeDescription")
      .val()
      .trim();
    var categories = $(".form-check-input:checked")
      .map(function() {
        return this.value;
      })
      .get()
      .join(", ");

    var ingredients = "";
    var instructions = "";
    var recipeImg = $("#recipeImg")
      .val()
      .trim();

    getIngredients();
    getInstructions();

    var newRecipe = {
      // eslint-disable-next-line camelcase
      chef_id: chefId,
      title: recipeTitle,
      description: recipeDesc,
      category: categories,
      ingredients: ingredients,
      steps: instructions,
      // eslint-disable-next-line camelcase
      img_url: recipeImg
    };

    function getIngredients() {
      var listOfIngredients = [];
      for (var i = 1; i <= ingredientID; i++) {
        listOfIngredients.push(
          $("#ingredient-" + i)
            .val()
            .trim()
        );
      }
      ingredients = listOfIngredients.join("|&|");
    }

    function getInstructions() {
      var listOfInstructions = [];
      for (var i = 1; i <= stepID; i++) {
        listOfInstructions.push(
          $("#step-" + i)
            .val()
            .trim()
        );
      }
      instructions = listOfInstructions.join("|&|");
    }

    $.ajax({
      type: "POST",
      data: newRecipe,
      url: "/api/recipes",
      dataType: "JSON"
    }).done(function(response) {
      if (response) {
        var successMsg = $(
          "<p class='text-success'> Article Added Succesfully!</p>"
        );
        $("#success-fail").append(successMsg);
      } else {
        var failMsg = $(
          "<p class='text-danger'> Something Went Wrong, Try Again Later.</p>"
        );
        $("#success-fail").append(failMsg);
      }
    });
  });
});
