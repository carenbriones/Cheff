var db = require("../models");

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
      res.render("single-recipe", {
        recipe: dbRecipe
      });
    });
  });

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

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/add-recipe", function(req, res) {
    res.render("add-recipe");
  });

  app.get("/profile", function(req, res) {
    db.Recipe.findAll({
      include: [db.Chef, db.Category],
      where: { ChefId: req.user.id }
    }).then(function(dbRecipes) {
      res.render("profile", {
        chef: req.user,
        recipes: dbRecipes
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// CLICK ON CHEF'S NAME
//  URL /chef/:id
//res.render "profile.handlebars"

// CLICK ON CATEGORIES
//  URL /categories/:id
// res.render all-recipes.handlebars (by category)

// CLICK ON
