import { stdout } from "process";
import type { IExample, IProblem, ITestCase } from "../types/problem.types";
import {
  cppStarter,
  csharpStarter,
  cStarter,
  dartStarter,
  elixirStarter,
  goStarter,
  haskellStarter,
  javascriptStarter,
  javaStarter,
  kotlinStarter,
  perlStarter,
  pythonStarter,
  rStarter,
  rubyStarter,
  rustStarter,
  scalaStarter,
  swiftStarter,
} from "./starterscode/twosum";

function parseInputToStdin(rawInput: string): string {
  const match = rawInput.match(
    /nums\s*=\s*\[([^\]]+)\],\s*target\s*=\s*(-?\d+)/,
  );
  if (!match) return "";
  const nums = match[1]
    .split(",")
    .map((n) => n.trim())
    .join(" ");
  const target = match[2].trim();
  return `${nums}\n${target}`;
}

const Examples: IExample[] = [
  {
    input: "nums = [2, 7, 11, 15], target = 9",
    output: "[0, 1]",
    explanation: "nums[0] + nums[1] == 2 + 7 == 9, so return [0, 1].",
  },
  {
    input: "nums = [3, 2, 4], target = 6",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == 2 + 4 == 6.",
  },
  {
    input: "nums = [1, 5, 3, 7], target = 8",
    output: "[0, 3]",
    explanation: "nums[0] + nums[3] == 1 + 7 == 8.",
  },
];

