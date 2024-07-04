const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        location: {type: String, required: false},
        phone: {type: String, required: false},
        isAdmin: {type: Boolean, default: false},
        isAgent: {type: Boolean, default: false},
        skills: {type: Array, default: false},
        profile: {type: String, required: true, default: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"},
        cv: {type: String, required: true, default: "https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png"},
    }, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)