"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = executeCode;
const child_process_1 = require("child_process");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const promises_1 = __importStar(require("fs/promises"));
const util_1 = __importDefault(require("util"));
const execPromise = util_1.default.promisify(child_process_1.exec);
const fileExtensions = {
    javascript: "js",
    python: "py",
    cpp: "cpp",
    c: "c",
    java: "java"
};
async function executeCode(code, language) {
    const extension = fileExtensions[language];
    if (!extension)
        throw new Error("Unsupported language");
    const tempDir = path_1.default.join(__dirname, "..", "..", "temp");
    await promises_1.default.mkdir(tempDir, { recursive: true });
    let filename;
    let className;
    if (language === "java") {
        const classMatch = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
        className = classMatch?.[1] || `Main${(0, uuid_1.v4)()}`; // fallback class name
        filename = `${className}.java`;
    }
    else {
        filename = `${(0, uuid_1.v4)()}.${extension}`;
    }
    const filePath = path_1.default.join(tempDir, filename);
    await (0, promises_1.writeFile)(filePath, code);
    let command;
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
            command = `javac ${filePath} && java -cp ${tempDir} ${className}`;
            break;
        default:
            throw new Error("Unsupported language");
    }
    try {
        const { stdout, stderr } = await execPromise(command, { timeout: 5000 });
        return stderr || stdout || "No output";
    }
    catch (error) {
        return error.stderr || error.message || "Execution failed";
    }
    finally {
        // Clean up files
        await (0, promises_1.unlink)(filePath).catch(() => { });
        if (["cpp", "c"].includes(language)) {
            await (0, promises_1.unlink)(`${filePath}.out`).catch(() => { });
        }
        if (language === "java" && className) {
            await (0, promises_1.unlink)(path_1.default.join(tempDir, `${className}.class`)).catch(() => { });
        }
    }
}
