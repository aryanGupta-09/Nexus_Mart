const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin_controller");

router.get("/profile", passport.checkAdminAuth, adminController.profile);

router.get("/modify-product-category", passport.checkAdminAuth, adminController.modifyProductCategory);

router.post("/add-product-category", passport.checkAdminAuth, adminController.addProductCategory);

router.get("/sign-in", adminController.signIn);

// use passport as a middleware to authenticate
router.post("/create-session", passport.authenticate(
    "admin",
    {failureRedirect: "/admin/sign-in"}), 
    adminController.createSession);

router.get("/sign-out", adminController.destroySession);

module.exports=router;