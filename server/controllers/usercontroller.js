const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptsalt = bcrypt.genSaltSync(10);

module.exports = createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password, bcryptsalt);
    const found = await User.findOne({ username });
    if (found) {
      return res.status(200).send("username");
    }
    const crated = await User.create({ username, password: hashedpassword });
    jwt.sign(
      { id: crated._id, username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(200)
          .json({ id: crated._id, username: crated.username });
      }
    );
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
