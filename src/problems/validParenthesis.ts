import type { IExample, IProblem, ITestCase } from "../types/problem.types";
import starters from "./starterscode/validParenthesis";

const Examples: IExample[] = [
  {
    input: 's = "()"',
    output: "true",
    explanation: "A single pair of parentheses is valid.",
  },
  {
    input: 's = "()[]{}"',
    output: "true",
    explanation: "Mixed types of brackets in correct order are valid.",
  },
  {
    input: 's = "(]"',
    output: "false",
    explanation: "Mismatched brackets are invalid.",
  },
];

const TestCases: ITestCase[] = [
  {
    input: 's = "()"',
    output: "true",
    stdin: "()",
    explanation: "Single pair of parentheses is valid.",
    stdout: true,
  },
  {
    input: 's = "()[]{}"',
    output: "true",
    stdin: "()[]{}",
    explanation: "Mixed brackets correctly closed.",
    stdout: true,
  },
  {
    input: 's = "(]"',
    output: "false",
    stdin: "(]",
    explanation: "Mismatched brackets.",
    stdout: false,
  },
  {
    input: 's = "([)]"',
    output: "false",
    stdin: "([)]",
    explanation: "Incorrectly nested brackets.",
    stdout: false,
  },
  {
    input: 's = "{[]}"',
    output: "true",
    stdin: "{[]}",
    explanation: "Braces containing valid brackets.",
    stdout: true,
  },
  {
    input: 's = "("',
    output: "false",
    stdin: "(",
    explanation: "Single opening bracket.",
    stdout: false,
  },
  {
    input: 's = "((()))"',
    output: "true",
    stdin: "((()))",
    explanation: "Nested parentheses correctly closed.",
    stdout: true,
  },
  {
    input: 's = "({[({[]})]})"',
    output: "true",
    stdin: "({[({[]})]})",
    explanation: "Complex nested brackets valid.",
    stdout: true,
  },
  {
    input: 's = "({[({[})]})"',
    output: "false",
    stdin: "({[({[})]})",
    explanation: "Complex nested brackets with mismatch.",
    stdout: false,
  },
  {
    input: 's = "[]"',
    output: "true",
    stdin: "[]",
    explanation: "Single pair of square brackets.",
    stdout: true,
  },
  {
    input: 's = "{}"',
    output: "true",
    stdin: "{}",
    explanation: "Single pair of curly braces.",
    stdout: true,
  },
  {
    input: 's = "}{ "',
    output: "false",
    stdin: "}{",
    explanation: "Closing brace before opening brace.",
    stdout: false,
  },
  {
    input: 's = "([{}])"',
    output: "true",
    stdin: "([{}])",
    explanation: "Nested brackets in correct order.",
    stdout: true,
  },
  {
    input: 's = "([{{}}])"',
    output: "true",
    stdin: "([{{}}])",
    explanation: "Multiple nested braces inside brackets.",
    stdout: true,
  },
  {
    input: 's = "([{{}])"',
    output: "false",
    stdin: "([{{}])",
    explanation: "Mismatched closing bracket inside braces.",
    stdout: false,
  },
  {
    input: 's = "((()))(){}[]"',
    output: "true",
    stdin: "((()))(){}[]",
    explanation: "Multiple valid bracket sequences.",
    stdout: true,
  },
  {
    input: 's = "((((((()))))))"',
    output: "true",
    stdin: "((((((()))))))",
    explanation: "Deeply nested parentheses.",
    stdout: true,
  },
  {
    input: 's = "(((()))"',
    output: "false",
    stdin: "(((()))",
    explanation: "Missing one closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "((()))))"',
    output: "false",
    stdin: "((()))))",
    explanation: "Extra closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "([{}{}])"',
    output: "true",
    stdin: "([{}{}])",
    explanation: "Multiple correct braces inside brackets.",
    stdout: true,
  },
  {
    input: 's = "[({})]"',
    output: "true",
    stdin: "[({})]",
    explanation: "Brackets containing nested parentheses and braces.",
    stdout: true,
  },
  {
    input: 's = "[({)}]"',
    output: "false",
    stdin: "[({)}]",
    explanation: "Incorrectly nested parentheses inside brackets.",
    stdout: false,
  },
  {
    input: 's = "{}{}{}"',
    output: "true",
    stdin: "{}{}{}",
    explanation: "Multiple consecutive curly braces.",
    stdout: true,
  },
  {
    input: 's = "[][][]"',
    output: "true",
    stdin: "[][][]",
    explanation: "Multiple consecutive square brackets.",
    stdout: true,
  },
  {
    input: 's = "()()()"',
    output: "true",
    stdin: "()()()",
    explanation: "Multiple consecutive parentheses.",
    stdout: true,
  },
  {
    input: 's = "({[({[({[]})]})]})"',
    output: "true",
    stdin: "({[({[({[]})]})]})",
    explanation: "Very complex nested brackets.",
    stdout: true,
  },
  {
    input: 's = "({[({[({[})]})]})"',
    output: "false",
    stdin: "({[({[({[})]})]})",
    explanation: "Very complex nested brackets with mismatch.",
    stdout: false,
  },
  {
    input: 's = "({})[()]"',
    output: "true",
    stdin: "({})[()]",
    explanation: "Separate bracket types valid.",
    stdout: true,
  },
  {
    input: 's = "({)}"',
    output: "false",
    stdin: "({)}",
    explanation: "Mismatched brackets inside parentheses.",
    stdout: false,
  },
  {
    input: 's = "(([]){})"',
    output: "true",
    stdin: "(([]){})",
    explanation: "Nested valid brackets inside parentheses.",
    stdout: true,
  },
  {
    input: 's = "([)]{}"',
    output: "false",
    stdin: "([)]{}",
    explanation: "Incorrectly nested brackets followed by valid braces.",
    stdout: false,
  },
  {
    input: 's = ""',
    output: "true",
    stdin: "",
    explanation: "Empty string is valid.",
    stdout: true,
  },
  {
    input: 's = "[[[]]]"',
    output: "true",
    stdin: "[[[]]]",
    explanation: "Nested square brackets.",
    stdout: true,
  },
  {
    input: 's = "[[[]]"',
    output: "false",
    stdin: "[[[]]",
    explanation: "Missing closing square bracket.",
    stdout: false,
  },
  {
    input: 's = "[]]"',
    output: "false",
    stdin: "[]]",
    explanation: "Extra closing square bracket.",
    stdout: false,
  },
  {
    input: 's = "{{{{}}}}"',
    output: "true",
    stdin: "{{{{}}}}",
    explanation: "Nested curly braces.",
    stdout: true,
  },
  {
    input: 's = "{{{{}}}"',
    output: "false",
    stdin: "{{{{}}}",
    explanation: "Missing one closing curly brace.",
    stdout: false,
  },
  {
    input: 's = "({}[])"',
    output: "true",
    stdin: "({}[])",
    explanation: "Parentheses containing valid braces and brackets.",
    stdout: true,
  },
  {
    input: 's = "({[)]}"',
    output: "false",
    stdin: "({[)]}",
    explanation: "Mismatched nested brackets.",
    stdout: false,
  },
  {
    input: 's = "([{}]){}"',
    output: "true",
    stdin: "([{}]){}",
    explanation: "Valid nested followed by valid braces.",
    stdout: true,
  },
  {
    input: 's = "[({})]{}()"',
    output: "true",
    stdin: "[({})]{}()",
    explanation: "Multiple valid bracket sequences.",
    stdout: true,
  },
  {
    input: 's = "[({})]{)"',
    output: "false",
    stdin: "[({})]{)",
    explanation: "Mismatched closing bracket.",
    stdout: false,
  },
  {
    input: 's = "([[[[]]]])"',
    output: "true",
    stdin: "([[[[]]]])",
    explanation: "Deeply nested brackets.",
    stdout: true,
  },
  {
    input: 's = "([[[[]]]]"',
    output: "false",
    stdin: "([[[[]]]]",
    explanation: "Missing closing brackets.",
    stdout: false,
  },
  {
    input: 's = "({({({({})})})})"',
    output: "true",
    stdin: "({({({({})})})})",
    explanation: "Very deep nested brackets.",
    stdout: true,
  },
  {
    input: 's = "({({({({})})})}"',
    output: "false",
    stdin: "({({({({})})})}",
    explanation: "Missing closing bracket in deep nesting.",
    stdout: false,
  },
  {
    input: 's = "([{}({})])"',
    output: "true",
    stdin: "([{}({})])",
    explanation: "Mixed nesting is valid.",
    stdout: true,
  },
  {
    input: 's = "([{}({})]"',
    output: "false",
    stdin: "([{}({})]",
    explanation: "One missing closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "(({}))"',
    output: "true",
    stdin: "(({}))",
    explanation: "Nested valid braces inside parentheses.",
    stdout: true,
  },
  {
    input: 's = "(({})"',
    output: "false",
    stdin: "(({})",
    explanation: "Missing closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "[({})({})]"',
    output: "true",
    stdin: "[({})({})]",
    explanation: "Valid brackets inside square brackets.",
    stdout: true,
  },
  {
    input: 's = "[({})({})"',
    output: "false",
    stdin: "[({})({})",
    explanation: "Missing closing square bracket.",
    stdout: false,
  },
  {
    input: 's = "{}()[]"',
    output: "true",
    stdin: "{}()[]",
    explanation: "Multiple separate valid brackets.",
    stdout: true,
  },
  {
    input: 's = "{(})"',
    output: "false",
    stdin: "{(})",
    explanation: "Mismatched brackets.",
    stdout: false,
  },
  {
    input: 's = "(((())))"',
    output: "true",
    stdin: "(((())))",
    explanation: "Deep nested parentheses.",
    stdout: true,
  },
  {
    input: 's = "(((()))"',
    output: "false",
    stdin: "(((()))",
    explanation: "Missing closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "{[()]}"',
    output: "true",
    stdin: "{[()]}",
    explanation: "Nested mixed brackets.",
    stdout: true,
  },
  {
    input: 's = "{[(])}"',
    output: "false",
    stdin: "{[(])}",
    explanation: "Incorrectly nested brackets.",
    stdout: false,
  },
  {
    input: 's = "([{}])([{}])"',
    output: "true",
    stdin: "([{}])([{}])",
    explanation: "Two valid sequences.",
    stdout: true,
  },
  {
    input: 's = "([{}])([{}]"',
    output: "false",
    stdin: "([{}])([{}]",
    explanation: "Second sequence missing closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "([]){}"',
    output: "true",
    stdin: "([]){}",
    explanation: "Valid parentheses and braces.",
    stdout: true,
  },
  {
    input: 's = "([]}{)"',
    output: "false",
    stdin: "([]}{)",
    explanation: "Mismatched brackets in sequence.",
    stdout: false,
  },
  {
    input: 's = "[([]{})]"',
    output: "true",
    stdin: "[([]{})]",
    explanation: "Nested brackets inside square brackets.",
    stdout: true,
  },
  {
    input: 's = "[([]{})"',
    output: "false",
    stdin: "[([]{})",
    explanation: "Missing closing square bracket.",
    stdout: false,
  },
  {
    input: 's = "(){}[]({[]})"',
    output: "true",
    stdin: "(){}[]({[]})",
    explanation: "Multiple valid sequences including nested.",
    stdout: true,
  },
  {
    input: 's = "(){}[]({[})"',
    output: "false",
    stdin: "(){}[]({[})",
    explanation: "Mismatched nested brackets.",
    stdout: false,
  },
  {
    input: 's = "{{}}[[()]]"',
    output: "true",
    stdin: "{{}}[[()]]",
    explanation: "Nested valid curly braces and brackets.",
    stdout: true,
  },
  {
    input: 's = "{{}[[()]]"',
    output: "false",
    stdin: "{{}[[()]]",
    explanation: "Missing closing brace.",
    stdout: false,
  },
  {
    input: 's = "({}[]){}"',
    output: "true",
    stdin: "({}[]){}",
    explanation: "Valid sequences of parentheses, brackets, and braces.",
    stdout: true,
  },
  {
    input: 's = "({}[]){}{"',
    output: "false",
    stdin: "({}[]){}{",
    explanation: "Extra opening brace without closure.",
    stdout: false,
  },
  {
    input: 's = "(([]){})[]"',
    output: "true",
    stdin: "(([]){})[]",
    explanation: "Nested parentheses and braces followed by brackets.",
    stdout: true,
  },
  {
    input: 's = "(([]){})["',
    output: "false",
    stdin: "(([]){})[",
    explanation: "Missing closing bracket.",
    stdout: false,
  },
  {
    input: 's = "([]{})(){}[]"',
    output: "true",
    stdin: "([]{})(){}[]",
    explanation: "Multiple valid sequences with nesting.",
    stdout: true,
  },
  {
    input: 's = "([]{})(){}["',
    output: "false",
    stdin: "([]{})(){}[",
    explanation: "Missing closing bracket in last sequence.",
    stdout: false,
  },
  {
    input: 's = "({[]})"',
    output: "true",
    stdin: "({[]})",
    explanation: "Parentheses containing braces and brackets.",
    stdout: true,
  },
  {
    input: 's = "({[})"',
    output: "false",
    stdin: "({[})",
    explanation: "Incorrectly nested brackets.",
    stdout: false,
  },
  {
    input: 's = "{}[](){}[]"',
    output: "true",
    stdin: "{}[](){}[]",
    explanation: "Multiple valid sequences of all bracket types.",
    stdout: true,
  },
  {
    input: 's = "{}[](){[}"',
    output: "false",
    stdin: "{}[](){[}",
    explanation: "Last sequence has mismatch.",
    stdout: false,
  },
  {
    input: 's = "[({})({})({})]"',
    output: "true",
    stdin: "[({})({})({})]",
    explanation: "Multiple valid nested sequences inside brackets.",
    stdout: true,
  },
  {
    input: 's = "[({})({})({})"',
    output: "false",
    stdin: "[({})({})({})",
    explanation: "Missing closing bracket.",
    stdout: false,
  },
  {
    input: 's = "(({}[]))"',
    output: "true",
    stdin: "(({}[]))",
    explanation: "Nested parentheses containing braces and brackets.",
    stdout: true,
  },
  {
    input: 's = "(({}[])"',
    output: "false",
    stdin: "(({}[])",
    explanation: "Missing closing parenthesis.",
    stdout: false,
  },
  {
    input: 's = "{}([]{})"',
    output: "true",
    stdin: "{}([]{})",
    explanation: "Curly braces containing parentheses and braces.",
    stdout: true,
  },
];

