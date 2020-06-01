const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('dotenv').config()

exports.signup = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};


exports.signin = (req, res) => {
    const errors = validationResult(res);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Email not Found"
            });
        }
        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "password and email do not match"
            });

        }
        // CREATE TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            //SAVE TO COOKIE
        res.cookie("token", token, { expire: new Date() + 9999 });

        //SENT TO FRONT END
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout succesfully"
    });
};

//Protected token

exports.isSignedin = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//Custom middl ware

exports.isAuthenticate = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        })
    }

    next();
}