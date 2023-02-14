const express = require("express");
const router = express.Router();

const customersController = require("../controllers/customers_controller");

router.get("/profile", customersController.profile);

router.get("/sign-up", customersController.signUp);
router.get("/sign-in", customersController.signIn);

module.exports=router;