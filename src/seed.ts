import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/user.model";
import ProblemModel from "./models/problem.model";
import TwoSumProblem from "./problems/twosum";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/koder");

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
    TwoSumProblem,
    {
      title: "Reverse Integer",
      description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, return 0.",
      difficulty: "Medium",
      tags: ["Math"],
      examples: [
        {
          input: "x = 123",
          output: "321",
          explanation: "Reversing 123 gives 321."
        },
        {
          input: "x = -123",
          output: "-321",
          explanation: "Reversing -123 gives -321."
        }
      ],
      testCases: [
        {
          input: "x = 120",
          output: "21",
          explanation: "Reversing 120 gives 21."
        },
        {
          input: "x = 0",
          output: "0",
          explanation: "Reversing 0 gives 0."
        }
      ],
      constraints: ["-2^31 <= x <= 2^31 - 1"],
      starterCode: "function reverse(x) {\n  // Write your code here\n}",
      solution: "function reverse(x) {\n  let rev = 0;\n  let num = Math.abs(x);\n  while (num > 0) {\n    rev = rev * 10 + (num % 10);\n    num = Math.floor(num / 10);\n  }\n  rev = x < 0 ? -rev : rev;\n  if (rev < -(2**31) || rev > 2**31 - 1) return 0;\n  return rev;\n}",
    },
    {
      title: "Palindrome Number",
      description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
      difficulty: "Easy",
      tags: ["Math"],
      examples: [
        {
          input: "x = 121",
          output: "true",
          explanation: "121 reads as 121 from left to right and from right to left."
        },
        {
          input: "x = -121",
          output: "false",
          explanation: "-121 reads as 121- from left to right and -121 from right to left."
        }
      ],
      testCases: [
        {
          input: "x = 10",
          output: "false",
          explanation: "10 reads as 01 from right to left."
        }
      ],
      constraints: ["-2^31 <= x <= 2^31 - 1"],
      starterCode: "function isPalindrome(x) {\n  // Write your code here\n}",
      solution: "function isPalindrome(x) {\n  if (x < 0) return false;\n  let rev = 0, num = x;\n  while (num > 0) {\n    rev = rev * 10 + (num % 10);\n    num = Math.floor(num / 10);\n  }\n  return rev === x;\n}",
    },
    {
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order.",
      difficulty: "Easy",
      tags: ["String", "Stack"],
      examples: [
        {
          input: "s = '()'",
          output: "true",
          explanation: "'()' is valid."
        },
        {
          input: "s = '([)]'",
          output: "false",
          explanation: "'([)]' is not valid."
        }
      ],
      testCases: [
        {
          input: "s = '{[]}'",
          output: "true",
          explanation: "'{[]}' is valid."
        }
      ],
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only"],
      starterCode: "function isValid(s) {\n  // Write your code here\n}",
      solution: "function isValid(s) {\n  const stack = [];\n  const map = {')': '(', '}': '{', ']': '['};\n  for (let c of s) {\n    if (c === '(' || c === '{' || c === '[') stack.push(c);\n    else {\n      if (!stack.length || stack.pop() !== map[c]) return false;\n    }\n  }\n  return !stack.length;\n}",
    },
    {
      title: "Merge Two Sorted Lists",
      description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return the head of the merged list.",
      difficulty: "Easy",
      tags: ["Linked List", "Recursion"],
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
          explanation: "Merge the two lists into a single sorted list."
        }
      ],
      testCases: [
        {
          input: "list1 = [], list2 = []",
          output: "[]",
          explanation: "Both lists are empty."
        }
      ],
      constraints: ["The number of nodes in both lists is in the range [0, 50]", "-100 <= Node.val <= 100"],
      starterCode: "function mergeTwoLists(list1, list2) {\n  // Write your code here\n}",
      solution: "function mergeTwoLists(list1, list2) {\n  let dummy = {val: 0, next: null}, curr = dummy;\n  while (list1 && list2) {\n    if (list1.val < list2.val) { curr.next = list1; list1 = list1.next; }\n    else { curr.next = list2; list2 = list2.next; }\n    curr = curr.next;\n  }\n  curr.next = list1 || list2;\n  return dummy.next;\n}",
    },
    {
      title: "Maximum Subarray",
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      difficulty: "Medium",
      tags: ["Array", "Dynamic Programming"],
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "[4,-1,2,1] has the largest sum = 6."
        }
      ],
      testCases: [
        {
          input: "nums = [1]",
          output: "1",
          explanation: "Single element."
        }
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      starterCode: "function maxSubArray(nums) {\n  // Write your code here\n}",
      solution: "function maxSubArray(nums) {\n  let maxSum = nums[0], currSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currSum = Math.max(nums[i], currSum + nums[i]);\n    maxSum = Math.max(maxSum, currSum);\n  }\n  return maxSum;\n}",
    },
    {
      title: "Climbing Stairs",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      difficulty: "Easy",
      tags: ["Dynamic Programming"],
      examples: [
        {
          input: "n = 2",
          output: "2",
          explanation: "There are two ways: 1+1 or 2."
        },
        {
          input: "n = 3",
          output: "3",
          explanation: "There are three ways: 1+1+1, 1+2, 2+1."
        }
      ],
      testCases: [
        {
          input: "n = 5",
          output: "8",
          explanation: "There are 8 ways to climb 5 steps."
        }
      ],
      constraints: ["1 <= n <= 45"],
      starterCode: "function climbStairs(n) {\n  // Write your code here\n}",
      solution: "function climbStairs(n) {\n  let a = 1, b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}",
    },
  ];

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