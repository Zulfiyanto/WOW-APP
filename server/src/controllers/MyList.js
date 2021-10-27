const { my_list, user, book } = require("../../models");
exports.AddList = async (req, res) => {
  try {
    const { book_id } = req.body;
    const addList = await my_list.create({
      user_id: req.user.id,
      book_id: book_id,
    });

    let list = await my_list.findOne({
      where: {
        id: addList.id,
      },
      include: {
        model: user,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      include: {
        model: book,
        as: "books",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        list,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.GetList = async (req, res) => {
  try {
    let list = await my_list.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: book,
          as: "books",
          attributes: {
            exclude: ["user_id", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    list = JSON.parse(JSON.stringify(list));

    list = list.map((item) => {
      return {
        ...item,
        cover: process.env.FILE_PATH + item.books.cover,
        book_file: process.env.FILE_PATH + item.books.book_file,
      };
    });
    res.send({
      status: "success",
      data: { list },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
