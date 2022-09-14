const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
// const cookieParser = require("cookie-parser");
// const { applyAuthMiddleware } = require("./verification/auth");
// const { verifyRequest } = require("./verification/verify-request");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
// const { Shopify, LATEST_API_VERSION } = require("@shopify/shopify-api");
// const DB_PATH = `${process.cwd()}/database.sqlite`;
// const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
// const USE_ONLINE_TOKENS = false;
// const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";

// Shopify.Context.initialize({
//   API_KEY: process.env.SHOPIFY_API_KEY,
//   API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
//   SCOPES: process.env.SCOPES.split(","),
//   HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
//   HOST_SCHEME: process.env.HOST.split("://")[0],
//   API_VERSION: LATEST_API_VERSION,
//   IS_EMBEDDED_APP: true,
//   // This should be replaced with your preferred storage strategy
//   SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
// });
// const ACTIVE_SHOPIFY_SHOPS = {};
// global.ACTIVE_SHOPIFY_SHOPS = ACTIVE_SHOPIFY_SHOPS;

console.log("panthil malaviya");
// Database connection
// require("./initdb")();
// const PORT = process.env.PORT || 5050;

const PORT = process.env.PORT || 5050;

// export for test use only
// async function createServer(
//   root = process.cwd(),
//   isProd = process.env.NODE_ENV === "production"
// ) {
//   const app = express();

//   app.use(
//     bodyParser.urlencoded({
//       parameterLimit: 100000,
//       limit: "50mb",
//       extended: true,
//     })
//   );
//   app.set("top-level-oauth-cookie", TOP_LEVEL_OAUTH_COOKIE);
//   app.set("active-shopify-shops", ACTIVE_SHOPIFY_SHOPS);
//   app.set("use-online-tokens", USE_ONLINE_TOKENS);

//   app.use(cookieParser(Shopify.Context.API_SECRET_KEY));
//   const OrderRouter = require("./routes/order.router");
//   app.use("/", OrderRouter);
//   applyAuthMiddleware(app);

//   app.use(express.json());

//   app.use((req, res, next) => {
//     const shop = req.query.shop;
//     if (Shopify.Context.IS_EMBEDDED_APP && shop) {
//       res.setHeader(
//         "Content-Security-Policy",
//         `frame-ancestors https://${shop} https://admin.shopify.com;`
//       );
//     } else {
//       res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
//     }
//     next();
//   });

//   app.use("/*", (req, res, next) => {
//     const { shop } = req.query;

//     // Detect whether we need to reinstall the app, any request from Shopify will
//     // include a shop in the query parameters.
//     if (app.get("active-shopify-shops")[shop] === undefined && shop) {
//       res.redirect(`/auth?${new URLSearchParams(req.query).toString()}`);
//     } else {
//       next();
//     }
//   });
//   /**
//    * @type {import('vite').ViteDevServer}
//    */
//   return { app };
// }

//Order Router
// const OrderRouter = require("./routes/order.router");
// app.use("/", OrderRouter);
// if (!isTest) {
// createServer().then(({ app }) =>
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
// );
// }
