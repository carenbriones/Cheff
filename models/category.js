module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Many-to-many association between Recipe and Category
  // Creates RecipeCategories table
  Category.associate = function(models) {
    Category.belongsToMany(models.Recipe, {
      through: "RecipeCategories"
    });
  };

  return Category;
};
