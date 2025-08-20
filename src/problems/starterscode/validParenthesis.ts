const starters = {
  javascriptStarter: `
/********************
 * IMPORTS
 ********************/
const fs = require('fs');

/********************
 * INPUT HANDLING
 ********************/
const s = fs.readFileSync(0, 'utf-8').trim();

/********************
 * MAIN FUNCTION
 ********************/
function isValid(s) {
    // TODO: Implement using stack
}

/********************
 * DRIVER CODE
 ********************/
// Example: Input "()[]{}"
const result = isValid(s);
console.log(result ? "true" : "false");
`.trim(),

  pythonStarter: `
# ============================
# INPUT HANDLING
# ============================
import sys
s = sys.stdin.read().strip()

# ============================
# MAIN FUNCTION
# ============================
def is_valid(s):
    # TODO: Implement using stack
    pass

# ============================
# DRIVER CODE
# ============================
# Example: Input "()[]{}"
print("true" if is_valid(s) else "false")
`.trim(),

  javaStarter: `
/* ============================
   IMPORTS
   ============================ */
import java.util.*;

public class Main {

    // ============================
    // MAIN FUNCTION
    // ============================
    public static boolean isValid(String s) {
        // TODO: Implement using stack
        return false;
    }

    // ============================
    // DRIVER CODE
    // ============================
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        // Example: Input "()[]{}"
        System.out.println(isValid(s) ? "true" : "false");
    }
}
`.trim(),

  cppStarter: `
/* ============================
   IMPORTS
   ============================ */
#include <iostream>
#include <stack>
#include <string>
using namespace std;

/* ============================
   MAIN FUNCTION
   ============================ */
bool is_valid(string s) {
    // TODO: Implement using stack
    return false;
}

/* ============================
   DRIVER CODE
   ============================ */
int main() {
    string s;
    getline(cin, s);
    // Example: Input "()[]{}"
    cout << (is_valid(s) ? "true" : "false") << endl;
    return 0;
}
`.trim(),

  cStarter: `
/* ============================
   IMPORTS
   ============================ */
#include <stdio.h>
#include <stdlib.h>

/* ============================
   MAIN FUNCTION
   ============================ */
int is_valid(const char* s) {
    // TODO: Implement using stack
    return 0;
}

/* ============================
   DRIVER CODE
   ============================ */
int main() {
    char s[1000];
    fgets(s, sizeof(s), stdin);
    int result = is_valid(s);
    // Example: Input "()[]{}"
    printf(result ? "true\\n" : "false\\n");
    return 0;
}
`.trim(),

  goStarter: `
/* ============================
   IMPORTS
   ============================ */
package main
import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

/* ============================
   MAIN FUNCTION
   ============================ */
func isValid(s string) bool {
    // TODO: Implement using stack
    return false
}

/* ============================
   DRIVER CODE
   ============================ */
func main() {
    reader := bufio.NewReader(os.Stdin)
    s, _ := reader.ReadString('\\n')
    s = strings.TrimSpace(s)
    // Example: Input "()[]{}"
    fmt.Println(isValid(s))
}
`.trim(),

  rubyStarter: `
# ============================
# INPUT HANDLING
# ============================
s = gets.strip

# ============================
# MAIN FUNCTION
# ============================
def is_valid(s)
  # TODO: Implement using stack
end

# ============================
# DRIVER CODE
# ============================
# Example: Input "()[]{}"
puts is_valid(s) ? "true" : "false"
`.trim(),

  rustStarter: `
/* ============================
   IMPORTS
   ============================ */
use std::io::{self, BufRead};

/* ============================
   MAIN FUNCTION
   ============================ */
fn is_valid(s: String) -> bool {
    // TODO: Implement using stack
    false
}

/* ============================
   DRIVER CODE
   ============================ */
fn main() {
    let stdin = io::stdin();
    let s = stdin.lock().lines().next().unwrap().unwrap();
    // Example: Input "()[]{}"
    println!("{}", if is_valid(s) { "true" } else { "false" });
}
`.trim(),

  rStarter: `
# ============================
# INPUT HANDLING
# ============================
# Safe input reading for most online judges
s <- readLines(con="stdin", n=1)

# ============================
# MAIN FUNCTION
# ============================
is_valid <- function(s) {
    # TODO: Implement using stack
    return(FALSE)  # return TRUE/FALSE as per R convention
}

# ============================
# DRIVER CODE
# ============================
# Example: Input "()[]{}"
cat(ifelse(is_valid(s), "true\\n", "false\\n"))
`.trim(),

  perlStarter: `
# ============================
# INPUT HANDLING
# ============================
my $s = <STDIN>;
chomp($s);

# ============================
# MAIN FUNCTION
# ============================
sub is_valid {
    my ($s) = @_;
    # TODO: Implement using stack
    # Return 1 for true, 0 for false
    return 0;
}

# ============================
# DRIVER CODE
# ============================
# Example: Input "()[]{}"
print is_valid($s) ? "true\\n" : "false\\n";
`.trim(),

  dartStarter: `
/* ============================
   IMPORTS
   ============================ */
import 'dart:io';

/* ============================
   MAIN FUNCTION
   ============================ */
bool isValid(String s) {
  // TODO: Implement using stack
  return false;
}

/* ============================
   DRIVER CODE
   ============================ */
// Example: Input "()[]{}"
void main() {
  String s = stdin.readLineSync()!.trim();
  print(isValid(s) ? "true" : "false");
}
`.trim(),

  haskellStarter: `
-- ============================
-- MAIN FUNCTION
-- ============================
isValid :: String -> Bool
isValid s = False  -- TODO: Implement using stack

-- ============================
-- DRIVER CODE
-- ============================
-- Example: Input "()[]{}"
main = do
    s <- getLine
    putStrLn $ if isValid s then "true" else "false"
`.trim(),

  kotlinStarter: `
/* ============================
   IMPORTS
   ============================ */
import java.util.*

/* ============================
   MAIN FUNCTION
   ============================ */
fun isValid(s: String): Boolean {
    // TODO: Implement using stack
    return false
}

/* ============================
   DRIVER CODE
   ============================ */
// Example: Input "()[]{}"
fun main() {
    val s = readLine()!!.trim()
    println(if (isValid(s)) "true" else "false")
}
`.trim(),

  elixirStarter: `
# ============================
# MAIN FUNCTION
# ============================
defmodule Solution do
  def is_valid(s) do
    # TODO: Implement using stack
    false
  end
end

# ============================
# DRIVER CODE
# ============================
[s] = IO.stream(:stdio, :line) |> Enum.take(1)
s = String.trim(s)
# Example: Input "()[]{}"
IO.puts(if Solution.is_valid(s), do: "true", else: "false")
`.trim(),

  csharpStarter: `
/* ============================
   MAIN FUNCTION
   ============================ */
public static bool IsValid(string s) {
  // TODO: Implement using stack
  return false;
}

/* ============================
   DRIVER CODE
   ============================ */
// Example: Input "()[]{}"
using System;
class Program {
    static void Main() {
        string s = Console.ReadLine().Trim();
        Console.WriteLine(IsValid(s) ? "true" : "false");
    }
}
`.trim(),

  swiftStarter: `
/* ============================
   IMPORTS
   ============================ */
import Foundation

/* ============================
   MAIN FUNCTION
   ============================ */
func isValid(_ s: String) -> Bool {
    // TODO: Implement using stack
    return false
}

/* ============================
   DRIVER CODE
   ============================ */
// Example: Input "()[]{}"
let s = readLine()!.trimmingCharacters(in: .whitespacesAndNewlines)
print(isValid(s) ? "true" : "false")
`.trim(),

  scalaStarter: `
object Main {
    // ============================
    // MAIN FUNCTION
    // ============================
    def isValid(s: String): Boolean = {
        // TODO: Implement using stack
        false
    }

    // ============================
    // DRIVER CODE
    // ============================
    // Example: Input "()[]{}"
    def main(args: Array[String]): Unit = {
        val s = scala.io.StdIn.readLine().trim
        println(if (isValid(s)) "true" else "false")
    }
}
`.trim(),
}

export default starters;
