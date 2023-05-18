const createUser = require("../controllers/usercontroller");
const profile = require("../controllers/tokenverify");
const login = require("../controllers/login");
const allusers = require("../controllers/allusers");
const { addMessage, getMessages } = require("../controllers/singlechat");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", profile);
router.get("/alluser/:id", allusers);
router.post("/message/addmsg", addMessage);
router.post("/message/getmsg", getMessages);

module.exports = router;
