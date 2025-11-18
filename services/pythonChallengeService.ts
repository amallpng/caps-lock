import type { BadgeIcons } from '../components/icons/BadgeIcons';

export interface PythonChallenge {
  level: number;
  title: string;
  explanation: string;
  example?: string;
  task: string;
  initialCode: string;
  testCases: {
    description: string;
    testCode: string;
    expectedOutput: string;
  }[];
  coinReward?: number;
  badge?: {
    name: string;
    icon: keyof typeof BadgeIcons;
  };
}

const initialChallenges: PythonChallenge[] = [
    // --- BASICS ---
    {
        level: 1,
        title: "Hello, World!",
        explanation: "The `print()` function is used to display output to the console. Text (called 'strings') must be enclosed in quotes.",
        example: "```python\nprint(\"Welcome to Python!\")\n```",
        task: "Write a line of code that prints the exact phrase 'Hello, Python!' to the console.",
        initialCode: "# Your code here\n",
        coinReward: 1,
        testCases: [ { description: "Prints 'Hello, Python!'", testCode: "pass", expectedOutput: "Hello, Python!" } ]
    },
    {
        level: 2,
        title: "Variables",
        explanation: "Variables are containers for storing data values. You assign a value to a variable using the equals sign `=`. Variable names cannot start with a number and are case-sensitive.",
        example: "```python\nmessage = \"This is a message\"\nprint(message)\n```",
        task: "Create a variable named `greeting` and assign it the string value 'Good morning'. Then, print the `greeting` variable.",
        initialCode: "# Create a variable and print it\n",
        testCases: [ { description: "Prints the variable's value", testCode: "pass", expectedOutput: "Good morning" } ]
    },
    {
        level: 3,
        title: "Data Types: Numbers",
        explanation: "Python has various data types. `int` is for whole numbers (e.g., 10, -5) and `float` is for decimal numbers (e.g., 3.14). You can perform arithmetic operations like addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).",
        example: "```python\napples = 5\nprice_per_apple = 1.50\ntotal_cost = apples * price_per_apple\nprint(total_cost)\n```",
        task: "Create a variable `a` with the value 25 and a variable `b` with the value 5. Print the result of `a` divided by `b`.",
        initialCode: "a = 25\nb = 5\n# Print the result of a divided by b\n",
        coinReward: 1,
        testCases: [ { description: "Calculates and prints division", testCode: "pass", expectedOutput: "5.0" } ]
    },
    {
        level: 4,
        title: "Data Types: Strings",
        explanation: "Strings are sequences of characters, enclosed in single (`'`) or double (`\"`) quotes. You can combine strings using the `+` operator. This is called concatenation.",
        example: "```python\nfirst_name = \"John\"\nlast_name = \"Doe\"\nfull_name = first_name + \" \" + last_name\nprint(full_name)\n```",
        task: "Create two string variables, `part1` with value 'Python is ' and `part2` with value 'fun'. Concatenate them and print the result.",
        initialCode: "part1 = 'Python is '\npart2 = 'fun'\n# Combine and print\n",
        testCases: [ { description: "Concatenates two strings", testCode: "pass", expectedOutput: "Python is fun" } ]
    },
    {
        level: 5,
        title: "Comments",
        explanation: "Comments are used to explain code. They start with a `#` and are ignored by the Python interpreter. Good comments make your code easier to understand.",
        example: "```python\n# This line creates a variable\nspeed = 99 # This is the speed in mph\n```",
        task: "The code below has an error. Comment out the line that is causing the error so the program prints 'Code runs!' successfully.",
        initialCode: "# This is the start of the program\nprint(\"Code runs!\")\nThis line is an error",
        coinReward: 1,
        testCases: [ { description: "Code runs without error", testCode: "pass", expectedOutput: "Code runs!" } ]
    },
    // --- STRINGS ---
    {
        level: 6,
        title: "String Formatting (f-strings)",
        explanation: "f-strings provide a concise way to embed expressions inside string literals. Prefix the string with `f` and place variables or expressions inside curly braces `{}`.",
        example: "```python\nname = \"Alice\"\nage = 30\nprint(f\"My name is {name} and I am {age} years old.\")\n```",
        task: "Create a variable `item` with value 'book' and `price` with value 15. Use an f-string to print 'The price of the book is 15 dollars.'",
        initialCode: "item = 'book'\nprice = 15\n# Use an f-string to print the message\n",
        testCases: [ { description: "Prints formatted string", testCode: "pass", expectedOutput: "The price of the book is 15 dollars." } ]
    },
    {
        level: 7,
        title: "String Methods: .upper() and .lower()",
        explanation: "Strings have built-in functions called methods. `.upper()` returns the string in all uppercase, and `.lower()` returns it in all lowercase. These methods do not change the original string.",
        example: "```python\ntext = \"Hello World\"\nprint(text.upper())\nprint(text.lower())\nprint(text) # Original is unchanged\n```",
        task: "Given the variable `movie_title`, print it in all uppercase letters.",
        initialCode: "movie_title = \"The Grand Adventure\"\n# Print in uppercase\n",
        testCases: [ { description: "Converts to uppercase", testCode: "pass", expectedOutput: "THE GRAND ADVENTURE" } ]
    },
    {
        level: 8,
        title: "String Indexing",
        explanation: "You can access individual characters in a string using their index in square brackets `[]`. Indexing starts at 0 for the first character.",
        example: "```python\nword = \"Python\"\nfirst_char = word[0]  # 'P'\nthird_char = word[2]  # 't'\nprint(first_char)\nprint(third_char)\n```",
        task: "Print the first character of the string `language`.",
        initialCode: "language = \"JavaScript\"\n# Print the first character\n",
        coinReward: 1,
        testCases: [ { description: "Accesses the first character", testCode: "pass", expectedOutput: "J" } ]
    },
    {
        level: 9,
        title: "The input() function",
        explanation: "The `input()` function allows you to get input from the user. It pauses your program and waits for the user to type something and press Enter. The input is always returned as a string.",
        example: "```python\nname = input(\"Enter your name: \")\nprint(f\"Hello, {name}!\")\n```",
        task: "Our tests will automatically provide input. Write a program that asks for a favorite color and prints 'Your favorite color is [color].'",
        initialCode: "# Get user input and print a message\n",
        coinReward: 1,
        testCases: [ { description: "Handles input", testCode: "pass", expectedOutput: "What is your favorite color? Your favorite color is blue." } ]
    },
    {
        level: 10,
        title: "Converting Types",
        explanation: "You can convert between data types. For example, `int()` can convert a string to an integer, and `str()` can convert a number to a string. This is crucial when working with input from users.",
        example: "```python\nage_str = \"25\"\nage_int = int(age_str)\nyear_of_birth = 2024 - age_int\nprint(year_of_birth)\n```",
        task: "The test will provide the string '100' as input. Convert it to an integer, add 50 to it, and print the result.",
        initialCode: "value_str = '100'\n# Convert to int, add 50, and print\n",
        coinReward: 1,
        testCases: [ { description: "Converts string to int and calculates", testCode: "pass", expectedOutput: "150" } ]
    },
    // --- CONDITIONALS ---
    {
        level: 11,
        title: "Booleans and Comparison",
        explanation: "A boolean has two possible values: `True` or `False`. You create booleans by comparing values using operators like `==` (equal to), `!=` (not equal to), `>` (greater than), and `<` (less than).",
        example: "```python\nx = 10\ny = 5\nprint(x > y)  # True\nprint(x == 10) # True\nprint(y != 5)  # False\n```",
        task: "Create two variables, `num1 = 50` and `num2 = 100`. Print whether `num1` is less than `num2`.",
        initialCode: "num1 = 50\nnum2 = 100\n# Print the result of the comparison\n",
        testCases: [ { description: "Compares two numbers", testCode: "pass", expectedOutput: "True" } ]
    },
    {
        level: 12,
        title: "The 'if' Statement",
        explanation: "An `if` statement runs a block of code only if a condition is `True`. The code block must be indented (usually with 4 spaces).",
        example: "```python\ntemperature = 35\nif temperature > 30:\n    print(\"It's a hot day!\")\nprint(\"Enjoy the weather.\") # This line runs regardless\n```",
        task: "Write an `if` statement that prints 'You passed' if `score` is greater than or equal to 70.",
        initialCode: "score = 85\n# Write your if statement here\n",
        testCases: [ { description: "Prints message if score is high", testCode: "pass", expectedOutput: "You passed" } ]
    },
    {
        level: 13,
        title: "The 'else' Statement",
        explanation: "The `else` statement provides a block of code to run if the `if` condition is `False`. It catches all other cases.",
        example: "```python\nage = 16\nif age >= 18:\n    print(\"You can vote.\")\nelse:\n    print(\"You cannot vote yet.\")\n```",
        task: "Write an if/else block. If `is_day` is `True`, print 'Good morning'. Otherwise, print 'Good night'.",
        initialCode: "is_day = False\n# Write your if/else block here\n",
        coinReward: 1,
        testCases: [ { description: "Prints correct greeting", testCode: "pass", expectedOutput: "Good night" } ]
    },
    {
        level: 14,
        title: "The 'elif' Statement",
        explanation: "`elif` stands for 'else if'. It allows you to check for multiple conditions in sequence.",
        example: "```python\nnum = 0\nif num > 0:\n    print(\"Positive\")\nelif num < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")\n```",
        task: "Write a chain of if/elif/else statements. If `grade` is 90 or more, print 'A'. If it's 80 or more, print 'B'. Otherwise, print 'C'.",
        initialCode: "grade = 85\n# Write your conditional logic here\n",
        testCases: [ { description: "Determines the correct grade", testCode: "pass", expectedOutput: "B" } ]
    },
    {
        level: 15,
        title: "Logical Operators",
        explanation: "Logical operators `and`, `or`, and `not` are used to combine conditional statements.\n- `and`: Both conditions must be true.\n- `or`: At least one condition must be true.\n- `not`: Inverts the boolean value.",
        example: "```python\nage = 25\nhas_license = True\nif age > 18 and has_license:\n    print(\"Allowed to drive.\")\n```",
        task: "Check if `temperature` is between 20 and 30 (inclusive). Print `True` if it is, `False` otherwise.",
        initialCode: "temperature = 22\n# Check if temperature is in range and print the boolean result\n",
        testCases: [ { description: "Checks if a number is in range", testCode: "pass", expectedOutput: "True" } ]
    },
    // --- LISTS ---
    {
        level: 16,
        title: "Lists: Creation",
        explanation: "A list is an ordered and changeable collection of items. Lists are written with square brackets `[]`, with items separated by commas.",
        example: "```python\nnumbers = [1, 2, 3, 4, 5]\nfruits = [\"apple\", \"banana\", \"cherry\"]\nprint(numbers)\nprint(fruits)\n```",
        task: "Create a list named `planets` containing the strings 'Mercury', 'Venus', and 'Earth'. Then, print the list.",
        initialCode: "# Create the planets list\n",
        testCases: [ { description: "Creates and prints a list", testCode: "pass", expectedOutput: "['Mercury', 'Venus', 'Earth']" } ]
    },
    {
        level: 17,
        title: "Lists: Accessing Items",
        explanation: "You can access items in a list using their index, just like with strings. The first item has index 0.",
        example: "```python\ncolors = [\"red\", \"green\", \"blue\"]\nprint(colors[0]) # 'red'\nprint(colors[2]) # 'blue'\n```",
        task: "Given the list `scores`, print the second item.",
        initialCode: "scores = [98, 87, 91, 79]\n# Print the second score\n",
        coinReward: 1,
        testCases: [ { description: "Accesses an item by index", testCode: "pass", expectedOutput: "87" } ]
    },
    {
        level: 18,
        title: "Lists: Modifying Items",
        explanation: "Lists are mutable, which means you can change their content. You can change an item by referring to its index number.",
        example: "```python\ncars = [\"Ford\", \"Volvo\", \"BMW\"]\ncars[0] = \"Toyota\"\nprint(cars)\n```",
        task: "Change the second item in the `shopping_list` from 'juice' to 'milk', then print the entire list.",
        initialCode: "shopping_list = ['bread', 'juice', 'eggs']\n# Change 'juice' to 'milk'\n\n# Print the updated list\n",
        testCases: [ { description: "Modifies an item in the list", testCode: "pass", expectedOutput: "['bread', 'milk', 'eggs']" } ]
    },
    {
        level: 19,
        title: "List Methods: .append()",
        explanation: "The `.append()` method adds an item to the end of the list.",
        example: "```python\nanimals = ['cat', 'dog']\nanimals.append('mouse')\nprint(animals)\n```",
        task: "Add the number 40 to the end of the `data` list and print the list.",
        initialCode: "data = [10, 20, 30]\n# Add 40 to the end\n\n# Print the list\n",
        testCases: [ { description: "Appends an item to a list", testCode: "pass", expectedOutput: "[10, 20, 30, 40]" } ]
    },
    {
        level: 20,
        title: "The len() function",
        explanation: "The `len()` function returns the number of items in a list (its length).",
        example: "```python\nletters = ['a', 'b', 'c', 'd']\nprint(len(letters)) # 4\n```",
        task: "Print the number of items in the `guests` list.",
        initialCode: "guests = ['Alice', 'Bob', 'Charlie', 'David']\n# Print the length of the list\n",
        coinReward: 1,
        testCases: [ { description: "Calculates the length of a list", testCode: "pass", expectedOutput: "4" } ]
    },
    // --- LOOPS ---
    {
        level: 21,
        title: "The 'for' Loop",
        explanation: "A `for` loop is used for iterating over a sequence (like a list). For each item in the sequence, the indented block of code is executed.",
        example: "```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)\n```",
        task: "Loop through the `numbers` list and print each number on a new line.",
        initialCode: "numbers = [1, 5, 9]\n# Loop through and print each number\n",
        testCases: [ { description: "Iterates and prints list items", testCode: "pass", expectedOutput: "1\n5\n9" } ]
    },
    {
        level: 22,
        title: "The range() Function",
        explanation: "The `range()` function generates a sequence of numbers. `range(5)` generates numbers from 0 to 4. It's often used with `for` loops to repeat an action a specific number of times.",
        example: "```python\nfor i in range(3): # i will be 0, then 1, then 2\n    print(\"Looping!\")\n```",
        task: "Use a `for` loop and `range()` to print the numbers from 0 to 4.",
        initialCode: "# Use a for loop with range to print numbers 0-4\n",
        testCases: [ { description: "Loops with range()", testCode: "pass", expectedOutput: "0\n1\n2\n3\n4" } ]
    },
    {
        level: 23,
        title: "Looping and Calculating",
        explanation: "You can perform calculations inside a loop. A common pattern is to initialize a variable before the loop and update it in each iteration.",
        example: "```python\nprices = [10, 20, 5]\ntotal = 0\nfor price in prices:\n    total = total + price\nprint(f\"Total: {total}\")\n```",
        task: "Calculate the sum of all numbers in the `nums` list and print the final sum.",
        initialCode: "nums = [10, 20, 30, 40]\nsum_of_nums = 0\n# Loop through nums, add each to sum_of_nums\n\n# Print the final sum\n",
        testCases: [ { description: "Calculates the sum of a list", testCode: "pass", expectedOutput: "100" } ]
    },
    {
        level: 24,
        title: "The 'while' Loop",
        explanation: "A `while` loop executes a block of code as long as a condition is `True`. Be careful to include code that eventually makes the condition `False`, otherwise you'll create an infinite loop!",
        example: "```python\ncount = 0\nwhile count < 3:\n    print(\"Still counting...\")\n    count = count + 1\n```",
        task: "Use a `while` loop to print numbers from 1 to 3.",
        initialCode: "i = 1\n# Write a while loop to print numbers 1, 2, 3\n",
        coinReward: 1,
        testCases: [ { description: "Uses a while loop to count", testCode: "pass", expectedOutput: "1\n2\n3" } ]
    },
    {
        level: 25,
        title: "Looping with Conditions",
        explanation: "You can place `if` statements inside loops to perform different actions based on the item being processed.",
        example: "```python\nnumbers = [1, 2, 3, 4, 5, 6]\nfor num in numbers:\n    if num % 2 == 0: # Check if the number is even\n        print(f\"{num} is even\")\n```",
        task: "Loop through the `values` list. Print only the numbers that are greater than 10.",
        initialCode: "values = [5, 12, 8, 15, 3]\n# Loop and print numbers > 10\n",
        testCases: [ { description: "Prints numbers matching a condition", testCode: "pass", expectedOutput: "12\n15" } ]
    },
     // --- DICTIONARIES & TUPLES ---
    {
        level: 26,
        title: "Dictionaries: Creation",
        explanation: "A dictionary is a collection of key-value pairs. They are written with curly braces `{}`. Each key must be unique.",
        example: "```python\nperson = {\n  \"name\": \"John\",\n  \"age\": 30,\n  \"city\": \"New York\"\n}\nprint(person)\n```",
        task: "Create a dictionary named `car` with keys 'brand' (value 'Ford') and 'model' (value 'Mustang'). Print the dictionary.",
        initialCode: "# Create the car dictionary\n",
        testCases: [ { description: "Creates and prints a dictionary", testCode: "pass", expectedOutput: "{'brand': 'Ford', 'model': 'Mustang'}" } ]
    },
    {
        level: 27,
        title: "Dictionaries: Accessing Values",
        explanation: "You access the value of a dictionary item by referring to its key name, inside square brackets `[]`.",
        example: "```python\nstudent = {\"name\": \"Alice\", \"grade\": 10}\nprint(student[\"name\"])\n```",
        task: "From the `product` dictionary, print the value associated with the 'price' key.",
        initialCode: "product = {\"name\": \"Laptop\", \"price\": 1200, \"in_stock\": True}\n# Print the price\n",
        testCases: [ { description: "Accesses a value by key", testCode: "pass", expectedOutput: "1200" } ]
    },
    {
        level: 28,
        title: "Dictionaries: Modifying Values",
        explanation: "You can change the value of a specific item by referring to its key name. You can also add new key-value pairs.",
        example: "```python\nuser = {\"username\": \"user1\"}\nuser[\"username\"] = \"admin\"\nuser[\"is_active\"] = True # Add a new pair\nprint(user)\n```",
        task: "In the `settings` dictionary, change the value of 'theme' to 'dark'. Then, add a new key 'notifications' with the value `False`. Print the final dictionary.",
        initialCode: "settings = {\"theme\": \"light\", \"font_size\": 14}\n# Update theme and add notifications\n\n# Print the dictionary\n",
        coinReward: 1,
        testCases: [ { description: "Updates and adds dictionary items", testCode: "pass", expectedOutput: "{'theme': 'dark', 'font_size': 14, 'notifications': False}" } ]
    },
    {
        level: 29,
        title: "Looping Through Dictionaries",
        explanation: "You can loop through a dictionary's keys using a `for` loop. To get both key and value, use the `.items()` method.",
        example: "```python\ncapitals = {\"USA\": \"Washington D.C.\", \"France\": \"Paris\"}\nfor country, capital in capitals.items():\n    print(f\"The capital of {country} is {capital}\")\n```",
        task: "Loop through the `inventory` dictionary and print each fruit and its quantity in the format 'fruit: quantity'.",
        initialCode: "inventory = {\"apples\": 5, \"bananas\": 10}\n# Loop through the items and print\n",
        testCases: [ { description: "Loops through dictionary items", testCode: "pass", expectedOutput: "apples: 5\nbananas: 10" } ]
    },
    {
        level: 30,
        title: "Tuples",
        explanation: "A tuple is an ordered and **unchangeable** collection. Tuples are written with round brackets `()`. Once a tuple is created, you cannot change its values.",
        example: "```python\ncoordinates = (10, 20)\nprint(coordinates[0]) # Accessing works like lists\n# coordinates[0] = 5  <- This would cause an error!\n```",
        task: "Create a tuple named `rgb_color` with the values 255, 0, 128. Print the tuple.",
        initialCode: "# Create the tuple\n",
        testCases: [ { description: "Creates and prints a tuple", testCode: "pass", expectedOutput: "(255, 0, 128)" } ]
    },
    // --- FUNCTIONS ---
    {
        level: 31,
        title: "Defining a Function",
        explanation: "A function is a block of code which only runs when it is called. You can define a function using the `def` keyword. The code inside the function must be indented.",
        example: "```python\ndef say_hello():\n    print(\"Hello from a function!\")\n\nsay_hello() # Calling the function\n```",
        task: "Define a function named `show_message` that prints 'This is a message.'. Then call the function to execute it.",
        initialCode: "# Define the function\n\n\n# Call the function\n",
        testCases: [ { description: "Defines and calls a simple function", testCode: "pass", expectedOutput: "This is a message." } ]
    },
    {
        level: 32,
        title: "Function Arguments",
        explanation: "Information can be passed into functions as arguments (also called parameters). You define them inside the parentheses in the function definition.",
        example: "```python\ndef greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Alice\")\ngreet(\"Bob\")\n```",
        task: "Define a function `square` that takes one argument `number` and prints that number multiplied by itself.",
        initialCode: "def square(number):\n    # Your code here\n    pass\n\nsquare(5)",
        testCases: [ { description: "Function with one argument", testCode: "pass", expectedOutput: "25" } ]
    },
    {
        level: 33,
        title: "The 'return' Statement",
        explanation: "Functions can return a value using the `return` statement. This allows you to use the result of a function's calculation elsewhere in your code.",
        example: "```python\ndef add(x, y):\n    return x + y\n\nresult = add(3, 4)\nprint(result)\n```",
        task: "Define a function `multiply` that takes two numbers, `a` and `b`, and returns their product.",
        initialCode: "def multiply(a, b):\n    # Your code here\n    pass\n\nprint(multiply(7, 3))",
        coinReward: 1,
        testCases: [ { description: "Function returns a value", testCode: "pass", expectedOutput: "21" } ]
    },
    {
        level: 34,
        title: "Default Argument Values",
        explanation: "You can specify a default value for an argument. If the function is called without that argument, the default value is used.",
        example: "```python\ndef greet(name, greeting=\"Hello\"):\n    print(f\"{greeting}, {name}!\")\n\ngreet(\"World\")\ngreet(\"World\", \"Hi\")\n```",
        task: "Create a function `power` that takes a `base` and an `exponent` with a default value of 2. It should return `base` to the power of `exponent` (`**` operator).",
        initialCode: "def power(base, exponent=2):\n    # Your code here\n    pass\n\nprint(power(4))\nprint(power(2, 5))",
        testCases: [ { description: "Function with default arguments", testCode: "pass", expectedOutput: "16\n32" } ]
    },
    {
        level: 35,
        title: "Combining Functions",
        explanation: "Good programming often involves breaking a large problem into smaller, manageable functions. You can call one function from within another.",
        example: "```python\ndef double(n):\n    return n * 2\n\ndef double_and_add_one(n):\n    doubled_n = double(n)\n    return doubled_n + 1\n\nprint(double_and_add_one(5))\n```",
        task: "You have two functions. Complete `get_full_greeting` to use the `create_greeting` function and return a final message.",
        initialCode: "def create_greeting(name):\n    return f\"Hello {name}\"\n\ndef get_full_greeting(name):\n    # Call create_greeting and add \"! Welcome!\" to the end\n    pass\n\nprint(get_full_greeting(\"Maria\"))",
        testCases: [ { description: "Calls another function", testCode: "pass", expectedOutput: "Hello Maria! Welcome!" } ]
    },
    // --- MINI PROJECT: CALCULATOR ---
    {
        level: 41,
        title: "Calculator: Addition",
        explanation: "Let's start building a calculator! We will create a separate function for each operation.",
        example: "```python\n# This is what we are aiming for!\ndef add(a, b):\n    return a + b\n```",
        task: "Create a function named `add` that takes two numbers, `num1` and `num2`, as arguments and returns their sum.",
        initialCode: "def add(num1, num2):\n    # Your code here\n    pass\n\nprint(add(5, 3))\nprint(add(-1, 10))",
        coinReward: 1,
        testCases: [
            { description: "Adds 5 and 3", testCode: "pass", expectedOutput: "8" },
            { description: "Adds -1 and 10", testCode: "pass", expectedOutput: "9" }
        ]
    },
    {
        level: 42,
        title: "Calculator: Subtraction",
        explanation: "Next, let's add the subtraction functionality to our calculator.",
        example: "```python\n# We will add this function to our calculator.\ndef subtract(a, b):\n    return a - b\n```",
        task: "Create a function named `subtract` that takes two numbers, `num1` and `num2`, and returns the result of `num1` minus `num2`.",
        initialCode: "def subtract(num1, num2):\n    # Your code here\n    pass\n\nprint(subtract(10, 3))\nprint(subtract(5, 5))",
        testCases: [
            { description: "Subtracts 3 from 10", testCode: "pass", expectedOutput: "7" },
            { description: "Subtracts 5 from 5", testCode: "pass", expectedOutput: "0" }
        ]
    },
    {
        level: 43,
        title: "Calculator: Multiplication",
        explanation: "Now for multiplication. The multiplication operator in Python is `*`.",
        example: "```python\n# Adding multiplication.\ndef multiply(a, b):\n    return a * b\n```",
        task: "Create a function named `multiply` that takes two numbers, `num1` and `num2`, and returns their product.",
        initialCode: "def multiply(num1, num2):\n    # Your code here\n    pass\n\nprint(multiply(4, 6))\nprint(multiply(7, 0))",
        testCases: [
            { description: "Multiplies 4 and 6", testCode: "pass", expectedOutput: "24" },
            { description: "Multiplies 7 and 0", testCode: "pass", expectedOutput: "0" }
        ]
    },
    {
        level: 44,
        title: "Calculator: Division",
        explanation: "Finally, let's add division. Remember to handle cases where division by zero might occur.",
        example: "```python\n# The final arithmetic operation.\ndef divide(a, b):\n    if b == 0:\n        return \"Error! Division by zero.\"\n    return a / b\n```",
        task: "Create a function named `divide`. If the second number `num2` is 0, it should return the string 'Error! Cannot divide by zero'. Otherwise, it should return `num1` divided by `num2`.",
        initialCode: "def divide(num1, num2):\n    # Your code here\n    pass\n\nprint(divide(20, 4))\nprint(divide(10, 0))",
        testCases: [
            { description: "Divides 20 by 4", testCode: "pass", expectedOutput: "5.0" },
            { description: "Handles division by zero", testCode: "pass", expectedOutput: "Error! Cannot divide by zero" }
        ]
    },
    {
        level: 45,
        title: "Calculator: Putting it Together",
        explanation: "Now we'll create a main function to act as the interface for our calculator. It will take the numbers and the operator as input and call the correct function.",
        example: "```python\n# The main calculator logic will live here.\ndef calculate(num1, op, num2):\n    # ... logic to call add, subtract etc.\n```",
        task: "Create a function `calculate(num1, operator, num2)`. Based on the `operator` string ('+', '-', '*', '/'), it should call the correct function (`add`, `subtract`, etc.) and return the result. Assume the other functions are already defined.",
        initialCode: "def add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b):\n    if b == 0: return \"Error! Cannot divide by zero\"\n    return a / b\n\ndef calculate(num1, operator, num2):\n    # Your code here\n    pass\n\nprint(calculate(10, '+', 5))\nprint(calculate(10, '-', 5))\nprint(calculate(10, '*', 5))\nprint(calculate(10, '/', 5))",
        coinReward: 1,
        testCases: [
            { description: "Performs addition", testCode: "pass", expectedOutput: "15" },
            { description: "Performs subtraction", testCode: "pass", expectedOutput: "5" },
            { description: "Performs multiplication", testCode: "pass", expectedOutput: "50" },
            { description: "Performs division", testCode: "pass", expectedOutput: "2.0" }
        ]
    },
    {
        level: 50,
        title: "Hero Level: Full Calculator",
        explanation: "Congratulations! You've reached the final level. Let's make the calculator interactive. We'll use a loop to keep the calculator running until the user wants to exit.",
        example: "```python\ndef summarize_scores(scores_dict):\n    print(\"--- SCORE SUMMARY ---\")\n    for student, score in scores_dict.items():\n        if score >= 90:\n            grade = \"A\"\n        elif score >= 80:\n            grade = \"B\"\n        else:\n            grade = \"C\"\n        print(f\"{student}: {score} (Grade {grade})\")\n\nscores = {\"Alice\": 95, \"Bob\": 82, \"Charlie\": 75}\nsummarize_scores(scores)\n```",
        task: "This final task is a challenge and won't be auto-graded. Modify the code to create a loop that repeatedly asks the user for a number, an operator, and another number, then prints the result. The loop should stop if the user types 'exit'. Well done on completing the course!",
        initialCode: "# All your functions from previous levels go here\ndef add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b):\n    if b == 0: return \"Error\"\n    return a / b\n\ndef calculate(num1, op, num2):\n    if op == '+': return add(num1, num2)\n    if op == '-': return subtract(num1, num2)\n    if op == '*': return multiply(num1, num2)\n    if op == '/': return divide(num1, num2)\n\n# Main loop - try it out!\n# This part is for you to experiment with.\n# Run it and see what happens in the console.\n\nprint(\"Welcome to the Python Calculator!\")\nprint(\"Enter 'exit' to quit.\")\n\n# while True:\n#     num1_input = input(\"Enter first number: \")\n#     if num1_input == 'exit':\n#         break\n#     op_input = input(\"Enter operator (+, -, *, /): \")\n#     num2_input = input(\"Enter second number: \")\n\n#     result = calculate(int(num1_input), op_input, int(num2_input))\n#     print(f\"The result is: {result}\")\n",
        coinReward: 1,
        badge: {
            name: "Python Hero",
            icon: 'GrandMasterTrophy'
        },
        testCases: [
            { description: "Completion", testCode: "print(\"You are a Python Hero!\")", expectedOutput: "You are a Python Hero!" }
        ]
    }
];

