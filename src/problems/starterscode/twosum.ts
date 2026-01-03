export const javascriptStarter = `
/********************
 * IMPORTS
 * Add your imports here if needed
 ********************/
const fs = require('fs');

/********************
 * INPUT HANDLING
 * Do not modify this block
 ********************/
const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = input[0].trim().split(" ").map(Number);
const target = parseInt(input[1]);

/********************
 * HELPER FUNCTIONS (Optional)
 * Define additional helper functions here
 ********************/

/********************
 * MAIN FUNCTION
 * Implement the required function below
 ********************/
function twoSum(nums, target) {
    // TODO: Write your code here
}

/********************
 * DRIVER CODE
 * Do not modify this block
 ********************/
const result = twoSum(nums, target);
console.log(JSON.stringify(result));
`.trim();

export const pythonStarter = `
# ============================
# IMPORTS
# Add your imports here if needed
# ============================
# import math, itertools, etc.
import sys

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
lines = sys.stdin.read().splitlines()
nums = list(map(int, lines[0].split()))
target = int(lines[1])

# ============================
# HELPER FUNCTIONS (Optional)
# Define additional helper functions here
# ============================

# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
def twoSum(nums, target):
    # TODO: Write your code here
    pass

# ============================
# EXECUTE FUNCTION
# Do not modify this block
# ============================
result = twoSum(nums, target)
print(f"[{','.join(map(str, result))}]")
`.trim();

export const javaStarter = `
/* ============================
   IMPORTS
   Add your imports here if needed
============================ */
import java.util.*;

public class Main {

    // ============================
    // HELPER FUNCTIONS (Optional)
    // You can define additional methods here
    // ============================

    // ============================
    // MAIN FUNCTION
    // Implement the required function below
    // ============================
    public static int[] twoSum(int[] nums, int target) {
        // TODO: Write your code here
        return new int[] {};
    }

    // ============================
    // DRIVER CODE
    // Do not modify this block
    // ============================
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int target = Integer.parseInt(sc.nextLine());
        int[] result = twoSum(nums, target);

        // Print without spaces
        System.out.print("[");
        for (int i = 0; i < result.length; i++) {
          System.out.print(result[i]);
          if (i < result.length - 1) System.out.print(",");
        }
        System.out.println("]");
    }
}
`.trim();

export const cppStarter = `
/* ============================
   IMPORTS / HEADERS
   Add your includes here if needed
============================ */
#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <unordered_map>
#include <algorithm>

using namespace std;

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (map.count(complement)) return {map[complement], i};
        map[nums[i]] = i;
    }
    return {};
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    int num;
    vector<int> nums;
    while (iss >> num) nums.push_back(num);

    int target;
    cin >> target;

    vector<int> result = twoSum(nums, target);
    cout << "[";
    for (int i = 0; i < result.size(); ++i) {
        cout << result[i];
    }
    cout << "]" << endl;

    return 0;
}
`.trim();

export const cStarter = `
/* ============================
   IMPORTS / HEADERS
   Add your includes here if needed
============================ */
#include <stdio.h>
#include <stdlib.h>

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
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
    free(result);
    return NULL;
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
int main() {
    int nums[1000], n = 0, target;

    // Read numbers until newline
    while (scanf("%d", &nums[n]) == 1) {
        if (getchar() == '\\n') break;
        n++;
    }
    n++;
    scanf("%d", &target);

    int returnSize;
    int* result = twoSum(nums, n, target, &returnSize);

    // Print result in [x,y] format (no spaces)
    printf("[");
    for (int i = 0; i < returnSize; ++i) {
        printf("%d", result[i]);
    }
    printf("]\\n");

    free(result);
    return 0;
}
`.trim();

