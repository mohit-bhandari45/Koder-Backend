"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/username", user_controller_1.addUsernameHandler);
router.patch("/username", user_controller_1.updateUsernameHandler);
router.get("/me", user_controller_1.getOwnProfileHandler);
exports.default = router;
