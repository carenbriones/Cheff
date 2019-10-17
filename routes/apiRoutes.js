var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // ---------- RECIPES ----------------//
  // RETURNS MOST RECENT RECIPES FROM DATABASE //
  app.get("/edamam/check-ROTD", function(req, res) {
    db.RecipeOfTheDays.findAll({
      include: [db.Chef, db.Category],
      order: [["createdAt", "DESC"]]
    }).then(function(dbRecipesOfTheDay) {
      if (dbRecipesOfTheDay.length !== 0) {
        //check the date of the most recently created one
        //if it was today, skip and send all in table
        res.json(dbRecipesOfTheDay);
        //if not today, populateRecipeOfTheDay();
      } else {
        //populateRecipeOfTheDay();
        res.json(dbRecipesOfTheDay);
      }
    });
  });

  app.get("/edamam/ROTD", function(req, res) {
    var arr = [];
    db.Recipe.findAll({
      include: [
        {
          model: db.Category,
          where: { id: 1 }
        }
      ]
    }).then(function(dbRecipes) {
      arr.push(dbRecipes[Math.floor(Math.random() * dbRecipes.length)]);
      db.Recipe.findAll({
        include: [
          {
            model: db.Category,
            where: { id: 2 }
          }
        ]
      }).then(function(dbRecipes) {
        arr.push(dbRecipes[Math.floor(Math.random() * dbRecipes.length)]);
        db.Recipe.findAll({
          include: [
            {
              model: db.Category,
              where: { id: 3 }
            }
          ]
        }).then(function(dbRecipes) {
          arr.push(dbRecipes[Math.floor(Math.random() * dbRecipes.length)]);
          db.Recipe.findAll({
            include: [
              {
                model: db.Category,
                where: { id: 3 }
              }
            ]
          }).then(function(dbRecipes) {
            arr.push(dbRecipes[Math.floor(Math.random() * dbRecipes.length)]);

            res.json(arr);
          });
        });
      });
    });
  });

  // models.foo.find({
  //   order: [
  //     Sequelize.fn( 'RAND' ),
  //   ]
  // });
  //-----------------
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

  // Get recipes by chef id
  app.get("/api/recipes/chefs/:id", function(req, res) {
    db.Recipe.findAll({
      include: [db.Chef, db.Category],
      where: { ChefId: req.params.id }
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  // Get recipes by category ID
  app.get("/api/recipes/categories/:categoryId", function(req, res) {
    db.Recipe.findAll({
      include: [
        {
          model: db.Category,
          where: { id: req.params.categoryId }
        }
      ]
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
    console.log(req.body.categories);
    db.Recipe.create({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      imgURL: req.body.imgURL,
      ChefId: req.body.ChefId
    }).then(function(dbRecipe) {
      // Associate Categories to Recipe
      for (var i = 0; i < req.body.categories.length; i++) {
        db.Category.findOne({
          where: {
            id: req.body.categories[i]
          }
        }).then(function(dbCategory) {
          dbRecipe.addCategory(dbCategory);
        });
      }
      res.json(dbRecipe);
    });
  });

  // If User has valid login credentials, send them to members page.
  // Otherwise, user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Creates a Chef
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
        console.log(err);
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

  /* CHEFS */
  // If User has valid login credentials, send them to members page.
  // Otherwise, user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        pictureURL: req.user.pictureURL,
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

//------------I MIGHT NEED THIS LATER-------------------------------//

//    /api/recipes-of-the-day
// app.get("/api/recipes-of-the-day", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });
