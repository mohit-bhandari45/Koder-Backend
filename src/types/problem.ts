export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  output: string;
  explanation: string;
  stdin?: string;
}

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface IProblem {
  _id?: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  examples: IExample[];
  testCases: ITestCase[];
  constraints: string[];
  starterCode: string;
  solution?: string;
  createdAt?: Date;
  updatedAt?: Date;
}