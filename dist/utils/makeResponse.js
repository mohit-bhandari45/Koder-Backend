"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = makeResponse;
function makeResponse(message, data = null) {
    let response = {
        message: message,
        data: data
    };
    return response;
}
