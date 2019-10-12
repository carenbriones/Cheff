var db = require("../models");

// change examples to /api/recipes
//  app.get
//    /api/recipes
//    /api/recipes/:category
//    /api/recipes/:id
//    /api/chef
//    /api/chef/:id


// app.post
//    /api/recipes

// app.delete
//    /api/recipes/:id

module.exports = function(app) {
  // Get all examples
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  app.get("/api/recipes/:category", function(req, res) {
    db.Recipe.findAll({
      where: { category: req.params.category }
    }).then(function(dbRecipes) {
      res.json(dbRecipe);
    });
  });

  app.get("/api/recipes/:id", function(req, res) {
    db.Recipe.findAll({
      where: { category: req.params.id }
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
//-------------------------------------------//
app.get("/api/chefs", function(req, res) {
  db.Chef.findAll({}).then(function(dbChefs) {
    res.json(dbChefs);
  });
});

app.get("/api/chefs/:id", function(req, res) {
  db.Chef.findAll({
    where: { id: req.params.id }
  }).then(function(dbChefs) {
    res.json(dbChefs);
  });
});

//-------------------------------------------//

//    /api/recipes-of-the-day
// app.get("/api/recipes-of-the-day", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });
//    /api/categories

app.get("/api/categories", function(req, res) {
  db.Category.findAll({}).then(function(dbCategorys) {
    res.json(dbCategorys);
  });
});

//    /api/categories/:id
// ????????????????
app.get("/api/categories/:id", function(req, res) {
  db.Category.findAll({
    where: req.params.id
  }).then(function(dbCategorys) {
    res.json(dbCategorys);
  });
});


  // Create a new example
  //-------------------------------//
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.post("/api/chefs", function(req, res) {
    db.Chef.create(req.body).then(function(dbChef) {
      res.json(dbChef);
    });
  });

  // Delete an example by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipes.destroy({ where: { id: req.params.id } }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  
  app.delete("/api/chefs/:id", function(req, res) {
    db.Recipes.destroy({ where: { id: req.params.id } }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  
};
