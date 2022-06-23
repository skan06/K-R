const jwt = require("jsonwebtoken");
const User = require("../model/User");
const multer =require("multer")
const path = require('path')

const IsAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).send({ error: [{ msg: "Not authorized" }] });
            return;
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) {
            res.status(401).send({ error: [{ msg: "Not authorized" }] });
        }
        req.user = foundUser;
        next();
    } catch (error) {
        res.status(400).send({ error: [{ msg: "Error" }] });
    }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
    IsAuth(req, res, () => {
        if (
            req.user.isCarOwner ||
            req.user.isAdmin
        ) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    IsAuth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenUserisCarowner = (req, res, next) => {
    IsAuth(req, res, () => {
        if (req.user.isCarOwner) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const storage = multer.diskStorage({
  destination:"client/public/upload",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.oroginalname))
  }
})

const upload = multer({ storage: storage })

module.exports = {
    IsAuth,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyTokenUserisCarowner,
    upload
};