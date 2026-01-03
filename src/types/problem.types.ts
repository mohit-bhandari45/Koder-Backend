export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export type TestOutput =
  | string // simple string output
  | number // simple number output
  | boolean // simple boolean output
  | Array<string | number | boolean> // 1D array
  | Array<Array<string | number | boolean>> // 2D array
  | Array<TestOutput>; // multiple possible outputs

export interface ITestCase {
  input: string; // Human-readable input for explanation / UI
  output: string; // Human-readable expected output for explanation / UI
  explanation: string; // Optional explanation of the test case
  stdin: string; // Compiler-specific input (what your program will actually read)
  stdout: TestOutput; // Compiler-specific expected output (what you compare program output against)
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
  solution?: ILanguageCodeMap; // updated from string → per-language object
  functionName: string; // recommended to extract the user-defined function name

  createdAt?: Date;
  updatedAt?: Date;
}
