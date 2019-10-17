var moment = require("moment");

module.exports = function() {
  console.log("ROTD function is been called");
  db.RecipeOfTheDay.findAll({
    order: [["createdAt", "DESC"]]
  }).then(function(dbRecipesOfTheDay) {
    if (dbRecipesOfTheDay.length === 0) {
      console.log("NO DATA IN RECIPES ARRAY");
      var counter = 1;
      var recepiesArray = [];
      generateRecepiesOfTheDay(counter, recepiesArray).then(function(array) {
        db.RecipeOfTheDay.bulkCreate(array);
      });
    } else {
      var recipeDay =
        "" +
        (dbRecipesOfTheDay[0].createdAt.getMonth() + 1) +
        dbRecipesOfTheDay[0].createdAt.getDate() +
        dbRecipesOfTheDay[0].createdAt.getFullYear();
      var today = moment().format(MMDDYYY);
      if (recipeDay !== today) {
        db.RecipeOfTheDay.destroy({
          where: {},
          truncate: true
        }).then(function() {
          var counter = 1;
          var recepiesArray = [];
          generateRecepiesOfTheDay(counter, recepiesArray).then(function(
            array
          ) {
            db.RecipeOfTheDay.bulkCreate(array);
          });
        });
      }
    }
    return dbRecipesOfTheDay;
  });
};

function generateRecepiesOfTheDay(counter, recepiesArray) {
  if (counter < 5) {
    db.Recipe.findAll({
      include: [
        {
          model: db.Category,
          where: { id: counter }
        }
      ]
    }).then(function(dbRecipes) {
      recipesArray.push(
        dbRecipes[Math.floor(Math.random() * dbRecipes.length)]
      );
      //CODE TO ATTACH CATEGORY AND CHEF TO RECIPE recipesArray[counter].CategoryId
      counter++;
      createRecepiesOfTheDay(counter, recepiesArray, callback);
    });
  }
  return recipesArray;
}
