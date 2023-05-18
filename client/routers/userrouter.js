const createUser = require("../controllers/usercontroller");
const profile = require("../controllers/tokenverify");
const login = require("../controllers/login");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", profile);

module.exports = router;