export const goStarter = `
/* ============================
   IMPORTS
   Add your imports here if needed
============================ */
package main

import (
    "fmt"
    "bufio"
    "os"
    "strconv"
    "strings"
)

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
func twoSum(nums []int, target int) []int {
    // TODO: Write your code here
    return []int{}
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
func main() {
    reader := bufio.NewReader(os.Stdin)

    // Read first line: array of numbers
    line1, _ := reader.ReadString('\n')
    nums := []int{}
    for _, part := range strings.Fields(line1) {
        num, _ := strconv.Atoi(part)
        nums = append(nums, num)
    }

    // Read second line: target integer
    line2, _ := reader.ReadString('\n')
    target, _ := strconv.Atoi(strings.TrimSpace(line2))

    // Call user's function
    result := twoSum(nums, target)

    // Print result in [x,y] format (no spaces)
    fmt.Print("[")
    for i, val := range result {
        fmt.Print(val)
        if i < len(result)-1 {
            fmt.Print(",")
        }
    }
    fmt.Println("]")
}
`.trim();

export const rubyStarter = `
# ============================
# IMPORTS
# Add your imports here if needed
# ============================

# ============================
# HELPER FUNCTIONS (Optional)
# Define additional helper functions here
# ============================

# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
def twoSum(nums, target)
  # TODO: Write your code here
end

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
nums = gets.strip.split.map(&:to_i)
target = gets.strip.to_i

# Call user's function
result = twoSum(nums, target)

# Print result in [x,y] format (no spaces)
print "["
print result.join(",")
puts "]"
`.trim();

export const rustStarter = `
/* ============================
   IMPORTS
   Add your imports here if needed
============================ */
use std::collections::HashMap;
use std::io::{self, BufRead};

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // TODO: Write your code here
    Vec::new()
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();

    let nums: Vec<i32> = lines.next().unwrap().unwrap()
        .split_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();

    let target: i32 = lines.next().unwrap().unwrap().parse().unwrap();

    let result = two_sum(nums, target);

    // Print result in [x,y] format (no spaces)
    print!("[");
    for (i, val) in result.iter().enumerate() {
        print!("{}", val);
        if i < result.len() - 1 {
            print!(",");
        }
    }
    println!("]");
}
`.trim();

export const kotlinStarter = `
/* ============================
   IMPORTS
   Add your imports here if needed
============================ */
import java.util.*
import kotlin.collections.*

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
fun twoSum(nums: IntArray, target: Int): IntArray {
    // TODO: Write your code here
    return intArrayOf()
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
fun main() {
    val nums = readLine()!!.split(" ").map { it.toInt() }.toIntArray()
    val target = readLine()!!.toInt()

    val result = twoSum(nums, target)
    println(result.joinToString(prefix = "[", postfix = "]", separator = ","))
}
`.trim();

export const swiftStarter = `
/* ============================
   IMPORTS
   Add your imports here if needed
============================ */
import Foundation

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    // TODO: Write your code here
    return []
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
let nums = readLine()!.split(separator: " ").map { Int($0)! }
let target = Int(readLine()!)!
let result = twoSum(nums, target)

// Print without spaces
print("[\(result.map { String($0) }.joined(separator: ","))]")
`.trim();

export const perlStarter = `
# ============================
# HELPER FUNCTIONS (Optional)
# Define additional helper functions here
# ============================

# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
sub twoSum {
    my ($nums_ref, $target) = @_;
    # TODO: Write your code here
    return ();
}

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
my $line = <STDIN>;
chomp $line;
my @nums = split(' ', $line);
chomp(my $target = <STDIN>);

my @result = twoSum(\@nums, $target);
print "[" . join(",", @result) . "]\n";
`.trim();

export const scalaStarter = `
/* ============================
   IMPORTS / HEADERS
   Add your imports here if needed
============================ */

/* ============================
   HELPER FUNCTIONS (Optional)
   Define additional helper functions here
============================ */

/* ============================
   MAIN FUNCTION
   Implement the required function below
============================ */
def twoSum(nums: Array[Int], target: Int): Array[Int] = {
    // TODO: Write your code here
    Array()
}

/* ============================
   DRIVER CODE / INPUT HANDLING
   Do not modify this block
============================ */
object Main {
    def main(args: Array[String]): Unit = {
        val nums = scala.io.StdIn.readLine().split(" ").map(_.toInt)
        val target = scala.io.StdIn.readLine().toInt
        val result = twoSum(nums, target)
        println(result.mkString("[", ",", "]"))
    }
}
`.trim();

