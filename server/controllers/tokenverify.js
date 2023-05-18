const jwt = require("jsonwebtoken");
module.exports = profile = async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (error, userdata) => {
      if (error) throw error;
      res.json(userdata);
    });
  } else {
    res.status(200).json("no token");
  }
};
