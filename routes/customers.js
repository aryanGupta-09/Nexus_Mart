const express = require("express");
const router = express.Router();
const passport = require("passport");

const customersController = require("../controllers/customers_controller");

router.get("/profile/:id", passport.checkCustAuth, customersController.profile);

router.get("/categories/:id", customersController.viewCategory);

router.get("/sign-up", customersController.signUp);
router.get("/sign-in", customersController.signIn);

router.post("/create", customersController.create);

// use passport as a middleware to authenticate
router.post("/create-session", passport.authenticate(
    "customer",
    {failureRedirect: "/customers/sign-in"}), 
    customersController.createSession);

router.get("/sign-out", customersController.destroySession);

module.exports=router;