export const haskellStarter = `
-- ============================
-- IMPORTS / HEADERS
-- Add your imports here if needed
-- ============================
import Data.List (intercalate)

-- ============================
-- HELPER FUNCTIONS (Optional)
-- Define additional helper functions here
-- ============================

-- ============================
-- MAIN FUNCTION
-- Implement the required function below
-- ============================
twoSum :: [Int] -> Int -> [Int]
twoSum nums target = 
    -- TODO: Write your code here
    []

-- ============================
-- DRIVER CODE / INPUT HANDLING
-- Do not modify this block
-- ============================
main = do
    nums <- fmap (map read . words) getLine
    target <- fmap read getLine
    let result = twoSum nums target
    putStrLn ("[" ++ intercalate "," (map show result) ++ "]")
`.trim();

export const rStarter = `
# ============================
# IMPORTS / LIBRARIES (Optional)
# Add any libraries you need here
# ============================

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
all_input <- readLines("stdin")

nums <- if (length(all_input) >= 1 && nchar(trimws(all_input[1])) > 0) {
  as.integer(unlist(strsplit(trimws(all_input[1]), "\\\\s+")))
} else {
  integer(0)
}

target <- if (length(all_input) >= 2 && nchar(trimws(all_input[2])) > 0) {
  as.integer(trimws(all_input[2]))
} else {
  0
}

# ============================
# HELPER FUNCTIONS (Optional)
# Define additional helper functions here
# ============================

# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
twoSum <- function(nums, target) {
  # TODO: Write your code here
  # Return a vector of 0-based indices of the two numbers that sum to target
  return(c())
}

# ============================
# EXECUTE FUNCTION
# Do not modify this block
# ============================
result <- twoSum(nums, target)

# Print output in [i,j] format without spaces
cat("[", paste(result, collapse=","), "]\\n", sep = "")
`.trim();

export const dartStarter = `
# ============================
# IMPORTS / LIBRARIES (Optional)
# Add any imports here if needed
# ============================
import 'dart:io';

# ============================
# HELPER FUNCTIONS (Optional)
# Define additional helper functions here
# ============================

# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
List<int> twoSum(List<int> nums, int target) {
  // TODO: Write your code here
  // Return a list of 0-based indices of the two numbers that sum to target
  return [];
}

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
void main() {
  List<int> nums = stdin.readLineSync()!.split(' ').map(int.parse).toList();
  int target = int.parse(stdin.readLineSync()!);
  var result = twoSum(nums, target);

  // Print output in [i,j] format without spaces
  print("[" + result.join(",") + "]");
}
`.trim();

export const elixirStarter = `
# ============================
# MAIN FUNCTION
# Implement the required function below
# ============================
defmodule Solution do
  def two_sum(nums, target) do
    # TODO: Write your code here
    # Return a list of 0-based indices of the two numbers that sum to target
    []
  end
end

# ============================
# DRIVER CODE / INPUT HANDLING
# Do not modify this block
# ============================
[line1, line2] = IO.stream(:stdio, :line) |> Enum.take(2)
nums = String.trim(line1) |> String.split(" ") |> Enum.map(&String.to_integer/1)
target = String.trim(line2) |> String.to_integer()
result = Solution.two_sum(nums, target)

# Print output in [i,j] format without spaces
IO.puts("[" <> Enum.join(result, ",") <> "]")
`.trim();

export const csharpStarter = `
/* ============================
   MAIN FUNCTION
   Implement the required function below
   ============================ */
using System;
using System.Linq;

class Solution {
    public static int[] TwoSum(int[] nums, int target) {
        // TODO: Write your code here
        // Return an array of 0-based indices of the two numbers that sum to target
        return new int[] {};
    }

    /* ============================
       DRIVER CODE / INPUT HANDLING
       Do not modify this block
       ============================ */
    public static void Main() {
        string[] input = Console.ReadLine().Split(' ');
        int[] nums = Array.ConvertAll(input, int.Parse);
        int target = int.Parse(Console.ReadLine());
        int[] result = TwoSum(nums, target);
        // Print output in [i,j] format without spaces
        Console.WriteLine("[" + string.Join(",", result) + "]");
    }
}
`.trim();
