"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeRunnerHandler = codeRunnerHandler;
const execute_1 = require("../utils/execute");
async function codeRunnerHandler(req, res) {
    const { code, language } = req.body;
    if (!code || !language) {
        res.status(400).json({ error: "Code and Language are rqeuired" });
        return;
    }
    try {
        const output = await (0, execute_1.executeCode)(code, language);
        res.status(200).json({ output: output });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
