module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imgURL: {
      type: DataTypes.TEXT
    }
  });

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.Chef, {
      foreignKey: {
        allowNull: false
      }
    });

    // Many-to-many association between Recipe and Category
    // Creates RecipeCategories table
    Recipe.belongsToMany(models.Category, { through: "RecipeCategories" });
  };
  //project = category // user = recipe
  return Recipe;
};
