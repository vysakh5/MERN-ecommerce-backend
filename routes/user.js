const express = require("express")
const router = express.Router()

const { getuserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedin, isAuthenticate, isAdmin } = require("../controllers/auth")

router.param("userId", getuserById)

router.get("/user/:userId", isSignedin, isAuthenticate, getUser)

router.put("/user/:userId", isSignedin, isAuthenticate, updateUser)

router.put("/order/user/:userId", isSignedin, isAuthenticate, userPurchaseList)

module.exports = router;