const express = require("express");
const app = express();
const router = express.Router();
const db = require("../controller/order.controller");
app.use(express.json());

router.post("/users/fetch_users", db.getAllUser);

module.exports = router;
