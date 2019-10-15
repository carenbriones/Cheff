var axios = require("axios");

// var promise1 = new Promise(function(resolve, reject) {
//   resolve('Success!');
// });

module.exports = function(callback) {
  console.log("This function is been called");
  var counter = 0;
  var query = ["paleo", "vegan", "fish", "vegetarian"];
  var totalRecipes = [];
  return makeAxiosRequest(counter, query, totalRecipes, callback);
};

function makeAxiosRequest(counter, query, totalRecipes, callback) {
  if (counter < 4) {
    //paleo vegan vegetarian pescatarian

    console.log("requesting " + query[counter] + " diet.");
    var edamamURL =
      "https://api.edamam.com/search?q=" +
      query[counter] +
      "&app_id=2f3b3f36&app_key=81a5257dbddd57f03ee488440bdbff36&from=0&to=30&calories=591-722&health=alcohol-free";
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(edamamURL).then(function(response) {
      var allRecipes = [];
      var newRecipe = {};

      //console.log(response.data.hits);

      for (var j = 0; j < response.data.hits.length; j++) {
        //Name
        newRecipe.name = response.data.hits[j].recipe.label;
        newRecipe.categories = "";
        // Health Labels (Categories)
        for (
          var i = 0;
          i < response.data.hits[j].recipe.healthLabels.length;
          i++
        ) {
          newRecipe.categories +=
            response.data.hits[j].recipe.healthLabels[i] + ",";
        }
        newRecipe.ingredients = "";
        // Ingredients
        for (
          var i = 0;
          i < response.data.hits[j].recipe.ingredients.length;
          i++
        ) {
          newRecipe.ingredients +=
            response.data.hits[j].recipe.ingredients[i].text + ",";
        }

        // Img URL
        newRecipe.imgURL = response.data.hits[j].recipe.image;

        // URL
        newRecipe.url = response.data.hits[j].recipe.url;
        allRecipes.push(newRecipe);
      }
      //displayInThePage(newRecipe);
      totalRecipes.push(allRecipes);
      counter++;
      console.log(counter);
      makeAxiosRequest(counter, query, totalRecipes, callback);
    });
  } else {
    console.log(totalRecipes);
    callback(totalRecipes);
  }
}
