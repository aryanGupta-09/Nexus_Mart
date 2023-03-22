const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin_controller");

router.get("/profile", passport.checkAdminAuth, adminController.profile);

router.get("/modify-product-category", passport.checkAdminAuth, adminController.modifyProductCategory);

router.post("/add-product-category", passport.checkAdminAuth, adminController.addProductCategory);

router.get("/sign-in", adminController.signIn);

router.get("/delete-product-category/:id", passport.checkAdminAuth, adminController.deleteProductCategory);

//product routes
router.get("/admin-view-product/:id", passport.checkAdminAuth, adminController.viewProduct);

router.get("/modify-product/:id", passport.checkAdminAuth, adminController.modifyProduct);

router.post("/add-product/:id", passport.checkAdminAuth, adminController.addProduct);

router.get("/delete-product/:id/:p_id", passport.checkAdminAuth, adminController.deleteProduct);


// use passport as a middleware to authenticate
router.post("/create-session", passport.authenticate(
    "admin",
    {failureRedirect: "/admin/sign-in"}), 
    adminController.createSession);

router.get("/sign-out", adminController.destroySession);

module.exports=router;