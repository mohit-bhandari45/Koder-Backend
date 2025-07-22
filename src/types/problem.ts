import { ITestCase } from "./test";

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface IProblem {
  /** MongoDB ID */
  _id?: string;
  /** Problem title */
  title: string;
  /** Full problem description (markdown supported) */
  description: string;
  /** Difficulty level */
  difficulty: "Easy" | "Medium" | "Hard";
  /** Tags/categories (e.g., Array, Hash Table) */
  tags: string[];
  /** Example cases shown to user */
  examples: IExample[];
  /** Test cases for evaluation */
  testCases: ITestCase[];
  /** Constraints (e.g., ["1 <= n <= 10^5"]) */
  constraints: string[];
  /** Starter code shown to user */
  starterCode: string;
  /** Solution code (optional, for admin/internal use) */
  solution?: string;
  /** Creation date */
  createdAt?: Date;
  /** Last update date */
  updatedAt?: Date;
}