"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessSecret = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, accessSecret, { expiresIn: "15m" });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, refreshSecret, { expiresIn: "7d" });
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, refreshSecret);
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, accessSecret);
}
