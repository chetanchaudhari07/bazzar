const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized!" });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unauthorized!" });
            req.userId = decoded.userId;
            req.role = decoded.role;
            next();
        });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized!" });
    }
};

module.exports = auth;
