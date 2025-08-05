"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = authCheck;
const jwt_1 = require("../../utils/jwt");
function authCheck(req, res, next) {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    else if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const user = (0, jwt_1.verifyAccessToken)(token);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
