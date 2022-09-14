const { Shopify, LATEST_API_VERSION } = require("@shopify/shopify-api");

const { topLevelAuthRedirect } = require("../helpers/top-level-auth-redirect");
module.exports = {
  applyAuthMiddleware: async (app) => {
    app.get("/auth", async (req, res) => {
      if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
        return res.redirect(
          `/auth/toplevel?${new URLSearchParams(req.query).toString()}`
        );
      }

      const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        app.get("use-online-tokens")
      );

      res.redirect(redirectUrl);
    });

    app.get("/auth/toplevel", (req, res) => {
      res.cookie(app.get("top-level-oauth-cookie"), "1", {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
      });

      res.set("Content-Type", "text/html");

      res.send(
        topLevelAuthRedirect({
          apiKey: Shopify.Context.API_KEY,
          hostName: Shopify.Context.HOST_NAME,
          host: req.query.host,
          query: req.query,
        })
      );
    });

    app.get("/auth/callback", async (req, res) => {
      try {
        const session = await Shopify.Auth.validateAuthCallback(
          req,
          res,
          req.query
        );
        console.log("accessToken   :   ", session.accessToken);

        app.set(
          "active-shopify-shops",
          Object.assign(app.get("active-shopify-shops"), {
            [session.shop]: session.scope,
          })
        );
        // Redirect to app with shop parameter upon auth
        res.redirect(`/?shop=${session.shop}&host=${host}`);
      } catch (e) {
        console.log(e);
        switch (true) {
          case e instanceof Shopify.Errors.InvalidOAuthError:
            res.status(400);
            res.send(e.message);
            break;
          case e instanceof Shopify.Errors.CookieNotFound:
          case e instanceof Shopify.Errors.SessionNotFound:
            // This is likely because the OAuth session cookie expired before the merchant approved the request
            res.redirect(`/auth?shop=${req.query.shop}`);
            break;
          default:
            res.status(500);
            res.send(e.message);
            break;
        }
      }
    });
  },
};
