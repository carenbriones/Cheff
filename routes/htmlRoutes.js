var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
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
      include: [db.Chef, db.Category],
      through: {
        where: { CategoryId: req.params.categoryId }
      }
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
    res.render("profile");
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
