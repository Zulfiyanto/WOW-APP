"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class my_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      my_list.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "user_id",
        },
      });
      my_list.belongsTo(models.book, {
        as: "books",
        foreignKey: {
          name: "book_id",
        },
      });
    }
  }
  my_list.init(
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "my_list",
    }
  );
  return my_list;
};