const intermediateLevels: PythonChallenge[] = [
    {
        level: 36, title: "Review: Lists and Loops",
        explanation: "Let's combine what we've learned about lists and loops.",
        example: "```python\noriginal = [1, 2, 3]\ndoubled = []\nfor number in original:\n    doubled.append(number * 2)\nprint(doubled) # Output: [2, 4, 6]\n```",
        task: "Given a list of numbers, create a new list containing only the even numbers, then print the new list.",
        initialCode: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_numbers = []\n# Loop through numbers and append even numbers to the new list\n\nprint(even_numbers)\n",
        testCases: [{ description: "Filters for even numbers", testCode: "pass", expectedOutput: "[2, 4, 6, 8, 10]" }]
    },
    {
        level: 37, title: "Review: Dictionaries",
        explanation: "Practice makes perfect. Let's work with dictionaries again.",
        example: "```python\nstudent = {'name': 'Anna', 'score': 95}\nif 'score' in student:\n    print(f\"Anna's score is {student['score']}\")\n```",
        task: "Given a dictionary, print the value for the key 'country'. If the key does not exist, print 'Unknown'.",
        initialCode: "user_data = {'name': 'John', 'age': 30}\n# Check for 'country' and print the value or 'Unknown'\nif 'country' in user_data:\n    print(user_data['country'])\nelse:\n    print('Unknown')",
        coinReward: 1,
        testCases: [{ description: "Handles missing key", testCode: "pass", expectedOutput: "Unknown" }]
    },
    {
        level: 38, title: "Function Scope",
        explanation: "Variables defined inside a function (local scope) are not accessible outside of it. Variables defined outside (global scope) are accessible inside.",
        example: "```python\nx = 10 # global\ndef my_function():\n    y = 20 # local\n    print(x) # can access global x\n    print(y)\n\nmy_function()\n# print(y) # This would cause an error\n```",
        task: "Call the `show_message` function to correctly print the `local_message`.",
        initialCode: "global_message = \"I am global\"\ndef show_message():\n    local_message = \"I am local\"\n    print(local_message)\n\n# Call the function to print the local message.\n",
        testCases: [{ description: "Correctly handles scope", testCode: "pass", expectedOutput: "I am local" }]
    },
    {
        level: 39, title: "List Slicing",
        explanation: "Slicing allows you to get a sub-section of a list. The syntax is `my_list[start:end]`.",
        example: "```python\nnumbers = [0, 10, 20, 30, 40, 50]\n# Get items from index 2 up to (but not including) index 5\nsubset = numbers[2:5]\nprint(subset) # Output: [20, 30, 40]\n```",
        task: "From the `letters` list, get a new list containing the 2nd, 3rd, and 4th items ('b', 'c', 'd') using slicing and print it.",
        initialCode: "letters = ['a', 'b', 'c', 'd', 'e', 'f']\n# Get the slice and print it\n",
        testCases: [{ description: "Slices a list", testCode: "pass", expectedOutput: "['b', 'c', 'd']" }]
    },
    {
        level: 40, title: "Function Challenge",
        explanation: "Let's write a more complex function.",
        example: "```python\ndef is_even(number):\n    if number % 2 == 0:\n        return True\n    else:\n        return False\n\nprint(is_even(10)) # True\nprint(is_even(7))  # False\n```",
        task: "Write a function `find_max` that takes a list of numbers and returns the largest number in the list. Do not use the built-in `max()` function.",
        initialCode: "def find_max(numbers):\n    # Your code here\n    pass\n\nprint(find_max([1, 5, 2, 9, 3]))",
        testCases: [{ description: "Finds the max number", testCode: "pass", expectedOutput: "9" }]
    },
    {
        level: 46, title: "Calculator: User Input",
        explanation: "A real calculator needs user input. Let's use the `input()` function to get the numbers and operator from the user.",
        example: "```python\n# The input() function returns a string, so we need int()\nnum1_str = input(\"Enter first number: \")\nnum2_str = input(\"Enter second number: \")\nresult = int(num1_str) + int(num2_str)\nprint(f\"The sum is: {result}\")\n```",
        task: "Using your `calculate` function, get two numbers and an operator from the user and print the result. The test will simulate inputs '10', '+', '20'.",
        initialCode: "def calculate(n1, op, n2):\n    if op == '+': return n1 + n2\n    # For this exercise, you only need to handle addition.\n    return 'Invalid op'\n\n# Your code here\n# Get two numbers and an operator (the test will provide them)\n# and print the result of calling the calculate function.\n",
        testCases: [{ description: "Handles simulated user input", testCode: "pass", expectedOutput: "30" }]
    },
    {
        level: 47, title: "Calculator: Main Loop",
        explanation: "To make the calculator run continuously, we can wrap the input and calculation logic in a `while True` loop.",
        example: "```python\nwhile True:\n    command = input(\"Type 'exit' to stop: \")\n    if command == \"exit\":\n        print(\"Loop finished!\")\n        break\n    print(\"Looping...\")\n```",
        task: "This is a conceptual task. The code shows how a main loop would work. Add a check so if the user enters 'q' as the operator, the loop breaks using the `break` keyword.",
        initialCode: "# This is a conceptual example\n# You would put this logic inside a `while True:` loop\ndef calculator_loop(operator):\n    if operator == 'q':\n        print(\"Exiting\")\n        # In a real loop, you'd use 'break' here\n    else:\n        print(\"Calculating...\")\n\n# Try calling the function with '+' and 'q' to see what happens.\ncalculator_loop('+')\ncalculator_loop('q')",
        coinReward: 1,
        testCases: [{ description: "Understands the loop exit condition", testCode: "pass", expectedOutput: "Calculating...\nExiting" }]
    },
    {
        level: 48, title: "Calculator: Error Handling",
        explanation: "What if the user enters text instead of a number? Our `int()` conversion will crash. We can use a `try-except` block to handle potential errors gracefully.",
        example: "```python\ntry:\n    number = int(\"hello\") # This will fail\n    print(\"Success!\")\nexcept ValueError:\n    print(\"That was not a valid number.\")\n```",
        task: "Wrap the `int()` conversion in a `try-except` block. If it fails (a `ValueError`), print 'Invalid number'.",
        initialCode: "user_input = \"abc\"\ntry:\n    # Try to convert user_input to an integer and print it\n    pass\nexcept ValueError:\n    # Print 'Invalid number' if the conversion fails\n    pass\n",
        testCases: [{ description: "Handles invalid number input", testCode: "pass", expectedOutput: "Invalid number" }]
    },
    {
        level: 49, title: "Final Review",
        explanation: "You've learned about variables, data types, lists, loops, dictionaries, and functions. You've built the logic for a complete calculator.",
        example: "```python\ndef reverse_string(s):\n    reversed_s = \"\"\n    for char in s:\n        reversed_s = char + reversed_s\n    return reversed_s\n\nprint(reverse_string(\"Python\")) # \"nohtyP\"\n```",
        task: "Write a function that takes a list of strings and returns a dictionary counting the frequency of each string.",
        initialCode: "def count_frequency(items):\n    # Your code here\n    pass\n\nitems_to_count = ['apple', 'banana', 'apple']\n# Call your function with items_to_count and print the result\n",
        testCases: [{ description: "Counts item frequency", testCode: "pass", expectedOutput: "{'apple': 2, 'banana': 1}" }]
    }
];

const allChallenges = [...initialChallenges, ...intermediateLevels];
allChallenges.sort((a, b) => a.level - b.level);

// A simple fix to ensure all challenges have initialCode.
allChallenges.forEach(challenge => {
    if (challenge.initialCode === undefined) {
        challenge.initialCode = "";
    }
});


export const PYTHON_CHALLENGES: PythonChallenge[] = allChallenges;
