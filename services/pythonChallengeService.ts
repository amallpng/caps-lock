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
    // Levels 1-10: Python Basics
    {
        level: 1,
        title: "Hello, World!",
        explanation: "The `print()` function is used to display output. Text (called 'strings') must be enclosed in quotes.",
        task: "Use the `print()` function to display the message 'Hello, Python!'",
        initialCode: "# Use the print() function to output the correct text\n",
        expectedOutput: "Hello, Python!",
        coinReward: 1
    },
    {
        level: 2,
        title: "Variables",
        explanation: "Variables are containers for storing data. You assign a value to a variable using the equals sign `=`.",
        task: "Create a variable named `message` and assign it the string 'Learning is fun'. Then, print the variable.",
        initialCode: "# Create a variable named `message` and assign it the correct string\nmessage = \"\"\n\n# Print the variable\n",
        expectedOutput: "Learning is fun",
        coinReward: 1
    },
    {
        level: 3,
        title: "Basic Arithmetic",
        explanation: "Python can be used as a calculator. You can use operators like `+` (addition), `-` (subtraction), and `*` (multiplication).",
        task: "Calculate the result of `10 + 5 * 3` and print it.",
        initialCode: "# Calculate the result and print it\nresult = 0\nprint(result)",
        expectedOutput: "25",
        coinReward: 1
    },
    {
        level: 4,
        title: "String Concatenation",
        explanation: "You can combine strings using the `+` operator. This is called concatenation.",
        task: "Create two string variables, `part1` and `part2`, and combine them to print 'Hello World'.",
        initialCode: "part1 = \"Hello\"\npart2 = \" World\"\n\n# Combine and print the two parts\n",
        expectedOutput: "Hello World",
        coinReward: 1
    },
    {
        level: 5,
        title: "User Input",
        explanation: "The `input()` function prompts the user for input and returns what they typed as a string.",
        task: "Use the `input()` function with the prompt 'What is your name? ' and print the result. Note: For this challenge, we will simulate the input 'Ada'.",
        initialCode: "# In a real program, this would pause for user input.\n# For this challenge, simply create a variable 'name' with the value 'Ada' and print it.\nname = \"\"\n",
        expectedOutput: "Ada",
        coinReward: 1
    },
    {
        level: 6,
        title: "Lists",
        explanation: "A list is an ordered collection of items, written with square brackets `[]`. You can access items by their index, starting from 0.",
        task: "Create a list of numbers `[10, 20, 30, 40]` and print the third item (at index 2).",
        initialCode: "numbers = [10, 20, 30, 40]\n\n# Print the item at index 2\n",
        expectedOutput: "30",
        coinReward: 1
    },
    {
        level: 7,
        title: "List Methods: append()",
        explanation: "You can add items to the end of a list using the `.append()` method.",
        task: "Create a list of fruits, add 'Orange' to the end of it, and then print the entire list.",
        initialCode: "fruits = [\"Apple\", \"Banana\"]\n\n# Add 'Orange' to the list\n\n\n# Print the updated list\n",
        expectedOutput: "['Apple', 'Banana', 'Orange']",
        coinReward: 1
    },
    {
        level: 8,
        title: "For Loops",
        explanation: "A `for` loop is used for iterating over a sequence (like a list). For each item, the indented block of code is executed.",
        task: "Loop through the `colors` list and print each color on a new line.",
        initialCode: "colors = [\"Red\", \"Green\", \"Blue\"]\n\n# Write a for loop to print each color\n",
        expectedOutput: "Red\nGreen\nBlue",
        coinReward: 1
    },
    {
        level: 9,
        title: "Conditional Logic (if/else)",
        explanation: "An `if/else` statement allows your code to make decisions. The indented code block under `if` runs if the condition is True, otherwise the `else` block runs.",
        task: "Check if the `temperature` is greater than 30. Print 'It is hot' if true, otherwise print 'It is not hot'.",
        initialCode: "temperature = 35\n\n# Write an if/else statement to check the temperature\n",
        expectedOutput: "It is hot",
        coinReward: 1
    },
    {
        level: 10,
        title: "Milestone: Python Apprentice",
        explanation: "Let's combine what you've learned. We'll check numbers in a list and print a message.",
        task: "Loop through the `numbers` list. For each number, if it's greater than 50, print it.",
        initialCode: "numbers = [25, 60, 40, 85, 10]\n\n# Loop through the list and print numbers greater than 50\n",
        expectedOutput: "60\n85",
        coinReward: 5,
        badge: { name: "Python Apprentice", icon: 'LevelBadge10' }
    },
    // Levels 11-20
    {
        level: 11,
        title: "More Conditionals (elif)",
        explanation: "`elif` (short for 'else if') lets you check for multiple conditions in sequence.",
        task: "Check if `score` is greater than 90 (A), greater than 80 (B), or something else (C).",
        initialCode: "score = 85\n\n# Write an if/elif/else chain to determine the grade\n",
        expectedOutput: "Grade B",
        coinReward: 2
    },
    {
        level: 12,
        title: "Comparison Operators",
        explanation: "To check for equality, use `==` (double equals). To check for inequality, use `!=`.",
        task: "Check if the variable `name` is equal to 'Alice'.",
        initialCode: "name = \"Alice\"\n\n# Check if name is 'Alice' and print the correct message\n",
        expectedOutput: "Welcome, Alice!",
        coinReward: 2
    },
    {
        level: 13,
        title: "Logical Operators",
        explanation: "`and` and `or` are used to combine conditional statements.",
        task: "Check if `age` is greater than 18 AND `country` is 'Canada'.",
        initialCode: "age = 25\ncountry = \"Canada\"\n\n# Use the 'and' operator to check both conditions\n",
        expectedOutput: "Eligible",
        coinReward: 2
    },
    {
        level: 14,
        title: "Type Conversion",
        explanation: "Input from `input()` is always a string. To treat it as a number, you must convert it using `int()` or `float()`.",
        task: "Convert the `age_str` to an integer and add 5 to it.",
        initialCode: "age_str = \"25\"\n\n# Convert age_str to an integer\nage_num = \n\n# Print the result of adding 5\n",
        expectedOutput: "30",
        coinReward: 2
    },
    {
        level: 15,
        title: "Dictionaries",
        explanation: "A dictionary is a collection of key-value pairs, written with curly braces `{}`. You access a value by its key.",
        task: "Create a dictionary for a person and print the value of their 'city'.",
        initialCode: "person = {\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}\n\n# Print the person's city\n",
        expectedOutput: "New York",
        coinReward: 2
    },
    {
        level: 16,
        title: "Modifying Dictionaries",
        explanation: "You can add new key-value pairs or change existing values in a dictionary.",
        task: "Add a 'job' key with the value 'Engineer' to the `person` dictionary and print the dictionary.",
        initialCode: "person = {\"name\": \"Jane\", \"age\": 28}\n\n# Add a new key-value pair for 'job'\n\n\n# Print the modified dictionary\n",
        expectedOutput: "{'name': 'Jane', 'age': 28, 'job': 'Engineer'}",
        coinReward: 2
    },
    {
        level: 17,
        title: "While Loops",
        explanation: "A `while` loop continues to execute as long as its condition is true.",
        task: "Use a `while` loop to print numbers from 1 to 3.",
        initialCode: "count = 1\n\n# Write a while loop that runs as long as count is less than or equal to 3\n",
        expectedOutput: "1\n2\n3",
        coinReward: 2
    },
    {
        level: 18,
        title: "Slicing Strings",
        explanation: "You can extract a portion of a string using slice syntax `[start:end]`.",
        task: "Get the first 5 characters from the `greeting` string.",
        initialCode: "greeting = \"Hello, beautiful world!\"\n\n# Get a slice of the first 5 characters\n",
        expectedOutput: "Hello",
        coinReward: 2
    },
    {
        level: 19,
        title: "Slicing Lists",
        explanation: "Slicing works on lists too. You can get a sub-section of a list.",
        task: "Get a new list containing the 2nd and 3rd elements from `letters`.",
        initialCode: "letters = ['a', 'b', 'c', 'd', 'e']\n\n# Slice the list to get ['b', 'c']\n",
        expectedOutput: "['b', 'c']",
        coinReward: 2
    },
    {
        level: 20,
        title: "Milestone: Data Wrangler",
        explanation: "Let's use a loop and conditionals on a dictionary.",
        task: "Loop through the `products` dictionary. If a product's price is less than 1.00, print its name.",
        initialCode: "products = {\"apple\": 0.50, \"banana\": 1.20, \"orange\": 0.75, \"milk\": 2.50}\n\n# Loop through the items and check the price\n",
        expectedOutput: "apple\norange",
        coinReward: 5,
        badge: { name: "Data Wrangler", icon: 'LevelBadge20' }
    },
    // Levels 21-30
    {
        level: 21,
        title: "Functions",
        explanation: "A function is a reusable block of code. You define it using `def`.",
        task: "Define a simple function `say_hello` that prints 'Hello there!'. Then call the function.",
        initialCode: "# Define the function 'say_hello'\ndef say_hello():\n    # Indent your code inside the function\n    \n\n# Call the function\n",
        expectedOutput: "Hello there!",
        coinReward: 2
    },
    {
        level: 22,
        title: "Function Arguments",
        explanation: "You can pass data, known as parameters or arguments, into a function.",
        task: "Create a function `greet(name)` that takes a name as an argument and prints a personalized greeting.",
        initialCode: "# Define the function 'greet' that accepts one argument 'name'\ndef greet(name):\n    \n\n# Call the function with the name 'Bob'\n",
        expectedOutput: "Hello, Bob!",
        coinReward: 2
    },
    {
        level: 23,
        title: "Function Return Values",
        explanation: "Functions can return a value using the `return` statement.",
        task: "Create a function `add(a, b)` that returns the sum of two numbers.",
        initialCode: "# Define the function 'add' that returns the sum of a and b\ndef add(a, b):\n    \n\n# Call the function and print the returned value\nresult = add(5, 4)\nprint(result)",
        expectedOutput: "9",
        coinReward: 2
    },
    {
        level: 24,
        title: "String Methods: upper() & lower()",
        explanation: "Strings have built-in methods to change their case.",
        task: "Convert a string to all uppercase letters.",
        initialCode: "message = \"this is a secret\"\n\n# Use a string method to make the message uppercase and print it\n",
        expectedOutput: "THIS IS A SECRET",
        coinReward: 2
    },
    {
        level: 25,
        title: "f-Strings",
        explanation: "f-strings provide a concise way to embed expressions inside string literals.",
        task: "Use an f-string to create the sentence 'My name is Alex and I am 30 years old.'",
        initialCode: "name = \"Alex\"\nage = 30\n\n# Use an f-string to combine the variables into the sentence\n",
        expectedOutput: "My name is Alex and I am 30 years old.",
        coinReward: 2
    },
    {
        level: 26,
        title: "The len() function",
        explanation: "The `len()` function returns the number of items in an object (like a string or a list).",
        task: "Find the number of characters in the string 'supercalifragilisticexpialidocious'.",
        initialCode: "long_word = \"supercalifragilisticexpialidocious\"\n\n# Use the len() function to find the length of the string\n",
        expectedOutput: "34",
        coinReward: 2
    },
    {
        level: 27,
        title: "Finding in Strings",
        explanation: "You can check if a substring exists within a string using the `in` keyword.",
        task: "Check if the word 'fox' is in the given sentence.",
        initialCode: "sentence = \"The quick brown fox jumps over the lazy dog.\"\n\n# Use the 'in' keyword to check for 'fox'\n",
        expectedOutput: "Found it!",
        coinReward: 2
    },
    {
        level: 28,
        title: "Replacing in Strings",
        explanation: "The `.replace()` method returns a new string where a specified value is replaced.",
        task: "Replace the word 'bad' with 'good' in the sentence.",
        initialCode: "review = \"This movie was very bad.\"\n\n# Use the .replace() method\n",
        expectedOutput: "This movie was very good.",
        coinReward: 2
    },
    {
        level: 29,
        title: "Splitting Strings",
        explanation: "The `.split()` method splits a string into a list of substrings.",
        task: "Split the CSV string into a list of items.",
        initialCode: "csv_data = \"apple,banana,cherry,date\"\n\n# Use the .split() method to create a list\n",
        expectedOutput: "['apple', 'banana', 'cherry', 'date']",
        coinReward: 2
    },
    {
        level: 30,
        title: "Milestone: Function Virtuoso",
        explanation: "Create a function that processes a string.",
        task: "Write a function `analyze_sentence` that takes a sentence, and returns a formatted string stating the number of words.",
        initialCode: "def analyze_sentence(sentence):\n    # Split the sentence into words\n    \n    # Get the count of words\n    \n    # Return the formatted string using an f-string\n    return \"\"\n\n# Call the function and print the result\nprint(analyze_sentence(\"This is a sample sentence.\"))",
        expectedOutput: "The sentence has 5 words.",
        coinReward: 5,
        badge: { name: "Function Virtuoso", icon: 'LevelBadge30' }
    },
    // Levels 31-40
    {
        level: 31,
        title: "Tuples",
        explanation: "A tuple is an ordered, unchangeable collection of items, written with round brackets `()`. They are like lists that cannot be modified.",
        task: "Create a tuple and try to access its first element.",
        initialCode: "coordinates = (10, 20)\n\n# Print the first element of the tuple\n",
        expectedOutput: "10",
        coinReward: 3
    },
    {
        level: 32,
        title: "Sets",
        explanation: "A set is an unordered collection with no duplicate elements, written with curly braces `{}`.",
        task: "Create a set from a list with duplicates to see how it automatically removes them.",
        initialCode: "numbers = [1, 2, 2, 3, 4, 4, 4, 5]\n\n# Create a set from the list and print it\n",
        expectedOutput: "{1, 2, 3, 4, 5}",
        coinReward: 3
    },
    {
        level: 33,
        title: "Iterating Dictionaries",
        explanation: "You can loop through a dictionary's keys, values, or both using `.keys()`, `.values()`, and `.items()`.",
        task: "Print each key and value from the `capitals` dictionary on a new line.",
        initialCode: "capitals = {\"USA\": \"Washington D.C.\", \"France\": \"Paris\"}\n\n# Loop through the dictionary's items and print them\n",
        expectedOutput: "The capital of USA is Washington D.C.\nThe capital of France is Paris",
        coinReward: 3
    },
    {
        level: 34,
        title: "Nested Lists",
        explanation: "You can have lists inside other lists. This is useful for creating grids or matrices.",
        task: "Access and print the number `5` from the nested list `matrix`.",
        initialCode: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\n# Access the element in the second row (index 1), second column (index 1)\n",
        expectedOutput: "5",
        coinReward: 3
    },
    {
        level: 35,
        title: "List Comprehensions",
        explanation: "List comprehensions offer a shorter syntax for creating a new list based on the values of an existing list.",
        task: "Use a list comprehension to create a new list containing the square of each number from the original list.",
        initialCode: "numbers = [1, 2, 3, 4, 5]\n\n# Create a new list 'squares' using a list comprehension\nsquares = []\n\nprint(squares)",
        expectedOutput: "[1, 4, 9, 16, 25]",
        coinReward: 3
    },
    {
        level: 36,
        title: "Importing Modules",
        explanation: "Python's power comes from its modules. You can import modules to use their functions. The `math` module provides mathematical functions.",
        task: "Import the `math` module and use its `sqrt` function to find the square root of 81.",
        initialCode: "# Import the math module\n\n\n# Use the math.sqrt() function and print the result\n",
        expectedOutput: "9.0",
        coinReward: 3
    },
    {
        level: 37,
        title: "The `random` module",
        explanation: "The `random` module is used for generating random numbers.",
        task: "Import the `random` module and print a random integer between 1 and 10 (inclusive). For this test, we'll fix the seed to get a predictable number.",
        initialCode: "import random\nrandom.seed(10) # This makes the 'random' number predictable for testing\n\n# Print a random integer between 1 and 10\n",
        expectedOutput: "9",
        coinReward: 3
    },
    {
        level: 38,
        title: "Error Handling (try/except)",
        explanation: "The `try` block lets you test a block of code for errors. The `except` block lets you handle the error.",
        task: "Write a `try...except` block to handle a division by zero error.",
        initialCode: "# Write a try block\ntry:\n    # Attempt to divide 10 by 0\n    \n# Write an except block to catch the ZeroDivisionError\nexcept ZeroDivisionError:\n    # Print the error message\n    ",
        expectedOutput: "Error: Cannot divide by zero.",
        coinReward: 3
    },
    {
        level: 39,
        title: "Reading Files",
        explanation: "You can read the contents of a file. The `with open(...)` syntax is the recommended way as it handles closing the file automatically.",
        task: "Simulate reading from a file and print its contents. (We will simulate the file for this environment).",
        initialCode: "# In a real environment, you'd have a file named 'poem.txt'\n# For this challenge, just create a multiline string and print it.\nfile_contents = \"\"\"\nRoses are red,\nViolets are blue.\n\"\"\"\nprint(file_contents.strip()) # .strip() removes leading/trailing whitespace",
        expectedOutput: "Roses are red,\nViolets are blue.",
        coinReward: 3
    },
    {
        level: 40,
        title: "Milestone: Module Master",
        explanation: "Let's combine functions and modules.",
        task: "Write a function `get_random_even` that uses the `random` module to return a random EVEN number between 1 and 100.",
        initialCode: "import random\n\ndef get_random_even(min_val, max_val):\n    # Keep picking a random number until we get an even one\n    # (Hint: use a while loop and the modulo '%' operator)\n    return 0\n\nrandom.seed(42) # Seeding for a predictable result\nprint(get_random_even(1, 100))",
        expectedOutput: "82",
        coinReward: 5,
        badge: { name: "Module Master", icon: 'LevelBadge40' }
    },
    // Levels 41-50
    {
        level: 41,
        title: "Introduction to Classes",
        explanation: "A class is like a blueprint for creating objects. The `__init__()` function is called automatically every time the class is being used to create a new object.",
        task: "Create a simple `Dog` class with an `__init__` method that sets its name.",
        initialCode: "# Create the Dog class\nclass Dog:\n    # Define the __init__ method\n    def __init__(self, name):\n        # Assign the 'name' argument to the instance's 'name' attribute\n        \n\n# Create an instance of the Dog class\nmy_dog = Dog(\"Fido\")\nprint(my_dog.name)",
        expectedOutput: "Fido",
        coinReward: 3
    },
    {
        level: 42,
        title: "Class Methods",
        explanation: "Methods are functions that belong to an object.",
        task: "Add a `bark` method to the `Dog` class that prints 'Woof!'.",
        initialCode: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    # Define the 'bark' method\n    def bark(self):\n        \n\nmy_dog = Dog(\"Fido\")\nmy_dog.bark()",
        expectedOutput: "Woof!",
        coinReward: 3
    },
    {
        level: 43,
        title: "Creating Objects",
        explanation: "An object (or instance) is a copy of the class with actual values.",
        task: "Create two different `Dog` objects, `dog1` and `dog2`, with different names, and print both their names.",
        initialCode: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n# Create two Dog objects\ndog1 = \ndog2 = \n\n# Print their names\n",
        expectedOutput: "Buddy\nLucy",
        coinReward: 3
    },
    {
        level: 44,
        title: "Object Attributes",
        explanation: "You can access the properties of an object using dot notation.",
        task: "Create a `Car` class that stores `color` and `year`. Create an object and print its `color`.",
        initialCode: "class Car:\n    def __init__(self, color, year):\n        self.color = color\n        self.year = year\n\n# Create a Car object\nmy_car = Car(\"red\", 2022)\n\n# Print the car's color\n",
        expectedOutput: "red",
        coinReward: 3
    },
    {
        level: 45,
        title: "Complex Functions",
        explanation: "Functions can take complex data types like dictionaries as arguments.",
        task: "Write a function that takes a student dictionary and prints a formatted summary.",
        initialCode: "def print_student_summary(student):\n    # Print the student's name and major using the dictionary keys\n    \n\nstudent_data = {\"name\": \"Emily\", \"major\": \"Physics\", \"gpa\": 3.8}\nprint_student_summary(student_data)",
        expectedOutput: "Name: Emily\nMajor: Physics",
        coinReward: 3
    },
    {
        level: 46,
        title: "Lambda Functions",
        explanation: "A lambda function is a small anonymous function. It can take any number of arguments, but can only have one expression.",
        task: "Create a lambda function that takes one parameter `a` and returns `a + 10`.",
        initialCode: "# Create a lambda function and assign it to variable 'x'\nx = \n\nprint(x(5))",
        expectedOutput: "15",
        coinReward: 3
    },
    {
        level: 47,
        title: "The map() function",
        explanation: "`map()` executes a specified function for each item in an iterable. The item is sent to the function as a parameter.",
        task: "Use `map()` and a lambda function to double all the numbers in a list.",
        initialCode: "numbers = [1, 2, 3, 4]\n\n# Use map() to double each number\ndoubled_numbers = map(lambda x: x * 2, numbers)\n\n# Convert the map object to a list and print it\n",
        expectedOutput: "[2, 4, 6, 8]",
        coinReward: 3
    },
    {
        level: 48,
        title: "The filter() function",
        explanation: "`filter()` creates a new iterator from elements of an iterable for which a function returns true.",
        task: "Use `filter()` to get only the numbers greater than 10 from a list.",
        initialCode: "ages = [5, 12, 17, 18, 24, 32]\n\n# Use filter() to get ages greater than 17\nadults = filter(lambda age: age > 17, ages)\n\n# Convert the filter object to a list and print it\n",
        expectedOutput: "[18, 24, 32]",
        coinReward: 3
    },
    {
        level: 49,
        title: "Putting it Together",
        explanation: "Let's combine classes, methods, and data.",
        task: "Create a `Playlist` class. Add a method `add_song`. Create a playlist, add two songs, and print the song list.",
        initialCode: "class Playlist:\n    def __init__(self, name):\n        self.name = name\n        self.songs = []\n\n    def add_song(self, song_title):\n        # Append the song_title to the self.songs list\n        \n\nmy_playlist = Playlist(\"My Jams\")\nmy_playlist.add_song(\"Bohemian Rhapsody\")\nmy_playlist.add_song(\"Stairway to Heaven\")\n\n# Print the playlist's songs attribute\n",
        expectedOutput: "['Bohemian Rhapsody', 'Stairway to Heaven']",
        coinReward: 3
    },
    {
        level: 50,
        title: "Final Challenge: Simple Calculator",
        explanation: "Time to build something! Your final task is to create functions for basic arithmetic operations.",
        task: "Create four functions: `add`, `subtract`, `multiply`, and `divide`. Then, use them to perform a series of calculations and print the final result.",
        initialCode: "def add(x, y):\n    # Return the sum\n    pass\n\ndef subtract(x, y):\n    # Return the difference\n    pass\n\ndef multiply(x, y):\n    # Return the product\n    pass\n\ndef divide(x, y):\n    # Return the quotient\n    pass\n\n# Perform a calculation: (10 + 20) * 2 / 5\nresult1 = add(10, 20)\nresult2 = multiply(result1, 2)\nfinal_result = divide(result2, 5)\n\nprint(final_result)",
        expectedOutput: "12.0",
        coinReward: 10,
        badge: { name: "Python Calculator Pro", icon: 'GrandMasterTrophy' }
    }
];
