import type { BadgeIcons } from '../components/icons/BadgeIcons';

export interface PythonChallenge {
  level: number;
  title: string;
  explanation: string;
  example?: string;
  task: string;
  initialCode: string;
  expectedOutput: string;
  coinReward?: number;
  badge?: {
    name: string;
    icon: keyof typeof BadgeIcons;
  };
}

export const PYTHON_CHALLENGES: PythonChallenge[] = [
    {
        level: 1,
        title: "Hello, World!",
        explanation: "The `print()` function is used to display output to the console. Text (called 'strings') must be enclosed in quotes.",
        task: "Copy the code below into the notebook on the right and run it to see the output. To run a cell, click on it and press Shift+Enter.",
        initialCode: "print(\"Hello, Python!\")",
        coinReward: 1,
        expectedOutput: "Hello, Python!"
    },
    {
        level: 2,
        title: "Variables",
        explanation: "Variables are containers for storing data values. You assign a value to a variable using the equals sign `=`.",
        task: "Create a variable named `greeting` and assign it the string value 'Good morning'. Then, print the `greeting` variable.",
        initialCode: "greeting = \"Good morning\"\nprint(greeting)",
        expectedOutput: "Good morning"
    },
    {
        level: 3,
        title: "Numbers & Arithmetic",
        explanation: "Python supports integers (`int`) and decimal numbers (`float`). You can perform standard arithmetic operations like division (`/`).",
        task: "Create a variable `a` with the value 25 and a variable `b` with the value 5. Print the result of `a` divided by `b`.",
        initialCode: "a = 25\nb = 5\nprint(a / b)",
        coinReward: 1,
        expectedOutput: "5.0"
    },
    {
        level: 4,
        title: "Lists",
        explanation: "A list is an ordered collection of items, written with square brackets `[]`. You can access items by their index, starting from 0.",
        task: "Create a list of numbers and then print the second item from the list.",
        initialCode: "scores = [98, 87, 91, 79]\n# Print the second score (at index 1)\nprint(scores[1])",
        expectedOutput: "87"
    },
    {
        level: 5,
        title: "For Loops",
        explanation: "A `for` loop is used for iterating over a sequence (like a list). For each item in the sequence, the indented block of code is executed.",
        task: "Loop through the `fruits` list and print each fruit's name on a new line.",
        initialCode: "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)",
        expectedOutput: "apple\nbanana\ncherry"
    },
    {
        level: 6,
        title: "Conditional Logic",
        explanation: "An `if/else` statement allows your code to make decisions. The indented code block under `if` runs if the condition is True, otherwise the `else` block runs.",
        task: "Check if the `age` is 18 or greater. Print the appropriate message based on the condition.",
        initialCode: "age = 21\nif age >= 18:\n    print(\"You are an adult.\")\nelse:\n    print(\"You are a minor.\")",
        coinReward: 2,
        expectedOutput: "You are an adult."
    },
    {
        level: 7,
        title: "Functions",
        explanation: "A function is a reusable block of code that performs a specific action. You define a function using the `def` keyword. Functions can take inputs (arguments) and return outputs.",
        task: "Define a function `multiply` that takes two numbers, `a` and `b`, and returns their product. Then call it with the numbers 7 and 3.",
        initialCode: "def multiply(a, b):\n  return a * b\n\nresult = multiply(7, 3)\nprint(result)",
        expectedOutput: "21"
    },
    {
        level: 8,
        title: "Dictionaries",
        explanation: "A dictionary is a collection of key-value pairs, written with curly braces `{}`. You access a value by its key.",
        task: "Create a dictionary representing a car and print the value associated with the 'model' key.",
        initialCode: "car = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\nprint(car[\"model\"])",
        coinReward: 2,
        expectedOutput: "Mustang"
    },
     {
        level: 9,
        title: "Combining It All",
        explanation: "Let's combine functions, lists, and loops to solve a common problem.",
        task: "Write a function `sum_list` that takes a list of numbers and returns their sum. Do not use the built-in `sum()` function.",
        initialCode: "def sum_list(numbers):\n  total = 0\n  for number in numbers:\n    total += number\n  return total\n\nmy_list = [10, 20, 30, 40]\nprint(sum_list(my_list))",
        expectedOutput: "100"
    },
    {
        level: 10,
        title: "Final Challenge!",
        explanation: "Congratulations on reaching the final challenge! You've learned the basics of Python. You are ready to explore more complex topics.",
        task: "Run the code below to see a final message. Mark this challenge as complete to receive your badge!",
        initialCode: "print(\"You are a Python Hero!\")",
        coinReward: 5,
        badge: {
            name: "Python Hero",
            icon: 'GrandMasterTrophy'
        },
        expectedOutput: "You are a Python Hero!"
    }
];
