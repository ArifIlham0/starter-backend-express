const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                req.user.id, {                   
                    $set: req.body,
                }, { new: true }
            )

            const { password, __v, createdAt, ...others } = updateUser._doc

            res.status(200).json({ ...others })
            
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json("Account successfully deleted")
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getAllUser: async (req, res) => {
        try {
            const allUsers = await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


}