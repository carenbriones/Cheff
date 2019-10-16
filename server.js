require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var morgan = require("morgan");
var edamam = require("./edamam");

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

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  createCategories();
  createEdamamChef();
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

function createCategories() {
  db.Category.bulkCreate([
    {
      category: "Paleo"
    },
    {
      category: "Vegan"
    },
    {
      category: "Vegetarian"
    },
    {
      category: "Pescatarian"
    }
  ]).catch(function(err) {
    console.log(err);
    res.status(401).json(err);
  });
}

function createEdamamChef() {
  // User
  // .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  // .spread(function(user, created) {
  //   console.log(user.get({
  //     plain: true
  //   }))
  // console.log(created)

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
          //edamam(function(totalRecipes) {
          db.Category.findOne({
            where: { category: "Paleo" }
          })
            .then(function(dbCategory) {
              var categoryId = dbCategory.id;
              db.Recipe.bulkCreate([
                {
                  name: "RECETA NUEVA",
                  description: "ESTA ES UNA RECETA FICTICIA",
                  ingredients: "PAPA, CEBOLLA, SAL, TOMATE",
                  steps: "REVUELVE TODO Y PONLO EN EL MICRO",
                  imgURL: "FOTOCHAFISIMA.JPG",
                  ChefId: dbChef.id
                },
                {
                  name: "DOS",
                  description: "SEGUNDA RECETA NADA MAS PARA VER QUE ONDA",
                  ingredients: "AJO PIMIENTA SAL Y COMINOS",
                  steps: "CORTA EL AJO Y TIRALO A LA BASURA",
                  imgURL: "OTRAFOTOCHAFA.JPG",
                  ChefId: dbChef.id
                }
              ]).then(function(dbRecipes) {
                console.log(dbRecipes);
                for (i = 0; i < dbRecipes.length; i++) {
                  dbRecipes[i].addCategory(categoryId);
                }
              });
            })
            .catch(console.log);
          //});
        } else {
          console.log(dbRecipes);
        }
      });
    })
    .catch(console.log);
}
// db.Recipe.create(req.body.recipe).then(function(dbRecipe) {
//   // Associate Categories to Recipe
//   for (var i = 0; i < req.body.categories.length; i++) {
//     db.Category.findOne({
//       where: {
//         id: req.body.categories[i]
//       }
//     }).then(function(dbCategory) {
//       dbRecipe.setCategories(dbCategory);
//     });
//   }
//   res.json(dbRecipe);
// });
module.exports = app;
