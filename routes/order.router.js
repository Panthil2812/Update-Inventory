const express = require("express");
const app = express();
const router = express.Router();
const db = require("../controller/order.controller");
app.use(express.json());

router.post("/webhook/createOrder", db.inventory_update);

module.exports = router;
