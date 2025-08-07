import { Request, Response } from "express";
import { executeCode } from "../utils/execute.utils";

async function codeRunnerHandler(req: Request, res: Response): Promise<void> {
    const { code, language } = req.body;

    if (!code || !language) {
        res.status(400).json({ error: "Code and Language are rqeuired" });
        return;
    }

    try {
        const output = await executeCode(code, language);
        res.status(200).json({ output: output });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export { codeRunnerHandler };