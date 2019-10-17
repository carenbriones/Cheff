module.exports = function(callback) {
  console.log("This function is been called");
  var counter = 1;
  var recepiesArray = [];
  return createRecepiesOfTheDay(counter, recepiesArray, callback);
};

function createRecepiesOfTheDay(counter, recepiesArray, callback) {
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
      counter++;
      createRecepiesOfTheDay(counter, recepiesArray, callback);
    });
  }
  callback(recipesArray);
}
