"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const problem_route_1 = __importDefault(require("./problem.route"));
const submission_route_1 = __importDefault(require("./submission.route"));
const auth_middleware_1 = require("../../middlware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authCheck);
router.use("/user", user_route_1.default);
router.use("/problem", problem_route_1.default);
router.use("/submission", submission_route_1.default);
exports.default = router;