const TestCases = [
  {
    input: "nums = [24, 39, -7, 67, 98, 80], target = 165",
    output: "[3, 4]",
    explanation: "nums[3] + nums[4] == 67 + 98 == 165",
  },
  {
    input: "nums = [-21, 35, -25, -27, 62, 97], target = 8",
    output: "[1, 3]",
    explanation: "nums[1] + nums[3] == 35 + -27 == 8",
  },
  {
    input:
      "nums = [33, -37, 61, 59, -14, -26, 49, 4, -21, -31, 88], target = -63",
    output: "[1, 5]",
    explanation: "nums[5] + nums[1] == -26 + -37 == -63",
  },
  {
    input:
      "nums = [33, 65, -38, 35, 99, 55, 26, -3, 1, -4, 0, 50, 86, 28], target = 125",
    output: "[4, 6]",
    explanation: "nums[4] + nums[6] == 99 + 26 == 125",
  },
  {
    input: "nums = [-1, -3, 33, 64, -27], target = -30",
    output: "[1, 4]",
    explanation: "nums[1] + nums[4] == -3 + -27 == -30",
  },
  {
    input: "nums = [45, 42, 73, -41, -8, 29, -33, 26], target = 12",
    output: "[0, 6]",
    explanation: "nums[6] + nums[0] == -33 + 45 == 12",
  },
  {
    input: "nums = [22, 66, -20, 26, -27, 80, -26, 58, 32], target = 46",
    output: "[1, 2]",
    explanation: "nums[2] + nums[1] == -20 + 66 == 46",
  },
  {
    input:
      "nums = [-40, 1, -21, 22, -28, -4, -16, 11, 38, -33, -39, 12, 67, 68, 30], target = -9",
    output: "[10, 14]",
    explanation: "nums[10] + nums[14] == -39 + 30 == -9",
  },
  {
    input: "nums = [-31, 46], target = 15",
    output: "[0, 1]",
    explanation: "nums[0] + nums[1] == -31 + 46 == 15",
  },
  {
    input: "nums = [39, 79, 40], target = 79",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == 40 + 39 == 79",
  },
  {
    input: "nums = [1, 79, 59, -36, 53, 29], target = 54",
    output: "[0, 4]",
    explanation: "nums[4] + nums[0] == 53 + 1 == 54",
  },
  {
    input:
      "nums = [50, -28, -48, -31, -38, 60, 3, 81, -32, -50, 61, 98, 72, 16, -11, 63, -6], target = 19",
    output: "[0, 3]",
    explanation: "nums[0] + nums[3] == 50 + -31 == 19",
  },
  {
    input:
      "nums = [-10, 94, -1, -40, 81, 43, 2, -41, 15, 19, 22, 14, 70, 37, 9, -44, 18], target = 107",
    output: "[12, 13]",
    explanation: "nums[13] + nums[12] == 37 + 70 == 107",
  },
  {
    input:
      "nums = [25, 6, 33, 75, 83, -13, 52, 98, 1, 47, -38, -7, 88, 29, 35, 85, -8, -29], target = 76",
    output: "[3, 8]",
    explanation: "nums[8] + nums[3] == 1 + 75 == 76",
  },
  {
    input: "nums = [-15, -45, 38, -19], target = 23",
    output: "[0, 2]",
    explanation: "nums[0] + nums[2] == -15 + 38 == 23",
  },
  {
    input: "nums = [-24, 11, 77, 97, 49, -11, 32], target = 66",
    output: "[2, 5]",
    explanation: "nums[2] + nums[5] == 77 + -11 == 66",
  },
  {
    input: "nums = [12, -14, 76, 92, -5, -8], target = 62",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == -14 + 76 == 62",
  },
  {
    input:
      "nums = [-44, 45, 0, -13, -29, 17, -16, -45, 73, 52, 29, 63], target = 60",
    output: "[3, 8]",
    explanation: "nums[3] + nums[8] == -13 + 73 == 60",
  },
  {
    input:
      "nums = [34, 88, 38, 92, -19, 80, 50, 44, 60, -37, 72, 7, 63, 77, 43, 75, 93, 45], target = 155",
    output: "[5, 15]",
    explanation: "nums[5] + nums[15] == 80 + 75 == 155",
  },
  {
    input:
      "nums = [59, 86, -38, 58, -28, 92, 80, 78, 27, 7, 81, 5, 36, 66, 30, -16, -15, 65], target = 8",
    output: "[4, 12]",
    explanation: "nums[4] + nums[12] == -28 + 36 == 8",
  },
  {
    input:
      "nums = [88, 21, 46, 60, -9, -28, -25, 14, -49, 26, 36, 64, 17], target = 82",
    output: "[2, 10]",
    explanation: "nums[2] + nums[10] == 46 + 36 == 82",
  },
  {
    input: "nums = [95, 92, -26], target = 187",
    output: "[0, 1]",
    explanation: "nums[1] + nums[0] == 92 + 95 == 187",
  },
  {
    input:
      "nums = [95, 61, 27, 76, -14, 24, -6, 87, -47, -42, 58, 82, 91, 19, 6, 75, 4, 70, 69], target = -28",
    output: "[8, 13]",
    explanation: "nums[8] + nums[13] == -47 + 19 == -28",
  },
  {
    input:
      "nums = [-32, -16, 20, 72, 48, 69, -10, 73, 3, -15, -42, 21, 38, 18, -12, 35], target = -22",
    output: "[2, 10]",
    explanation: "nums[2] + nums[10] == 20 + -42 == -22",
  },
  {
    input:
      "nums = [38, -44, -4, 8, 2, -16, -34, 85, -11, 7, -32, 23, 43, 72, -21, 17], target = -55",
    output: "[6, 14]",
    explanation: "nums[6] + nums[14] == -34 + -21 == -55",
  },
  {
    input: "nums = [79, 73, 57, -2, 6, -16, 87], target = 136",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == 57 + 79 == 136",
  },
  {
    input: "nums = [62, 38, 88], target = 150",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == 88 + 62 == 150",
  },
  {
    input:
      "nums = [-1, -37, -42, 69, 3, 95, 12, 13, 58, 88, 86, 8, 17, -25, 23, 59, -49, 21, -36, -10], target = 81",
    output: "[3, 6]",
    explanation: "nums[3] + nums[6] == 69 + 12 == 81",
  },
  {
    input: "nums = [11, 15, -30, -41, 96, 3, 68], target = 107",
    output: "[0, 4]",
    explanation: "nums[0] + nums[4] == 11 + 96 == 107",
  },
  {
    input: "nums = [22, 44, 19, -21, 33, 41, -33], target = 74",
    output: "[4, 5]",
    explanation: "nums[4] + nums[5] == 33 + 41 == 74",
  },
  {
    input: "nums = [39, -32, -17, -46, 43, 97], target = 22",
    output: "[0, 2]",
    explanation: "nums[0] + nums[2] == 39 + -17 == 22",
  },
  {
    input: "nums = [-43, 90, 91, -46, 50, -50], target = 140",
    output: "[1, 4]",
    explanation: "nums[1] + nums[4] == 90 + 50 == 140",
  },
  {
    input:
      "nums = [88, -11, 37, 36, 43, 60, 67, -20, 16, 6, -48, 45, -21, -49, 52, 18, -40, -2, 58], target = 133",
    output: "[0, 11]",
    explanation: "nums[11] + nums[0] == 45 + 88 == 133",
  },
  {
    input:
      "nums = [65, 22, 51, -26, -42, 35, 59, 73, 78, -19, 5, -33], target = -68",
    output: "[3, 4]",
    explanation: "nums[3] + nums[4] == -26 + -42 == -68",
  },
  {
    input:
      "nums = [-24, 87, 65, -33, -44, 2, 1, 13, 21, -18, -38, 19, 71, 90], target = 66",
    output: "[2, 6]",
    explanation: "nums[6] + nums[2] == 1 + 65 == 66",
  },
  {
    input:
      "nums = [22, -50, 80, 15, -3, 41, 85, -8, 56, -16, 0, 28, -37, -5, 38], target = 4",
    output: "[5, 12]",
    explanation: "nums[5] + nums[12] == 41 + -37 == 4",
  },
  {
    input:
      "nums = [15, -48, -40, -49, 17, 81, 47, 57, 48, 53, 86, 82, -12, 95, 9, 89, 83, -33], target = 68",
    output: "[0, 9]",
    explanation: "nums[9] + nums[0] == 53 + 15 == 68",
  },
  {
    input: "nums = [58, 10, 32, -16, 35, 59], target = 42",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == 10 + 32 == 42",
  },
  {
    input:
      "nums = [89, 49, -6, 53, -23, 60, -27, 55, 32, 10, 50, 74, -28, 16], target = -34",
    output: "[2, 12]",
    explanation: "nums[12] + nums[2] == -28 + -6 == -34",
  },
  {
    input: "nums = [90, 75, 6, -13], target = 81",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == 75 + 6 == 81",
  },
  {
    input: "nums = [78, 40], target = 118",
    output: "[0, 1]",
    explanation: "nums[0] + nums[1] == 78 + 40 == 118",
  },
  {
    input: "nums = [18, -45, -6, 56, -9], target = 11",
    output: "[1, 3]",
    explanation: "nums[1] + nums[3] == -45 + 56 == 11",
  },
  {
    input:
      "nums = [-14, -9, -6, -24, 0, 31, -25, 69, -1, 10, 19, 46, -13], target = -15",
    output: "[0, 8]",
    explanation: "nums[0] + nums[8] == -14 + -1 == -15",
  },
  {
    input:
      "nums = [-17, -46, 75, 60, -6, -45, 5, 67, 98, 93, -25, -36, -9, -4, -8, -41, -33, 97, -27], target = 68",
    output: "[9, 10]",
    explanation: "nums[10] + nums[9] == -25 + 93 == 68",
  },
  {
    input: "nums = [-43, 23, 6, 81, 45, 72, 30], target = 126",
    output: "[3, 4]",
    explanation: "nums[4] + nums[3] == 45 + 81 == 126",
  },
  {
    input:
      "nums = [26, -3, 44, 81, 38, -31, 46, 9, 51, 19, -49, 2, 77, -19, -10, 65, 70, -5, 49], target = 121",
    output: "[8, 16]",
    explanation: "nums[16] + nums[8] == 70 + 51 == 121",
  },
  {
    input:
      "nums = [45, -8, -26, -47, 21, -18, 64, 68, -43, 63, -5, 8], target = 16",
    output: "[4, 10]",
    explanation: "nums[10] + nums[4] == -5 + 21 == 16",
  },
  {
    input:
      "nums = [-10, 43, 39, 34, -15, -33, -2, -46, 84, 95, -22, 73, -24], target = 179",
    output: "[8, 9]",
    explanation: "nums[8] + nums[9] == 84 + 95 == 179",
  },
  {
    input: "nums = [98, 44, -14], target = 84",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == -14 + 98 == 84",
  },
  {
    input:
      "nums = [54, -16, -29, -20, -23, -35, 30, 27, 67, -17, 20, -27, 55, 60, -6, -22], target = 4",
    output: "[4, 7]",
    explanation: "nums[7] + nums[4] == 27 + -23 == 4",
  },
  {
    input: "nums = [76, 84, 47, 18, 72, -7, 2, 80, 74], target = 158",
    output: "[1, 8]",
    explanation: "nums[1] + nums[8] == 84 + 74 == 158",
  },
  {
    input: "nums = [49, 15, 43, 33, 21, 60, -21], target = 58",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == 15 + 43 == 58",
  },
  {
    input: "nums = [79, 65, -20, 12, 93, 99, 39], target = 19",
    output: "[2, 6]",
    explanation: "nums[6] + nums[2] == 39 + -20 == 19",
  },
  {
    input: "nums = [95, -29, -43, 85, 74, 23], target = -72",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == -29 + -43 == -72",
  },
  {
    input:
      "nums = [95, 18, 90, 97, 29, 60, -45, 88, 31, 8, -7, 45, 38, 61, 73], target = 49",
    output: "[1, 8]",
    explanation: "nums[1] + nums[8] == 18 + 31 == 49",
  },
  {
    input:
      "nums = [97, -7, -26, -37, 94, -42, 51, -24, -46, -45, 33, 1, 92], target = -9",
    output: "[5, 10]",
    explanation: "nums[5] + nums[10] == -42 + 33 == -9",
  },
  {
    input:
      "nums = [-8, -39, 30, 64, 80, -6, 35, 31, -5, -2, 58, 89, -42, 57, -28, 13, -33, -16], target = 147",
    output: "[10, 11]",
    explanation: "nums[10] + nums[11] == 58 + 89 == 147",
  },
  {
    input:
      "nums = [-38, -14, -24, 2, 29, -32, 37, 86, -19, 30, 67, -10, 72, 62, 27, 33, 80, 82, 43], target = 99",
    output: "[6, 13]",
    explanation: "nums[6] + nums[13] == 37 + 62 == 99",
  },
  {
    input:
      "nums = [97, -5, 28, 64, -43, 29, 38, -6, -31, -30, 63], target = -74",
    output: "[4, 8]",
    explanation: "nums[8] + nums[4] == -31 + -43 == -74",
  },
  {
    input: "nums = [-40, 84], target = 44",
    output: "[0, 1]",
    explanation: "nums[1] + nums[0] == 84 + -40 == 44",
  },
  {
    input: "nums = [8, 80, -14, -38, -12], target = -50",
    output: "[3, 4]",
    explanation: "nums[4] + nums[3] == -12 + -38 == -50",
  },
  {
    input:
      "nums = [9, 52, 57, 96, 73, 51, 40, -6, 49, -36, 63, -39, -20, 32, 55], target = 92",
    output: "[1, 6]",
    explanation: "nums[6] + nums[1] == 40 + 52 == 92",
  },
  {
    input: "nums = [12, 53, 3, -39, 38, 31, -40, 88, 35], target = 66",
    output: "[5, 8]",
    explanation: "nums[5] + nums[8] == 31 + 35 == 66",
  },
  {
    input: "nums = [8, 34, 3, 28, -35, -24, 87], target = -59",
    output: "[4, 5]",
    explanation: "nums[4] + nums[5] == -35 + -24 == -59",
  },
  {
    input:
      "nums = [-27, 7, 63, 94, 97, 91, 53, -41, -26, -21, 51, 29, 36, 54, -31, -48, 87], target = 50",
    output: "[5, 7]",
    explanation: "nums[5] + nums[7] == 91 + -41 == 50",
  },
  {
    input:
      "nums = [75, 79, -24, 49, 95, -28, 1, 41, 84, 0, 44, 81], target = 21",
    output: "[3, 5]",
    explanation: "nums[3] + nums[5] == 49 + -28 == 21",
  },
  {
    input:
      "nums = [74, 40, -17, -15, 66, 88, 21, -36, -47, 99, 9], target = 41",
    output: "[5, 8]",
    explanation: "nums[5] + nums[8] == 88 + -47 == 41",
  },
  {
    input:
      "nums = [78, 43, 63, -4, -2, 31, 56, 57, 44, 46, 59, 28, 13, 14, 36, -33, 48], target = 12",
    output: "[4, 13]",
    explanation: "nums[13] + nums[4] == 14 + -2 == 12",
  },
  {
    input:
      "nums = [55, -1, 87, -18, -9, -50, 41, 62, 57, 13, -37, -29, -28, -14], target = 27",
    output: "[0, 12]",
    explanation: "nums[12] + nums[0] == -28 + 55 == 27",
  },
  {
    input:
      "nums = [-40, -34, 95, 89, -6, 27, 10, 80, -8, 78, -45, 57, 97, -48, 16, -22], target = 105",
    output: "[3, 14]",
    explanation: "nums[14] + nums[3] == 16 + 89 == 105",
  },
  {
    input: "nums = [-32, 84, 10, 83, 33, 55, 79, 27, 28], target = 116",
    output: "[3, 4]",
    explanation: "nums[4] + nums[3] == 33 + 83 == 116",
  },
  {
    input:
      "nums = [-1, 64, 41, 15, 60, 99, 61, 4, -39, -49, 68, -46, 42, -12, 85, 65, 6, 73], target = 125",
    output: "[4, 15]",
    explanation: "nums[15] + nums[4] == 65 + 60 == 125",
  },
  {
    input:
      "nums = [59, -40, 37, -30, 99, 29, 28, 25, 60, 83, -46, -8, -36, 64, 14, -2, -33, 43], target = 147",
    output: "[9, 13]",
    explanation: "nums[9] + nums[13] == 83 + 64 == 147",
  },
  {
    input:
      "nums = [-41, 29, -37, 94, 89, 63, -30, -21, 90, -31, -5, 93, -4, 20, -29, 67], target = 26",
    output: "[0, 15]",
    explanation: "nums[0] + nums[15] == -41 + 67 == 26",
  },
  {
    input: "nums = [86, -25, 61, 84, 21, -32, 95], target = 54",
    output: "[0, 5]",
    explanation: "nums[0] + nums[5] == 86 + -32 == 54",
  },
  {
    input:
      "nums = [48, -22, 50, 99, 69, 25, 95, 7, 36, -46, -27], target = -20",
    output: "[7, 10]",
    explanation: "nums[7] + nums[10] == 7 + -27 == -20",
  },
  {
    input: "nums = [-17, 84, 83, 2, -32, 91, -23, 37, 92, -42], target = 42",
    output: "[1, 9]",
    explanation: "nums[9] + nums[1] == -42 + 84 == 42",
  },
  {
    input: "nums = [75, -31, 82, 55], target = 44",
    output: "[0, 1]",
    explanation: "nums[1] + nums[0] == -31 + 75 == 44",
  },
  {
    input:
      "nums = [-4, 26, 15, 53, 89, -31, 1, -28, 32, 62, 12, -42, 77, 66], target = -30",
    output: "[5, 6]",
    explanation: "nums[5] + nums[6] == -31 + 1 == -30",
  },
  {
    input:
      "nums = [-28, -25, -2, 18, 80, 75, 61, -10, -39, -14, 4, -1, 40], target = -49",
    output: "[7, 8]",
    explanation: "nums[7] + nums[8] == -10 + -39 == -49",
  },
  {
    input: "nums = [20, -7, -47], target = -54",
    output: "[1, 2]",
    explanation: "nums[2] + nums[1] == -47 + -7 == -54",
  },
  {
    input: "nums = [20, 69, 95, 83, 98], target = 118",
    output: "[0, 4]",
    explanation: "nums[4] + nums[0] == 98 + 20 == 118",
  },
  {
    input: "nums = [47, 8, 71], target = 118",
    output: "[0, 2]",
    explanation: "nums[0] + nums[2] == 47 + 71 == 118",
  },
  {
    input: "nums = [-32, -7, 10, -39, -23, -38, 55], target = 23",
    output: "[0, 6]",
    explanation: "nums[6] + nums[0] == 55 + -32 == 23",
  },
  {
    input: "nums = [53, 18, -9, 74, 50, 49, -5, -21, -38, 3], target = 123",
    output: "[3, 5]",
    explanation: "nums[3] + nums[5] == 74 + 49 == 123",
  },
  {
    input: "nums = [34, -5, 67], target = 62",
    output: "[1, 2]",
    explanation: "nums[1] + nums[2] == -5 + 67 == 62",
  },
  {
    input: "nums = [60, -39, 31, 51], target = 82",
    output: "[2, 3]",
    explanation: "nums[2] + nums[3] == 31 + 51 == 82",
  },
  {
    input: "nums = [34, 71, -7, 85, 23, -31, -8, -11, 75, 59, -1], target = 74",
    output: "[8, 10]",
    explanation: "nums[8] + nums[10] == 75 + -1 == 74",
  },
  {
    input:
      "nums = [-21, -10, -32, 47, -4, 82, -35, -41, 98, 93, 18, 55, -14, 4, 8, 17, -19], target = 28",
    output: "[3, 16]",
    explanation: "nums[3] + nums[16] == 47 + -19 == 28",
  },
  {
    input: "nums = [3, -24, 56, 59, 85, 51, -40, 60, -13, 29], target = 59",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == 56 + 3 == 59",
  },
  {
    input: "nums = [32, 19, 52, 4], target = 84",
    output: "[0, 2]",
    explanation: "nums[2] + nums[0] == 52 + 32 == 84",
  },
  {
    input: "nums = [37, -33, 3, 26, 64], target = 101",
    output: "[0, 4]",
    explanation: "nums[4] + nums[0] == 64 + 37 == 101",
  },
  {
    input:
      "nums = [6, 85, -37, -48, -49, 28, 74, 45, 29, -44, 84, 68, 76, 38, 25, 42, -38, 87, -6], target = 113",
    output: "[8, 10]",
    explanation: "nums[8] + nums[10] == 29 + 84 == 113",
  },
  {
    input:
      "nums = [7, 94, 24, 45, -4, -40, 0, 83, -24, 17, 49, 77, 37, 90, -33, 87, 54, 20, 25], target = 44",
    output: "[0, 12]",
    explanation: "nums[0] + nums[12] == 7 + 37 == 44",
  },
  {
    input: "nums = [-27, 19, 9, 28, 67, 39], target = 95",
    output: "[3, 4]",
    explanation: "nums[4] + nums[3] == 67 + 28 == 95",
  },
  {
    input:
      "nums = [88, 97, -21, 39, 35, 19, 18, 74, 91, 59, 90, 61, 94, -26, 66, -1, 36], target = 34",
    output: "[4, 15]",
    explanation: "nums[15] + nums[4] == -1 + 35 == 34",
  },
  {
    input: "nums = [52, 36, -13, -34, -33], target = 88",
    output: "[0, 1]",
    explanation: "nums[1] + nums[0] == 36 + 52 == 88",
  },
  {
    input:
      "nums = [18, -20, -39, -31, -5, 0, -23, -3, -22, -30, -26], target = -21",
    output: "[0, 2]",
    explanation: "nums[0] + nums[2] == 18 + -39 == -21",
  },
  {
    input:
      "nums = [-15, 13, 15, 24, 81, 89, 1, -45, 84, -10, 17, -34, 64, -36, -4, 33, -18, 11, 58, -48], target = -52",
    output: "[14, 19]",
    explanation: "nums[14] + nums[19] == -4 + -48 == -52",
  },
  {
    input: "nums = [18, -3, 12, 0, 99, -42, 16], target = 111",
    output: "[2, 4]",
    explanation: "nums[4] + nums[2] == 99 + 12 == 111",
  },
];

