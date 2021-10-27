"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "user_id",
        },
      });
      book.hasMany(models.my_list, {
        as: "my_lists",
        foreignKey: {
          name: "book_id",
        },
      });
    }
  }
  book.init(
    {
      title: DataTypes.STRING,
      date: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.STRING,
      cover: DataTypes.STRING,
      book_file: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
