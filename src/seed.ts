import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/user.model";
import ProblemModel from "./models/problem.model";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/koder");

  // Seed users
  const users = [
    { username: "alice", fullname:"Mohit", email: "alice@example.com", password: "password123" },
    { username: "bob", fullname:"Rohit", email: "bob@example.com", password: "password123" },
    { username: "charlie", fullname:"Mohit", email: "charlie@example.com", password: "password123" },
    { username: "david", fullname:"Mohit", email: "david@example.com", password: "password123" },
    { username: "eve", fullname:"Mohit", email: "eve@example.com", password: "password123" },
    { username: "frank", fullname:"Mohit", email: "frank@example.com", password: "password123" },
    { username: "grace", fullname:"Mohit", email: "grace@example.com", password: "password123" },
    { username: "heidi", fullname:"Mohit", email: "heidi@example.com", password: "password123" },
    { username: "ivan", fullname:"Mohit", email: "ivan@example.com", password: "password123" },
    { username: "judy", fullname:"Mohit", email: "judy@example.com", password: "password123" },
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
  const problems = [];
  for (let i = 1; i <= 100; i++) {
    const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";
    const tags = [tagsPool[i % tagsPool.length], tagsPool[(i + 3) % tagsPool.length]];
    const constraints = [constraintsPool[i % constraintsPool.length]];
    const examples = [
      {
        input: `input${i}a`,
        output: `output${i}a`,
        explanation: `Example explanation for problem ${i}a.`
      },
      {
        input: `input${i}b`,
        output: `output${i}b`,
        explanation: `Example explanation for problem ${i}b.`
      }
    ];
    const testCases = [
      {
        input: `input${i}a`,
        output: `output${i}a`,
        explanation: `Test case explanation for problem ${i}a.`
      },
      {
        input: `input${i}b`,
        output: `output${i}b`,
        explanation: `Test case explanation for problem ${i}b.`
      }
    ];
    problems.push({
      title: `Problem ${i}`,
      description: `This is the description for problem ${i}. Solve the problem as described.`,
      difficulty,
      tags,
      examples,
      testCases,
      constraints,
      starterCode: `function solve${i}(input) {\n  // Write your code here\n}`,
      solution: `function solve${i}(input) {\n  // Solution for problem ${i}\n}`,
    });
  }

  try {
    await UserModel.deleteMany({});
    await ProblemModel.deleteMany({});
    await UserModel.insertMany(users);
    await ProblemModel.insertMany(problems);
    console.log("✅ Seeded users and problems successfully!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();