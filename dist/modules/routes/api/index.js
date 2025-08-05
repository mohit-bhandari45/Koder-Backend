"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const problem_route_1 = __importDefault(require("../../problems/problem.route"));
const user_route_1 = __importDefault(require("../../user/user.route"));
const submission_route_1 = __importDefault(require("../../submissions/submission.route"));
const router = (0, express_1.Router)();
// middleware
router.use(auth_middleware_1.authCheck);
router.use("/problem", problem_route_1.default);
router.use("/user", user_route_1.default);
router.use("/submission", submission_route_1.default);
exports.default = router;
