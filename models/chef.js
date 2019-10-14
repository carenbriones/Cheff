var bcrypt = require("bcryptjs");

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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pictureURL: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icon-library.net/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
    }
  });

  Chef.associate = function(models) {
    Chef.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
  };

  // Checks if an unhashed password by the user can be compared to the hashed password
  // stored in our database
  Chef.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Before a Chef is created, we will automatically hash their password
  Chef.addHook("beforeCreate", function(chef) {
    chef.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return Chef;
};

// Id
// Name
// email
// Picture URL
