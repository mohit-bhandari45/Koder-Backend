"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problem_controller_1 = require("./problem.controller");
const router = (0, express_1.Router)();
router.get("/", problem_controller_1.getAllProblemsHandler);
router.post("/add", problem_controller_1.addProblemHandler);
router.get("/:id", problem_controller_1.getProblemByIdHandler);
exports.default = router;
