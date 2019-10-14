var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // ---------- RECIPES ----------------//

  // Get ALL recipes with their Chef and categories
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({
      include: [db.Chef, db.Category]
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  // Get a recipe by id
  app.get("/api/recipes/:id", function(req, res) {
    db.Recipe.findOne({
      include: [db.Chef, db.Category],
      where: { id: req.params.id }
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  // Get recipes by category ID
  app.get("/api/recipes/categories/:categoryId", function(req, res) {
    db.Recipe.findAll({
      // Joins tables
      include: [db.Chef, db.Category],
      through: {
        where: { CategoryId: req.params.categoryId }
      }
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  //-----------CHEFS-----------------//

  // Get all chefs and their recipes
  app.get("/api/chefs", function(req, res) {
    db.Chef.findAll({
      include: db.Recipe
    }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });

  // Get a Chef by their id
  app.get("/api/chefs/:id", function(req, res) {
    db.Chef.findAll({
      include: db.Recipe,
      where: { id: req.params.id }
    }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });

  //------- CATEGORIES ------------//
  // Get all categories with their recipes
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({
      include: db.Recipe
    }).then(function(dbCategorys) {
      res.json(dbCategorys);
    });
  });

  // Get one category by id with their recipes
  app.get("/api/categories/:id", function(req, res) {
    db.Category.findOne({
      include: db.Recipe,
      through: {
        where: { CategoryId: req.params.categoryId }
      }
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  //----------CREATE--------------//
  // Create new recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // If User has valid login credentials, send them to members page.
  // Otherwise, user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Should it be req.chef?
    res.json(req.user);
  });

  //
  app.post("/api/signup", function(req, res) {
    db.Chef.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      pictureURL: req.body.pictureURL
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  //------------DELETE--------------//
  // Delete a recipe by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(
      dbRecipes
    ) {
      res.json(dbRecipes);
    });
  });

  // Delete a chef by id
  app.delete("/api/chefs/:id", function(req, res) {
    db.Chef.destroy({ where: { id: req.params.id } }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });
};

//-------------------------------------------//

//    /api/recipes-of-the-day
// app.get("/api/recipes-of-the-day", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });

// //  Get recipes with their category and Chef~~ (find one)
// app.get("/api/recipes/:category", function(req, res) {
//   db.Recipe.findAll({
//     include: [db.Chef, db.Category],
//     where: { category: req.params.category }
//   }).then(function(dbRecipes) {
//     res.json(dbRecipes);
//   });
// });
