module.exports = function(sequelize, DataTypes) {
  var RecipeOfTheDay = sequelize.define("RecipeOfTheDay", {
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
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return RecipeOfTheDay;
  //One to one association between recipeoftheday and Category
  //One to one association between ROTD and Chef
  // RecipeOfTheDay.associate = function(models) {
  //   RecipeOfTheDay.belongsTo(models.Chef, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   RecipeOfTheDay.belongsTo(models.Category, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   return RecipeOfTheDay;
  // };
};
