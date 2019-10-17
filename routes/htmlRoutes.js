var db = require("../models");
var moment = require("moment");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({
      include: [db.Chef, db.Category]
    })
      .then(function(dbRecipes) {
        var veganAr = [];
        var vegetarianAr = [];
        var pescatarianAr = [];
        var paleoAr = [];

        for (var i = 0; i < dbRecipes.length; i++) {
          var categories = dbRecipes[i].get("Categories");
          for (var j = 0; j < categories.length; j++) {
            var category = categories[j].get("category");
            if (category === "Vegan") {
              veganAr.push(dbRecipes[i]);
            } else if (category === "Vegetarian") {
              vegetarianAr.push(dbRecipes[i]);
            } else if (category === "Pescatarian") {
              pescatarianAr.push(dbRecipes[i]);
            } else if (category === "Paleo") {
              paleoAr.push(dbRecipes[i]);
            }
          }
        }
        res.render("index", {
          recipes: dbRecipes,
          vegan: veganAr,
          vegetarian: vegetarianAr,
          pescatarian: pescatarianAr,
          paleo: paleoAr
        });
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send(err.message);
      });
  });

  // Displays all recipes
  app.get("/all-recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("all-recipes", {
        recipes: dbRecipes
      });
    });
  });

  // Load single recipe page and pass in an recipe by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      dbRecipe
    ) {
      var ingredientsRaw = dbRecipe.ingredients;
      var ingredientsArr = ingredientsRaw.split("&|");

      var stepsRaw = dbRecipe.steps;
      var stepsArr = stepsRaw.split("&|");
      var dateAdded = moment(dbRecipe.CreatedAt).format("LL");

      res.render("single-recipe", {
        recipe: dbRecipe,
        ingredients: ingredientsArr,
        steps: stepsArr,
        date: dateAdded
      });
      console.log(dbRecipe);
    });
  });

  // Displays all recipes of a specified category
  app.get("/all-recipes/:categoryId", function(req, res) {
    db.Recipe.findAll({
      include: [
        {
          model: db.Category,
          where: { id: req.params.categoryId }
        }
      ]
    }).then(function(dbRecipes) {
      res.render("all-recipes", {
        recipes: dbRecipes
      });
    });
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Loads sign up page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Loads add-recipe page
  app.get("/add-recipe", function(req, res) {
    res.render("add-recipe");
  });

  // Gets profile of current user
  app.get("/profile", function(req, res) {
    // If user is logged in, display their profile
    if (req.user) {
      db.Chef.findOne({
        include: db.Recipe,
        where: { id: req.user.id }
      }).then(function(dbChef) {
        // If user is logged in, display user's profile page
        var joinDate = moment(dbChef.createdAt).format("LL");
        var chefRecipes = dbChef.Recipes;
        res.render("profile", {
          chef: dbChef,
          date: joinDate,
          recipe: chefRecipes
        });
      });
    } else {
      // User is not logged in; send them to login page
      res.render("login");
    }
  });

  // Gets profile of chef by chefId
  app.get("/profile/:chefId", function(req, res) {
    db.Chef.findOne({
      include: db.Recipe,
      where: { id: req.params.chefId }
    }).then(function(dbChef) {
      var joinDate = moment(dbChef.createdAt).format("LL");
      var chefRecipes = dbChef.Recipes;
      
      res.render("profile", {
        chef: dbChef,
        date: joinDate,
        recipe: chefRecipes
      });
    });
  });
  // --------------------------------------------
  // --------------------------------------------

  app.get("/profile/:chefId", function(req, res) {
    db.Chef.findAll({
      include: db.Recipe,
      where: { id: req.params.chefId }
    }).then(function(dbChef) {
      var joinDate = moment(dbChef[0].createdAt).format("LL");
      var chefRecipes = dbChef[0].Recipes;
      console.log(dbChef[0].Recipes);
      res.render("profile", {
        chef: dbChef,
        date: joinDate,
        recipe: chefRecipes
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
