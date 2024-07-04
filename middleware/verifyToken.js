const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader
        console.log('Token:', token);

        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) {
                console.log('JWT verify error:', err);
                return res.status(403).json("Invalid token");
            }
            console.log('Decoded user:', user);
            req.user = user;
            next();
        })
    } else {
        console.log('No auth header');
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenJob = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader
        console.log('Token:', token);

        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) {
                console.log('JWT verify error:', err);
                return res.status(403).json("Invalid token");
            }
            console.log('Decoded user:', user);
            req.user = user;
            next();
        })
    } else {
        next()
    }
}

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed on this operation")
        }
    })
}

const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user.isAgent) {
            next()
        } else {
            res.status(403).json("You are not allowed on this operation")
        }
    })
}

module.exports = { verifyToken, verifyAndAuthorization, verifyAndAdmin, verifyTokenJob };
