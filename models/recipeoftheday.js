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
    }
  });

  return RecipeOfTheDay;
};