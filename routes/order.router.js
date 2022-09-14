const express = require("express");
const app = express();
const router = express.Router();
// // const { applyAuthMiddleware } = require("../verification/auth");
// const { verifyWebhook } = require("../verification/verify-request");
const db = require("../controller/order.controller");
app.use(express.json());
// applyAuthMiddleware(app);
//GET  :all user data
router.post("/users/fetch_users", db.getAllUser);

module.exports = router;
