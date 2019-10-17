require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var morgan = require("morgan");
var edamam = require("./edamam");
//var recepiesOfTheDay = require("./recepiesoftheday");

var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };
var categories = [
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Paleo",
  "Recipe-of-the-day"
];

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  findOrCreateCategories(categories);
  createEdamamChef();
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// function createCategories() {
//   db.Category.bulkCreate([
//     {
//       category: "Vegan"
//     },
//     {
//       category: "Vegetarian"
//     },
//     {
//       category: "Pescatarian"
//     },
//     {
//       category: "Paleo"
//     },
//     {
//       category: "Recipe-of-the-day"
//     }
//   ]).catch(function(err) {
//     console.log(err);
//     res.status(401).json(err);
//   });
// }

//NEED TO FIGURE OUT THE FIND OR CREATE FOR CHEF!!
function createEdamamChef() {
  db.Chef.create({
    name: "Edamam",
    email: "chef@mail.com",
    picture: "picture.jpg",
    password: "password"
  })
    .then(function(dbChef) {
      db.Recipe.findAll({
        include: [db.Chef, db.Category],
        where: { ChefId: dbChef.id }
      }).then(function(dbRecipes) {
        if (dbRecipes.length === 0) {
          console.log("NO RECIPES");
          edamam(function(totalRecipes) {
            var counter = 0;
            var categories = ["Vegan", "Vegetarian", "Pescatarian", "Paleo"];
            addFromEdamam(categories, counter, totalRecipes, dbChef.id);
          });
        }
      });
    })
    .catch(console.log);
}

function addFromEdamam(categories, counter, totalRecipes, chefId) {
  if (counter < 4) {
    db.Category.findOne({
      where: { category: categories[counter] }
    })
      .then(function(dbCategory) {
        console.log(
          "FOUND! Category " + dbCategory.category + "Id " + dbCategory.id
        );
        var categoryId = dbCategory.id;
        var recipesWithChefId = totalRecipes[counter].map(function(recipe) {
          recipe.ChefId = chefId;
          return recipe;
        });
        db.Recipe.bulkCreate(recipesWithChefId).then(function(dbRecipes) {
          for (i = 0; i < dbRecipes.length; i++) {
            dbRecipes[i].addCategory(categoryId);
          }
          counter++;
          addFromEdamam(categories, counter, totalRecipes, chefId);
        });
      })
      .catch(console.log);
  }
}
// Creates category objects if they do not exist in the database
function findOrCreateCategories(categories) {
  for (var i = 0; i < categories.length; i++) {
    db.Category.findOrCreate({
      where: {
        category: categories[i]
      }
    });
  }
}

module.exports = app;
