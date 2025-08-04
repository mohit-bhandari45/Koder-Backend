"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeRunnerController_1 = require("../../controllers/codeRunnerController");
const router = (0, express_1.Router)();
router.post("/run", codeRunnerController_1.codeRunnerHandler);
exports.default = router;
