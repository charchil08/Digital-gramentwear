const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

// @tag     signout user
// @method  GET     /api/signout
// @access  protected
// TODO: isSignedIn
exports.signout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Signed out successfully" });
    }
    catch (err) {
        return res.status(400).json({ message: "Signed out failed" });
    }
}

// @tag     signup user
// @method  POST     /api/signup
// @access  public
exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        // check if user already exists
        const userExists = await User.exists({ email: req.body.email });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        const user = new User(req.body);
        user.save((err, savedUser) => {
            if (err) {
                return res.status(400).json({ error: "User can not signed up" });
            }
            return res.json({
                name: savedUser.name,
                email: savedUser.email,
                id: savedUser._id,
                role: savedUser.role,
            })
        })
    } catch (error) {
        console.log("🚀   file: auth.js   line 38   signup   error", error);
    }
}


// @tag     signin user
// @method  POST     /api/signin
// @access  public
exports.signin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const { email, password } = await req.body;


        User.findOne({ email }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "User does not exists",
                })
            }

            if (!user || !user.authenticate(password)) {
                return res.status(400).json({
                    error: "Invalid email or password",
                })
            }

            // generate token, store in cookies and back to responce on frontend
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.cookie("token", token, { expire: new Date() + 9999 });
            return res.status(200).json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email,
                    role: user.role,
                }
            })
        })

    } catch (error) {
        console.log("🚀   file: auth.js   line 55   exports.signin=   error", error);

    }
}


// @tag     is user signedIn 
// @method  middleware
// @access  public
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});

// custom middlewares

// @tag     is user authenticated 
// @method  middleware
// @access  public
exports.isAuthenticated = async (req, res, next) => {
    // TODO: profile will set from front end
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next();
}


// @tag     is user admin
// @method  middleware
// @access  public
exports.isAdmin = (req, res, next) => {
    // TODO: profile will set from front end (admin -> 1)
    if (req.profile.role !== 1) {
        return res.status(403).json({
            error: "Not an admin, access denied"
        })
    }
    next();
}