const ValidParenthesisProblem: IProblem = {
  title: "Valid Parenthesis",
  description:
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1) Open brackets are closed by the same type, 2) Open brackets are closed in the correct order, and 3) Every closing bracket has a corresponding opening bracket.",
  difficulty: "Easy",
  tags: ["Stack", "String"],
  examples: Examples,
  testCases: TestCases,
  constraints: [
    "1 <= s.length <= 10^5",
    "s consists only of the characters '(', ')', '{', '}', '[' and ']'.",
  ],
  functionName: "isValid",
  starterCode: {
    javascript: starters.javascriptStarter,
    python: starters.pythonStarter,
    java: starters.javaStarter,
    cpp: starters.cppStarter,
    c: starters.cStarter,
    go: starters.goStarter,
    ruby: starters.rubyStarter,
    rust: starters.rustStarter,
    kotlin: starters.kotlinStarter,
    swift: starters.swiftStarter,
    perl: starters.perlStarter,
    scala: starters.scalaStarter,
    haskell: starters.haskellStarter,
    csharp: starters.csharpStarter,
    r: starters.rStarter,
    dart: starters.dartStarter,
    elixir: starters.elixirStarter,
  },
  solution: {
    javascript: `
function isValid(s) {
    const stack = [];
    for (let ch of s) {
        if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
        else {
            if (!stack.length) return false;
            const top = stack.pop();
            if ((ch === ')' && top !== '(') ||
                (ch === ']' && top !== '[') ||
                (ch === '}' && top !== '{')) return false;
        }
    }
    return stack.length === 0;
}`.trim(),

    python: `
def is_valid(s):
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack:
                return False
            top = stack.pop()
            if (ch == ')' and top != '(') or \
               (ch == ']' and top != '[') or \
               (ch == '}' and top != '{'):
                return False
    return len(stack) == 0`.trim(),

    java: `
public static boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char ch : s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);
        else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) return false;
        }
    }
    return stack.isEmpty();
}`.trim(),

    cpp: `
bool is_valid(string s) {
    stack<char> st;
    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') st.push(ch);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) return false;
        }
    }
    return st.empty();
}`.trim(),

    c: `
#include <stdbool.h>

bool is_valid(const char* s) {
    char stack[1000];
    int top = -1;
    for (int i = 0; s[i]; i++) {
        char ch = s[i];
        if (ch == '(' || ch == '[' || ch == '{') stack[++top] = ch;
        else {
            if (top == -1) return false;
            char t = stack[top--];
            if ((ch == ')' && t != '(') ||
                (ch == ']' && t != '[') ||
                (ch == '}' && t != '{')) return false;
        }
    }
    return top == -1;
}`.trim(),

    go: `
func isValid(s string) bool {
    stack := []rune{}
    for _, ch := range s {
        if ch == '(' || ch == '[' || ch == '{' {
            stack = append(stack, ch)
        } else {
            if len(stack) == 0 { return false }
            top := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            if (ch == ')' && top != '(') ||
               (ch == ']' && top != '[') ||
               (ch == '}' && top != '{') {
                return false
            }
        }
    }
    return len(stack) == 0
}`.trim(),

    ruby: `
def is_valid(s)
    stack = []
    s.each_char do |ch|
        if ['(', '[', '{'].include?(ch)
            stack.push(ch)
        else
            return false if stack.empty?
            top = stack.pop
            return false if (ch == ')' && top != '(') ||
                            (ch == ']' && top != '[') ||
                            (ch == '}' && top != '{')
        end
    end
    stack.empty?
end`.trim(),

    rust: `
fn is_valid(s: &str) -> bool {
    let mut stack = Vec::new();
    for ch in s.chars() {
        match ch {
            '(' | '[' | '{' => stack.push(ch),
            ')' => if stack.pop() != Some('(') { return false },
            ']' => if stack.pop() != Some('[') { return false },
            '}' => if stack.pop() != Some('{') { return false },
            _ => {}
        }
    }
    stack.is_empty()
}`.trim(),

    kotlin: `
fun isValid(s: String): Boolean {
    val stack = mutableListOf<Char>()
    for (ch in s) {
        when (ch) {
            '(', '[', '{' -> stack.add(ch)
            ')', ']', '}' -> {
                if (stack.isEmpty()) return false
                val top = stack.removeAt(stack.size - 1)
                if ((ch == ')' && top != '(') ||
                    (ch == ']' && top != '[') ||
                    (ch == '}' && top != '{')) return false
            }
        }
    }
    return stack.isEmpty()
}`.trim(),

    swift: `
func isValid(_ s: String) -> Bool {
    var stack = [Character]()
    for ch in s {
        if ch == "(" || ch == "[" || ch == "{" {
            stack.append(ch)
        } else {
            if stack.isEmpty { return false }
            let top = stack.removeLast()
            if (ch == ")" && top != "(") ||
               (ch == "]" && top != "[") ||
               (ch == "}" && top != "{") { return false }
        }
    }
    return stack.isEmpty
}`.trim(),

    csharp: `
public static bool IsValid(string s) {
    Stack<char> stack = new Stack<char>();
    foreach (char ch in s) {
        if (ch == '(' || ch == '[' || ch == '{') stack.Push(ch);
        else {
            if (stack.Count == 0) return false;
            char top = stack.Pop();
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) return false;
        }
    }
    return stack.Count == 0;
}`.trim(),

    elixir: `
defmodule Solution do
  def is_valid(s) do
    stack = []
    String.graphemes(s)
    |> Enum.reduce_while(stack, fn ch, stack ->
        cond do
            ch in ["(", "[", "{"] -> {:cont, [ch | stack]}
            ch == ")" and hd(stack) != "(" -> {:halt, false}
            ch == "]" and hd(stack) != "[" -> {:halt, false}
            ch == "}" and hd(stack) != "{" -> {:halt, false}
            ch in [")", "]", "}"] -> {:cont, tl(stack)}
            true -> {:cont, stack}
        end
    end)
    |> case do
        false -> false
        [] -> true
        _ -> false
    end
  end
end`.trim(),

    scala: `
def isValid(s: String): Boolean = {
    val stack = scala.collection.mutable.Stack[Char]()
    for (ch <- s) {
        if (ch == '(' || ch == '[' || ch == '{') stack.push(ch)
        else {
            if (stack.isEmpty) return false
            val top = stack.pop()
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) return false
        }
    }
    stack.isEmpty
}`.trim(),

    haskell: `
isValid :: String -> Bool
isValid s = go s []
  where
    go [] stack = null stack
    go (c:cs) stack
        | c \`elem\` "([{" = go cs (c:stack)
        | c == ')' = if not (null stack) && head stack == '(' then go cs (tail stack) else False
        | c == ']' = if not (null stack) && head stack == '[' then go cs (tail stack) else False
        | c == '}' = if not (null stack) && head stack == '{' then go cs (tail stack) else False
        | otherwise = go cs stack`.trim(),

    r: `
is_valid <- function(s) {
    stack <- character(0)
    for (ch in strsplit(s, "")[[1]]) {
        if (ch %in% c("(", "[", "{")) stack <- c(stack, ch)
        else {
            if (length(stack) == 0) return(FALSE)
            top <- tail(stack, 1)
            stack <- head(stack, -1)
            if ((ch == ")" && top != "(") ||
                (ch == "]" && top != "[") ||
                (ch == "}" && top != "{")) return(FALSE)
        }
    }
    length(stack) == 0
}`.trim(),

    dart: `
bool isValid(String s) {
  List<String> stack = [];
  for (var ch in s.split('')) {
    if (ch == '(' || ch == '[' || ch == '{') stack.add(ch);
    else {
      if (stack.isEmpty) return false;
      var top = stack.removeLast();
      if ((ch == ')' && top != '(') ||
          (ch == ']' && top != '[') ||
          (ch == '}' && top != '{')) return false;
    }
  }
  return stack.isEmpty;
}`.trim(),
    perl: `
sub is_valid {
    my ($s) = @_;
    my @stack;
    my @chars = split //, $s;
    for my $ch (@chars) {
        if ($ch eq '(' || $ch eq '[' || $ch eq '{') { push @stack, $ch }
        else {
            return 0 unless @stack;
            my $top = pop @stack;
            return 0 if ($ch eq ')' && $top ne '(') ||
                        ($ch eq ']' && $top ne '[') ||
                        ($ch eq '}' && $top ne '{');
        }
    }
    return @stack == 0 ? 1 : 0;
}
`.trim(),
  },
};

export default ValidParenthesisProblem;
