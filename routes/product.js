const express = require("express")
const router = express.Router()


const { getProductById, createProduct } = require("../controllers/product")
const { isSignedin, isAuthenticate, isAdmin } = require("../controllers/auth")
const { getuserById } = require("../controllers/user")


//params
router.param("userId", getuserById)
router.param("productId", getProductById)

//all of sctuls routes
router.post("/product/create/:userId", isSignedin, isAuthenticate, isAdmin, createProduct)