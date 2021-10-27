"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      user.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "user_id",
        },
      });
      user.hasMany(models.book, {
        as: "books",
        foreignKey: {
          name: "user_id",
        },
      });
      user.hasOne(models.profile, {
        as: "profiles",
        foreignKey: {
          name: "user_id",
        },
      });
      user.hasMany(models.my_list, {
        as: "my_lists",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      address: DataTypes.STRING,
      profile_file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
