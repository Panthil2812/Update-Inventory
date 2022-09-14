const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { Shopify, LATEST_API_VERSION } = require("@shopify/shopify-api");
module.exports = {
  //GET ALL USER INFORMATION
  getAllUser: async (req, res) => {
    try {
      console.log(" getAllUser : calling .....", req.body);
      let products = [];
      // const session = await Shopify.Utils.loadCurrentSession(req, res, false);
      // console.log("session : " + session);
      if (req.body.line_items.length > 0) {
        req.body.line_items.map((data, index) => {
          console.log(
            `index: ${index} \n ,
            product_id:${data.product_id} \n,
            quantity : ${data.quantity} \n,
            sku : ${data.sku} \n,
            variant_id : ${data.variant_id}\n,
            variant_title : ${data.variant_title}`
          );
          products.push(data.sku);
        });
      }
      console.log("getAllUser : ", products);
      res.send({
        status: res.statusCode,
        message: "successfully all user information",
        data: "panthil malaviya........",
      });
      console.log("getAllUser : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllUser : error message: ", error.message);
    }
  },
};
