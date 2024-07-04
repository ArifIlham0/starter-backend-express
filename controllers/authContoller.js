const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            isAgent: req.body.isAgent,
        })

        try {
            const savedUser = await newUser.save()

            res.status(201).json(savedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(401).json("Wrong login details!")

            const decryptedpass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
            const depassword = decryptedpass.toString(CryptoJS.enc.Utf8)    

            if (depassword !== req.body.password) return res.status(401).json("Wrong password")

            const userToken = jwt.sign(
                { id: user._id, email: user.email, isAgent: user.isAgent, isAdmin: user.isAdmin },
                process.env.JWT_SEC,
                { expiresIn: "21d" }
            );
            
            const { password, createdAt, __v, ...others } = user._doc

            res.status(200).json({ ...others, userToken: userToken })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}