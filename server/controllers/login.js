const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (!passOk) {
      res.status(200).send("pass not ok");
    }
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          res.cookie("token", token, { sameSite: "none", secure: true }).json({
            id: foundUser._id,
          });
        }
      );
    }
  } else {
    res.status(500).send("no found");
  }
};
