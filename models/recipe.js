module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      // Giving the Author model a name of type STRING
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1]
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len:[1]
        }
      }
    });

    Recipe.associate = function(models) {
      Recipe.belongsTo(models.Chef, {
          foreignKey: {
              allowNull: false
          }
      }),

      Recipe.belongsToMany(models.Category, { through: models.RecipeCategory });
    }
    //project = category // user = recipe
    return Recipe;
}