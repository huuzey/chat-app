const User = require("../models/User");

module.exports = allUsers = async (req, res) => {
  try {
    const rest = await User.find({ _id: { $ne: req.params.id } })
      .select(["username", "_id"])
      .limit(40);
    res.status(200).send(rest);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
