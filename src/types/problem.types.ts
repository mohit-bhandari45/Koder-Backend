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

export interface ILanguageCodeMap {
  [language: string]: string; // e.g., javascript, python, java, etc.
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

  starterCode: ILanguageCodeMap; // updated from string → per-language object
  solution?: ILanguageCodeMap;   // updated from string → per-language object
  functionName: string;          // recommended to extract the user-defined function name

  createdAt?: Date;
  updatedAt?: Date;
}