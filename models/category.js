module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    Category.belongsToMany(models.Recipe, {
      through: "RecipeCategories"
    });
  };

  return Category;
};

// Recipe.associate = function(models) {
//     Recipe.belongsTo(models.Chef, {
//         foreignKey: {
//             allowNull: false
//         }

//     }),
//     Recipe.belongsToMany(models.Category, { through: RecipeCategory });

// }
