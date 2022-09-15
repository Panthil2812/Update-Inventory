const createError = require("http-errors");
const jwt = require("jsonwebtoken");
var axios = require("axios");
const QuerySku = async (sku) => {
  return `query MyProductVariants {
    productVariants(first: ${1}, query: "${sku}") {
      edges {
        node {
          id
          sku
          inventoryItem {
            id
            inventoryLevels(first: 1) {
              edges {
                node {
                  id
                  location {
                    id
                  }
                  available
                }
              }
            }
          }
        }
      }
    }
  }`;
};
const configData = async (data) => {
  return {
    method: "post",
    url: `https://${process.env.SHOP}/admin/api/2022-07/graphql.json`,
    headers: {
      "Content-Type": "application/graphql",
      "X-Shopify-Access-Token": `${process.env.SHOPIFY_API_TOKEN}`,
    },
    data: data,
  };
};
const added = async (str) => {
  if (str.startsWith("10")) {
    if (str.endsWith("B")) {
      console.log(str.substring(0, 7));
      return str.substring(0, 7);
    } else {
      console.log(str + "B");
      return str + "B";
    }
  } else {
    return null;
  }
};
const getOrderJson = async (dataobj) => {
  try {
    let products = [];
    if (dataobj && dataobj.length > 0) {
      for (const data of dataobj) {
        // data.map(async (data, index) => {
        // console.log(
        //   `index: ${index} \n ,
        //   product_id:${data.product_id} \n,
        //   quantity : ${data.quantity} \n,
        //   sku : ${data.sku} \n,
        //   variant_id : ${data.variant_id}\n,
        //   variant_title : ${data.variant_title}`
        // );
        const string = await added(data.sku);
        if (string) {
          const config = await configData(await QuerySku(string));
          // console.log("config: ", config);
          const response = await axios(config);
          if (response.data) {
            console.log(response.data);
            const res_data = response?.data?.data?.productVariants?.edges[0]
              ? response?.data?.data?.productVariants?.edges[0].node
                  .inventoryItem?.inventoryLevels?.edges[0].node
              : "";
            products.push({
              sku: string,
              quantity: data.quantity,
              inventory_item_id: res_data?.id.split("inventory_item_id=")[1],
              location_id: res_data.location.id.split("Location/")[1],
              available: res_data.available,
            });
            console.log("res_data : ", res_data);
          }
          // axios(configData(QuerySku(string)))
          //   .then(function (response) {
          //     console.log(JSON.stringify(response.data));
          // const res_data =
          //   response?.data?.data?.productVariants?.edges[0].node
          //     .inventoryItem?.inventoryLevels?.edges[0].node;
          // // console.log(res_data);
          // // console.log("panthil : ", {
          // //   sku: string,
          // //   quantity: data.quantity,
          // //   inventory_item_id:
          // //     res_data?.id.split("inventory_item_id=")[1],
          // //   location_id: res_data.location.id.split("Location/")[1],
          // //   available: res_data.available,
          // // });
          // products.push({
          //   sku: string,
          //   quantity: data.quantity,
          //   inventory_item_id:
          //     res_data?.id.split("inventory_item_id=")[1],
          //   location_id: res_data.location.id.split("Location/")[1],
          //   available: res_data.available,
          // });
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        }
      }
      return Promise.resolve(products);
    } else {
      return Promise.resolve(null);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = {
  //GET ALL USER INFORMATION
  getAllUser: async (req, res) => {
    try {
      console.log(" getAllUser : calling .....");

      const Json = await getOrderJson(req.body.line_items);
      console.log("getAllUser : ", Json);

      if (Json) {
        res.send({
          status: res.statusCode,
          message: "successfully all user information",
          data: "products",
        });
      }
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
