var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedin} = require("../controllers/auth");


router.post("/signup",[
    check("name", "name should be at least 3 char").isLength({ min: 3}),
    check("email", "email is require").isEmail(),
    check("password", "passwaord should 8 char").isLength({min:8})
], 
signup
);

router.post("/signin",[
    check("email", "email is require").isEmail(),
    check("password", "passwaord is compelsury").isLength({min:8})
], 
signin
);




router.get("/signout",  signout);

router.get("/testroute", isSignedin, (req, res) =>{
    res.json(req.auth);
});



module.exports = router;