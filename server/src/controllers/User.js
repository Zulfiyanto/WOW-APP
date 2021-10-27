let { user } = require("../../models");

exports.GetUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { users },
    });
  } catch (err) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await user.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const users = {
      ...data,
      profile_file: process.env.FILE_PATH + data.profile_file,
    };

    res.send({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const Data = {
      ...data,
      profile_file: req.files.profile_file[0].filename,
    };

    await user.update(Data, {
      where: { id },
    });

    res.send({
      status: "success",
      data: { user: Data, profile_file: process.env.FILE_PATH + user.profile_file },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.DeleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
