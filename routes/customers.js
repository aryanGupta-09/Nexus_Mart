const express = require("express");
const router = express.Router();
const passport = require("passport");

const customersController = require("../controllers/customers_controller");

router.get("/profile/:id", passport.checkCustAuth, customersController.profile);

router.get("/categories/:id", customersController.viewCategory);

router.get("/sign-up", customersController.signUp);
router.get("/sign-in", customersController.signIn);

router.get("/shopping-cart/:id", passport.checkCustAuth, customersController.shoppingCart);
router.get("/update-cart/:id/:p_id/:qty/:stock", passport.checkCustAuth, customersController.updateCart);
router.get("/remove-product/:c_id/", passport.checkCustAuth, customersController.removeFromCart);
router.get("/clear-cart/:id/", passport.checkCustAuth, customersController.clearCart);
router.get("/checkout-cart/:id/", passport.checkCustAuth, customersController.checkoutCart);

router.post("/create", customersController.create);

// use passport as a middleware to authenticate
router.post("/create-session", passport.authenticate(
    "customer",
    {failureRedirect: "/customers/sign-in"}), 
    customersController.createSession);

router.get("/sign-out", customersController.destroySession);

module.exports=router;