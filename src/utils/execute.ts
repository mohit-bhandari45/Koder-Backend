import { exec } from "child_process";
import { v4 as uuid } from "uuid";
import path from "path";
import fs, { unlink, writeFile } from "fs/promises";
import util from "util";

const execPromise = util.promisify(exec);

const fileExtensions: Record<string, string> = {
    javascript: "js",
    python: "py",
    cpp: "cpp",
    c: "c",
    java: "java"
}

async function executeCode(code: string, language: string): Promise<string> {
    const extension = fileExtensions[language];
    if (!extension) throw new Error("Unsupported language");

    let filename: string;
    if (language === "java") {
        const classMatch = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
        const className = classMatch?.[1] || uuid(); // fallback if no public class
        filename = `${className}.java`;
    } else {
        filename = `${uuid()}.${extension}`;
    }

    const filePath = path.join(__dirname, "..", "..", "temp", filename);
    const tempDir = path.join(__dirname, "..", "..", "temp");

    await fs.mkdir(tempDir, { recursive: true });
    await writeFile(filePath, code);

    let command: string;

    switch (language) {
        case "javascript":
            command = `node ${filePath}`;
            break;
        case "python":
            command = `python3 ${filePath}`;
            break;
        case "cpp":
            command = `g++ ${filePath} -o ${filePath}.out && ${filePath}.out`;
            break;
        case "c":
            command = `gcc ${filePath} -o ${filePath}.out && ${filePath}.out`;
            break;
        case "java":
            command = `javac ${filePath} && java -cp ${tempDir} ${filename.split(".")[0]}`;
            break;
        default:
            throw new Error("Unsupported language");
    }

    try {
        const { stdout, stderr } = await execPromise(command, { timeout: 5000 });
        await unlink(filePath).catch(() => { });
        return stderr || stdout || "No output";
    } catch (error: any) {
        return error.stderr || error.message;
    } finally {
        await unlink(filePath).catch(() => { });
        if (["cpp", "c"].includes(language)) {
            await unlink(`${filePath}.out`).catch(() => { });
        }
        if (language === "java") {
            await unlink(`${filePath.replace(".java", ".class")}`).catch(() => { });
        }
    }
}

export { executeCode };