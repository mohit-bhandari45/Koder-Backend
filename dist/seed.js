"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("./modules/auth/user.model"));
const problem_model_1 = __importDefault(require("./models/problem.model"));
const twosum_1 = __importDefault(require("./problems/twosum"));
dotenv_1.default.config();
async function seed() {
    await mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://localhost:27017/koder");
    // Seed users
    const users = [
        { username: "alice", fullname: "Mohit", email: "alice@example.com", password: "password123" },
        { username: "bob", fullname: "Rohit", email: "bob@example.com", password: "password123" },
        { username: "charlie", fullname: "Mohit", email: "charlie@example.com", password: "password123" },
        { username: "david", fullname: "Mohit", email: "david@example.com", password: "password123" },
        { username: "eve", fullname: "Mohit", email: "eve@example.com", password: "password123" },
        { username: "frank", fullname: "Mohit", email: "frank@example.com", password: "password123" },
        { username: "grace", fullname: "Mohit", email: "grace@example.com", password: "password123" },
        { username: "heidi", fullname: "Mohit", email: "heidi@example.com", password: "password123" },
        { username: "ivan", fullname: "Mohit", email: "ivan@example.com", password: "password123" },
        { username: "judy", fullname: "Mohit", email: "judy@example.com", password: "password123" },
    ];
    // Problem tags and constraints pool
    const tagsPool = ["Array", "String", "Hash Table", "Math", "Dynamic Programming", "Tree", "Graph", "Sorting", "Greedy", "Two Pointers"];
    const constraintsPool = [
        "1 <= n <= 10^5",
        "-10^9 <= value <= 10^9",
        "1 <= arr.length <= 10^4",
        "The input string contains only lowercase English letters.",
        "Time complexity must be O(n)",
    ];
    // Seed problems
    const problems = [
        twosum_1.default,
    ];
    try {
        await user_model_1.default.deleteMany({});
        await problem_model_1.default.deleteMany({});
        await user_model_1.default.insertMany(users);
        await problem_model_1.default.insertMany(problems);
        console.log("✅ Seeded users and problems successfully!");
    }
    catch (err) {
        console.error("❌ Error seeding data:", err);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seed();
