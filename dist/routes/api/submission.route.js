"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submission_controller_1 = require("../../controllers/submission.controller");
const router = (0, express_1.Router)();
router.post("/add", submission_controller_1.addSubmissionHandler);
router.get("/problem/:problemId/all", submission_controller_1.getAllSubmissions);
router.get("/submissions/:id", submission_controller_1.getSubmissionById);
exports.default = router;
