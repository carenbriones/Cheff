module.exports = function(sequelize, DataTypes) {
  var Chef = sequelize.define("Chef", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isEmail: true
      } 
    },
    picture_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Chef.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Chef.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
  };

  return Chef;
};


// Id
// Name
// email
// Picture URL