function findAllTwoSumAnswers(nums: number[], target: number): number[][] {
  const answers = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        answers.push([i, j]);
      }
    }
  }
  return answers;
}

const processedTestCases = TestCases.map((tc) => {
  const match = tc.input.match(
    /nums\s*=\s*\[([^\]]+)\],\s*target\s*=\s*(-?\d+)/,
  );
  const stdout = match
    ? findAllTwoSumAnswers(
        match[1].split(",").map((n) => Number(n.trim())),
        Number(match[2].trim()),
      )
    : [];

  return {
    input: tc.input,
    output: tc.output,
    explanation: tc.explanation,
    stdin: parseInputToStdin(tc.input),
    stdout: stdout,
  } as ITestCase;
});

const TwoSumProblem: IProblem = {
  title: "Two Sum",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  examples: Examples,
  testCases: processedTestCases,
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
  ],
  functionName: "twoSum",
  starterCode: {
    javascript: javascriptStarter,
    python: pythonStarter,
    java: javaStarter,
    cpp: cppStarter,
    c: cStarter,
    go: goStarter,
    ruby: rubyStarter,
    rust: rustStarter,
    kotlin: kotlinStarter,
    swift: swiftStarter,
    perl: perlStarter,
    scala: scalaStarter,
    haskell: haskellStarter,
    csharp: csharpStarter,
    r: rStarter,
    dart: dartStarter,
    elixir: elixirStarter,
  },
  solution: {
    javascript: `
function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`.trim(),

    python: `
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`.trim(),

    java: `
public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`.trim(),

    cpp: `
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`.trim(),

    c: `
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; ++i) {
        for (int j = i + 1; j < numsSize; ++j) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`.trim(),

    go: `
func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, num := range nums {
        if j, ok := m[target - num]; ok {
            return []int{j, i}
        }
        m[num] = i
    }
    return []int{}
}`.trim(),

    ruby: `
def twoSum(nums, target)
  map = {}
  nums.each_with_index do |num, i|
    if map[target - num]
      return [map[target - num], i]
    end
    map[num] = i
  end
end`.trim(),

    rust: `
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    use std::collections::HashMap;
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        if let Some(&j) = map.get(&(target - num)) {
            return vec![j as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}`.trim(),

    kotlin: `
fun twoSum(nums: IntArray, target: Int): IntArray {
    val map = mutableMapOf<Int, Int>()
    for (i in nums.indices) {
        val complement = target - nums[i]
        if (map.containsKey(complement)) {
            return intArrayOf(map[complement]!!, i)
        }
        map[nums[i]] = i
    }
    return intArrayOf()
}`.trim(),

    swift: `
func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var map = [Int: Int]()
    for (i, num) in nums.enumerated() {
        if let j = map[target - num] {
            return [j, i]
        }
        map[num] = i
    }
    return []
}`.trim(),

    perl: `
sub twoSum {
    my ($nums_ref, $target) = @_;
    my %map;
    for my $i (0 .. @$nums_ref - 1) {
        my $num = $nums_ref->[$i];
        my $complement = $target - $num;
        return ($map{$complement}, $i) if exists $map{$complement};
        $map{$num} = $i;
    }
    return ();
}`.trim(),

    scala: `
def twoSum(nums: Array[Int], target: Int): Array[Int] = {
    val map = scala.collection.mutable.Map[Int, Int]()
    for (i <- nums.indices) {
        val complement = target - nums(i)
        if (map.contains(complement)) {
            return Array(map(complement), i)
        }
        map(nums(i)) = i
    }
    Array()
}`.trim(),

    haskell: `
import qualified Data.Map as M

twoSum :: [Int] -> Int -> [Int]
twoSum nums target = go nums M.empty 0
  where
    go [] _ _ = []
    go (x:xs) m i =
      case M.lookup (target - x) m of
        Just j -> [j, i]
        Nothing -> go xs (M.insert x i m) (i + 1)
`.trim(),

    csharp: `
public static int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.ContainsKey(complement)) {
            return new int[] { map[complement], i };
        }
        map[nums[i]] = i;
    }
    return new int[] {};
}`.trim(),

    r: `
twoSum <- function(nums, target) {
  map <- list()
  for (i in seq_along(nums)) {
    complement <- target - nums[i]
    if (!is.null(map[[as.character(complement)]])) {
      return(c(map[[as.character(complement)]], i - 1))
    }
    map[[as.character(nums[i])]] <- i - 1
  }
  return(c())
}`.trim(),

    dart: `
List<int> twoSum(List<int> nums, int target) {
  final map = <int, int>{};
  for (int i = 0; i < nums.length; i++) {
    final complement = target - nums[i];
    if (map.containsKey(complement)) {
      return [map[complement]!, i];
    }
    map[nums[i]] = i;
  }
  return [];
}`.trim(),

    elixir: `
defmodule Solution do
  def two_sum(nums, target) do
    map = Enum.with_index(nums) |> Enum.reduce(%{}, fn {num, i}, acc ->
      Map.put(acc, num, i)
    end)

    Enum.with_index(nums)
    |> Enum.find_value([], fn {num, i} ->
      complement = target - num
      case map[complement] do
        nil -> nil
        j when j != i -> [j, i]
        _ -> nil
      end
    end)
  end
end
`.trim(),
  },
};

export default TwoSumProblem;
