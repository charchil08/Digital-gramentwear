const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    userinfo: {
        type: String,
        trim: true,
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });

userSchema.virtual("password")
    .set(function (password) {
        // for pure password
        this._password = password;
        // set a salt
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = { 
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        }
        catch (err) {
            console.log("🚀   file: user.js   line 67   err", err);
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);