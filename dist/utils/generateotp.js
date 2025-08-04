"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
function generateOTP(length = 6) {
    const min = Math.pow(10, length - 1); // e.g. 100000
    const max = Math.pow(10, length) - 1; // e.g. 999999
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
