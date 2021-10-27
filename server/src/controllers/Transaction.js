const { transaction, user } = require("../../models");

exports.AddTransaction = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const scheme = await transaction.create({
      transfer_proof: req.files.transfer_proof[0].filename,
      remaining_active: "30",
      user_status: "Not Active",
      payment_status: "Pending",
      user_id: req.user.id,
    });

    const transactions = await transaction.findOne({
      where: {
        id: scheme.id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        ...transactions.dataValues,
        transfer_proof: process.env.FILE_PATH + transactions.transfer_proof,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.UpdateTransaction = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await transaction.update({ ...data }, { where: { id } });

    const transactions = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    });

    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.GetTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        ...transactions.dataValues,
        transfer_proof: process.env.FILE_PATH + transactions.transfer_proof,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.GetTransactions = async (req, res) => {
  try {
    let transactions = await transaction.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    });

    transactions = JSON.parse(JSON.stringify(transactions));

    transactions = transactions.map((item) => {
      return {
        ...item,
        transfer_proof: process.env.FILE_PATH + item.transfer_proof,
      };
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
