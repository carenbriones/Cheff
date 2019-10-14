module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    // Giving the Author model a name of type STRING
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  Category.associate = function(models) {
      Category.belongsToMany(models.Recipe, { through: models.RecipeCategory });
  }

  return Category;
}


// Recipe.associate = function(models) {
//     Recipe.belongsTo(models.Chef, {
//         foreignKey: {
//             allowNull: false
//         }

//     }),
//     Recipe.belongsToMany(models.Category, { through: RecipeCategory });

// }
