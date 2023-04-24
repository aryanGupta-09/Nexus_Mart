const Customer = require("../models/customer");
const Product_Category = require("../models/product_category");
const Product = require("../models/product");
const CartItem = require("../models/cart_item");
const OrderItem = require("../models/order_item");
const ShoppingCartRelation = require("../models/shopping_cart_relation");
const Order = require("../models/order");
const db = require("../config/sequelize");

module.exports.profile = async function (req, res) {
    const customer = await Customer.findByPk(req.params.id);
    if (customer == null) { console.log("error in finding customer while rendering profile"); return; }
    else if (customer.id != req.user.id) {
        return res.redirect("back");
    } else {
        return res.render("customer_profile", {
            title: "NexusMart | Profile",
            customer: customer
        });
    }
}

module.exports.shoppingCart = async function (req, res) {
    const customer = await Customer.findByPk(req.params.id);
    let cartItems = await CartItem.findAll({ where: { CustomerId: req.params.id }, order: [["createdAt", "ASC"]] });

    let products = [];
    for (let i = 0; i < cartItems.length; i++) {
        let product = await Product.findByPk(cartItems[i].ProductId);
        products.push(product);
    }

    return res.render("shopping_cart", {
        title: "NexusMart | Shopping Cart",
        customer: customer,
        cartItems: cartItems,
        products: products
    });
}

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/customers/profile");
    }

    return res.render("customer_sign_up", {
        title: "NexusMart | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/customers/profile");
    }

    return res.render("customer_sign_in", {
        title: "NexusMart | Sign In"
    });
}

// get the sign up data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
    }

    const customer = await Customer.findOne({ where: { email: req.body.email } });
    if (!customer) {
        const customer = await Customer.create(req.body);
        if (customer == null) { console.log("error in creating customer while signing up"); return; }
        return res.redirect("/customers/sign-in");
    } else {
        return res.redirect("back");
    }
}

module.exports.viewCategory = async function (req, res) {
    const category = await Product_Category.findByPk(req.params.id);
    if (category == null) { console.log("error in rendering category"); return; }
    const products = await Product.findAll({ where: { ProductCategoryId: category.id } });
    const cartItems = await CartItem.findAll({ where: { CustomerId: req.user.id }, order: [["createdAt", "ASC"]] });
    return res.render("category", {
        title: "NexusMart | Category",
        products: products,
        customer: req.user,
        cartItems: cartItems
    });
}

module.exports.updateCart = async function (req, res) {
    const customer = await Customer.findByPk(req.params.id);
    if (customer == null) { console.log("error in finding customer while adding product to cart"); return; }
    else if (customer.id != req.user.id) {
        return res.redirect("back");
    } else {
        const cartItem = await CartItem.findOne({ where: { CustomerId: req.params.id, ProductId: req.params.p_id } });
        if (cartItem == null && req.params.qty == "plus" && req.params.stock > 0) {
            const cartItem = await CartItem.create({
                ProductId: req.params.p_id,
                CustomerId: req.params.id,
                quantity: 1
            });
            if (cartItem == null) { console.log("error in creating cart item while adding product to cart"); return; }
        } else if (cartItem != null) {
            if (req.params.qty == "plus" && cartItem.quantity < req.params.stock) {
                cartItem.quantity++;
            } else if (req.params.qty == "minus" && cartItem.quantity > 0) {
                cartItem.quantity--;
                if (cartItem.quantity == 0) cartItem.destroy();
            }
            cartItem.save();
        }
        return res.redirect("back");
    }
}

module.exports.removeFromCart = async function (req, res) {
    const cartItem = await CartItem.findByPk(req.params.c_id);
    if (cartItem == null) { console.log("error in finding cart item while removing product from cart"); return; }
    cartItem.destroy();
    return res.redirect("back");
}

module.exports.clearCart = async function (req, res) {
    const cartItems = await CartItem.findAll({ where: { CustomerId: req.params.id } });
    if (cartItems == null) { console.log("error in finding cart items while clearing cart"); return; }
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].destroy();
    }
    return res.redirect("back");
}

module.exports.checkoutCart = async function (req, res) {
    const TODAY = new Date();
    const cartItems = await CartItem.findAll({ where: { CustomerId: req.params.id } });
    if (cartItems == null) { console.log("error in finding cart items while clearing cart"); return; }

    if (cartItems.length == 0) { return res.redirect("back"); }

    const order = await Order.create({
        placed_date: "27-01-12",
        arrival_date: "27-01-12",
        total_amount: 0,
        CustomerId: req.params.id,
        num_items: cartItems.length
    })

    for (let i = 0; i < cartItems.length; i++) {
        const orderItem = await OrderItem.create({
            ProductId: cartItems[i].ProductId,
            quantity: cartItems[i].quantity
        });
        const product = await Product.findByPk(orderItem.ProductId);
        order.total_amount += product.total_price*orderItem.quantity;
        product.stock -= orderItem.quantity; 
        product.save();
        cartItems[i].destroy();
    }
    order.save();
    return res.redirect("back");

}

module.exports.viewOrders = async function (req, res) {
    let orders = await Order.findAll({ where: { CustomerId: req.params.id }, order: [["createdAt", "ASC"]] });
    return res.render("orders", {
        title: "NexusMart | Orders",
        orders : orders
    });
}

// sign in and create a session for the customer
module.exports.createSession = function (req, res) {
    return res.redirect("/");
}

// sign out and destroy the session for the customer
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { console.log("error in logging out"); return next(err); }
        return res.redirect("/");
    });
}