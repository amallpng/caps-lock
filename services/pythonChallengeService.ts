import type { BadgeIcons } from '../components/icons/BadgeIcons';

export interface PythonChallenge {
  level: number;
  title: string;
  question: string;
  codeSnippet?: string | null;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  example?: string | null;
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
        question: "Which line of code correctly prints the text 'Hello, Python!' to the console?",
        options: [
            "print('Hello, Python!')",
            "console.log('Hello, Python!')",
            "print \"Hello, Python!\"",
            "echo 'Hello, Python!'"
        ],
        correctAnswerIndex: 0,
        explanation: "In Python, the `print()` function is used to output text to the console. The text you want to print (a 'string') should be enclosed in single (' ') or double (\" \") quotes.",
        example: `print("This is a simple example.")\nprint('You can use single quotes too.')`,
        coinReward: 1
    },
    {
        level: 2,
        title: "Variables",
        question: "Which option correctly creates a variable named `message` and assigns it the string 'Learning is fun'?",
        options: [
            "let message = 'Learning is fun'",
            "message = 'Learning is fun'",
            "String message = 'Learning is fun'",
            "message: 'Learning is fun'"
        ],
        correctAnswerIndex: 1,
        explanation: "Python is dynamically typed, which means you don't need to declare the type of a variable. You simply use the variable name, followed by the assignment operator (`=`), and then the value.",
        example: `user_name = "Alice"\nuser_age = 30\nprint(user_name)\nprint(user_age)`,
        coinReward: 0
    },
    {
        level: 3,
        title: "Basic Arithmetic",
        question: "What is the result of the expression `10 + 5 * 3` in Python?",
        options: [
            "45",
            "25",
            "18",
            "30"
        ],
        correctAnswerIndex: 1,
        explanation: "Python follows the standard order of operations (PEMDAS/BODMAS). Multiplication (`*`) is performed before addition (`+`). So, `5 * 3` is calculated first (15), and then `10` is added to the result, giving `25`.",
        example: `# Parentheses can be used to change the order\nresult = (10 + 5) * 3 # result will be 45\nprint(result)`,
        coinReward: 1
    },
    {
        level: 4,
        title: "String Concatenation",
        question: "What will be printed by the following code?",
        codeSnippet: "part1 = \"Python\"\npart2 = \"Rocks\"\nprint(part1 + part2)",
        options: [
            "Python Rocks",
            "PythonRocks",
            "Python + Rocks",
            "An error will occur"
        ],
        correctAnswerIndex: 1,
        explanation: "The `+` operator can be used to concatenate (join) strings in Python. It joins them directly without adding any spaces. To add a space, you would need to include it, like `print(part1 + ' ' + part2)`.",
        example: `greeting = "Hi there, "\nname = "Casey"\nwelcome_message = greeting + name\nprint(welcome_message) # Output: Hi there, Casey`,
        coinReward: 0
    },
    {
        level: 5,
        title: "Data Types",
        question: "What is the data type of the value `12.5` in Python?",
        options: [
            "integer",
            "string",
            "float",
            "boolean"
        ],
        correctAnswerIndex: 2,
        explanation: "In Python, numbers with a decimal point are called 'floats' (floating-point numbers). 'Integers' are whole numbers without a decimal part.",
        example: `my_integer = 100\nmy_float = 3.14\nmy_string = "Hello!"\nmy_boolean = True\n\nprint(type(my_float)) # Output: <class 'float'>`,
        coinReward: 0
    },
    {
        level: 6,
        title: "Lists",
        question: "How do you access the third item in a list called `my_list`?",
        options: [
            "my_list[3]",
            "my_list(2)",
            "my_list.get(3)",
            "my_list[2]"
        ],
        correctAnswerIndex: 3,
        explanation: "Python uses zero-based indexing for lists. This means the first item is at index 0, the second at index 1, and the third at index 2. We use square brackets `[]` to access items by their index.",
        example: `fruits = ["apple", "banana", "cherry"]\nfirst_fruit = fruits[0] # "apple"\nlast_fruit = fruits[-1] # "cherry"\nprint(first_fruit)`,
        coinReward: 0
    },
    {
        level: 7,
        title: "List Methods: append()",
        question: "Which line of code adds the number 50 to the end of the `numbers` list?",
        codeSnippet: "numbers = [10, 20, 30, 40]",
        options: [
            "numbers.add(50)",
            "numbers.push(50)",
            "numbers.append(50)",
            "numbers + 50"
        ],
        correctAnswerIndex: 2,
        explanation: "Lists in Python have a built-in method called `.append()` which is used to add a single item to the very end of the list.",
        example: `my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list) # Output: [1, 2, 3, 4]`,
        coinReward: 0
    },
    {
        level: 8,
        title: "For Loops",
        question: "What will this `for` loop output?",
        codeSnippet: "for i in [1, 2, 3]:\n    print(i)",
        options: [
            "1 2 3",
            "i i i",
            "1\n2\n3",
            "An error will occur"
        ],
        correctAnswerIndex: 2,
        explanation: "A `for` loop iterates over each item in a sequence (like a list). In each iteration, the variable `i` takes the value of the current item, and the `print(i)` function is called, which prints each number on a new line.",
        // FIX: Escaped template literal placeholder to prevent TS interpolation.
        example: `colors = ["red", "green", "blue"]\nfor color in colors:\n    print(f"I like the color \${color}")`,
        coinReward: 1
    },
    {
        level: 9,
        title: "Conditional Logic (if/else)",
        question: "What will the following code snippet output?",
        codeSnippet: "temperature = 25\nif temperature > 30:\n    print('It is hot')\nelse:\n    print('It is not hot')",
        options: [
            "It is hot",
            "It is not hot",
            "Nothing will be printed",
            "An error will occur"
        ],
        correctAnswerIndex: 1,
        explanation: "The `if` condition `temperature > 30` is checked. Since `25` is not greater than `30`, the condition is false. The program then executes the code inside the `else` block.",
        example: `age = 17\nif age >= 18:\n    print("You are an adult.")\nelse:\n    print("You are a minor.")`,
        coinReward: 0
    },
    {
        level: 10,
        title: "Milestone: Python Apprentice",
        question: "What is the output of this code that combines a loop and a conditional?",
        codeSnippet: "numbers = [10, 55, 30, 80]\nfor num in numbers:\n    if num > 50:\n        print(num)",
        options: [
            "10\n30",
            "55\n80",
            "10\n55\n30\n80",
            "55"
        ],
        correctAnswerIndex: 1,
        explanation: "The loop iterates through each number in the list. For each number, the `if` statement checks if it's greater than 50. Only `55` and `80` satisfy this condition, so only they are printed.",
        example: `scores = [88, 92, 75, 59, 95]\npassing_scores = []\nfor score in scores:\n    if score > 60:\n        passing_scores.append(score)\nprint(passing_scores) # Output: [88, 92, 75, 95]`,
        coinReward: 1,
        badge: { name: "Python Apprentice", icon: 'LevelBadge10' }
    },
    // Levels 11-20
    {
        level: 11,
        title: "More Conditionals (elif)",
        question: "Given `score = 85`, what grade will be printed?",
        codeSnippet: "if score > 90:\n    print('Grade A')\nelif score > 80:\n    print('Grade B')\nelse:\n    print('Grade C')",
        options: ["Grade A", "Grade B", "Grade C", "Grade A\nGrade B"],
        correctAnswerIndex: 1,
        explanation: "The `if` condition (`85 > 90`) is false. The program moves to the `elif` (else if) condition (`85 > 80`), which is true. The code inside this block is executed, and the rest of the chain (`else`) is skipped.",
        example: `num = 0\nif num > 0:\n    print("Positive")\nelif num < 0:\n    print("Negative")\nelse:\n    print("Zero")`,
        coinReward: 0
    },
    {
        level: 12,
        title: "Comparison Operators",
        question: "Which operator is used to check if two values are equal?",
        options: ["=", "==", "===", "!="],
        correctAnswerIndex: 1,
        explanation: "In Python, a single equals sign (`=`) is for assignment. To check for equality, you must use the double equals sign (`==`).",
        example: `a = 5\nb = 5\nif a == b:\n    print("a is equal to b")`,
        coinReward: 0
    },
    {
        level: 13,
        title: "Logical Operators",
        question: "For the expression `x > 10 and y < 5` to be True, what must be the case?",
        options: [
            "Only one condition must be true",
            "Both conditions must be true",
            "At least one condition must be false",
            "Both conditions must be false"
        ],
        correctAnswerIndex: 1,
        explanation: "The logical operator `and` requires both the condition on its left and the condition on its right to be true for the entire expression to evaluate to True.",
        example: `age = 25\nhas_license = True\nif age > 18 and has_license:\n    print("Allowed to drive")`,
        coinReward: 0
    },
    {
        level: 14,
        title: "Type Conversion",
        question: "You have a variable `age_str = \"25\"`. How do you convert it to an integer?",
        options: ["int(age_str)", "integer(age_str)", "age_str.to_int()", "parse(age_str)"],
        correctAnswerIndex: 0,
        explanation: "Python has built-in functions like `int()`, `float()`, and `str()` to convert values between different data types.",
        example: `num_string = "123"\nnum_integer = int(num_string)\nresult = num_integer + 10\nprint(result) # Output: 133`,
        coinReward: 0
    },
    {
        level: 15,
        title: "Dictionaries",
        question: "How do you get the value associated with the key 'city'?",
        codeSnippet: "person = {\"name\": \"John\", \"city\": \"New York\"}",
        options: ["person.city", "person('city')", "person['city']", "person.get('city')"],
        correctAnswerIndex: 2,
        explanation: "Dictionaries store data in key-value pairs. You access a value by putting its corresponding key inside square brackets `[]`.",
        example: `car = {"brand": "Ford", "model": "Mustang", "year": 1964}\nprint(car["brand"]) # Output: Ford`,
        coinReward: 1
    },
    {
        level: 16,
        title: "Modifying Dictionaries",
        question: "Which line of code adds a new key 'job' with the value 'Engineer' to the `person` dictionary?",
        options: [
            "person.add('job', 'Engineer')",
            "person['job'] = 'Engineer'",
            "person.job = 'Engineer'",
            "person.update({'job': 'Engineer'})"
        ],
        correctAnswerIndex: 1,
        explanation: "To add or update an item in a dictionary, you use the square bracket notation with the key and assign it a new value.",
        example: `student = {"name": "Alex"}\nstudent["grade"] = "A"\nprint(student) # Output: {'name': 'Alex', 'grade': 'A'}`,
        coinReward: 0
    },
    {
        level: 17,
        title: "While Loops",
        question: "How many times will the following loop print 'Hello'?",
        codeSnippet: "count = 0\nwhile count < 5:\n    print('Hello')\n    count += 1",
        options: ["4", "5", "6", "It will run forever"],
        correctAnswerIndex: 1,
        explanation: "The `while` loop continues as long as its condition (`count < 5`) is true. The loop runs for `count` values 0, 1, 2, 3, and 4. When `count` becomes 5, the condition is false, and the loop stops. This is a total of 5 iterations.",
        example: `i = 1\nwhile i <= 3:\n    print(f"Loop iteration {i}")\n    i += 1`,
        coinReward: 0
    },
    {
        level: 18,
        title: "Slicing Strings",
        question: "What is the result of `\"Python\"[1:4]`?",
        options: ["'Pyth'", "'yth'", "'ytho'", "'tho'"],
        correctAnswerIndex: 1,
        explanation: "Slicing extracts a part of a sequence. The syntax is `[start:end]`. The `start` index is inclusive, and the `end` index is exclusive. So, it gets characters at index 1 ('y'), 2 ('t'), and 3 ('h').",
        example: `word = "Programming"\n# Get characters from index 3 up to (but not including) 7\nprint(word[3:7]) # Output: "gram"`,
        coinReward: 0
    },
    {
        level: 19,
        title: "Slicing Lists",
        question: "What will `letters[2:]` produce?",
        codeSnippet: "letters = ['a', 'b', 'c', 'd', 'e']",
        options: ["['c', 'd', 'e']", "['b', 'c']", "['a', 'b']", "['d', 'e']"],
        correctAnswerIndex: 0,
        explanation: "When you omit the `end` index in a slice (`[start:]`), it goes from the `start` index all the way to the end of the list. Here, it starts at index 2 ('c') and includes everything after it.",
        example: `numbers = [0, 1, 2, 3, 4, 5, 6]\n# Get a slice from the beginning up to index 3\nprint(numbers[:4]) # Output: [0, 1, 2, 3]`,
        coinReward: 0
    },
    {
        level: 20,
        title: "Milestone: Data Wrangler",
        question: "What is the purpose of the `.items()` method when looping through a dictionary?",
        options: [
            "It returns a list of all the values.",
            "It returns a list of all the keys.",
            "It returns key-value pairs, which can be unpacked into two variables.",
            "It sorts the dictionary items alphabetically."
        ],
        correctAnswerIndex: 2,
        explanation: "The `.items()` method is very useful for looping because it provides both the key and the value in each iteration. For example: `for key, value in my_dict.items():`",
        example: `capitals = {"USA": "Washington D.C.", "France": "Paris"}\nfor country, capital in capitals.items():\n    print(f"The capital of {country} is {capital}.")`,
        coinReward: 0,
        badge: { name: "Data Wrangler", icon: 'LevelBadge20' }
    },
    // Levels 21-30
    {
        level: 21,
        title: "Functions",
        question: "What keyword is used to define a new function in Python?",
        options: ["function", "def", "fun", "define"],
        correctAnswerIndex: 1,
        explanation: "The `def` keyword, short for 'define', is used to start a function definition in Python. It is followed by the function name and parentheses.",
        example: `def say_hello():\n    print("Hello from a function!")\n\nsay_hello() # Call the function`,
        coinReward: 0
    },
    {
        level: 22,
        title: "Function Arguments",
        question: "What will be printed by this code?",
        codeSnippet: "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Bob\")",
        options: ["Hello, {name}!", "Hello, name!", "Hello, Bob!", "An error will occur"],
        correctAnswerIndex: 2,
        explanation: "When the `greet` function is called with the argument \"Bob\", the value \"Bob\" is assigned to the `name` parameter inside the function. The f-string then uses this value to construct the final output.",
        // FIX: Escaped template literal placeholder to prevent TS interpolation.
        example: `def add_numbers(a, b):\n    result = a + b\n    print(f"The sum is: \${result}")\n\nadd_numbers(5, 10)`,
        coinReward: 1
    },
    {
        level: 23,
        title: "Function Return Values",
        question: "What keyword is used to send a value back from a function?",
        options: ["send", "give", "return", "output"],
        correctAnswerIndex: 2,
        explanation: "The `return` keyword exits a function and optionally passes a value back to the code that called it. This allows you to store the result of a function in a variable.",
        example: `def multiply(x, y):\n    return x * y\n\nproduct = multiply(4, 5)\nprint(product) # Output: 20`,
        coinReward: 0
    },
    {
        level: 24,
        title: "String Methods: upper()",
        question: "What is the output of `\"Python\".upper()`?",
        options: ["'python'", "'PYTHON'", "'pYTHON'", "An error will occur"],
        correctAnswerIndex: 1,
        explanation: "The `.upper()` string method returns a new string where all the characters of the original string are converted to uppercase.",
        example: `message = "this is a test"\nprint(message.upper()) # Output: THIS IS A TEST`,
        coinReward: 1
    },
    {
        level: 25,
        title: "f-Strings",
        question: "Which of these is the correct syntax for an f-string?",
        options: [
            "f\"My name is {name}\"",
            "\"My name is f{name}\"",
            "\"My name is {name}\".f",
            "\"My name is \" + f(name)"
        ],
        correctAnswerIndex: 0,
        explanation: "f-Strings (formatted string literals) are a modern way to embed expressions inside string literals. You prefix the string with an `f` and write expressions inside curly braces `{}`.",
        // FIX: Defined missing variable `cost` and escaped template literal placeholders.
        example: `item = "book"\ncost = 15\nprint(f"The \${item} costs \\$\${cost}.")`,
        coinReward: 1
    },
    {
        level: 26,
        title: "The len() function",
        question: "What will `len([10, 20, 30])` return?",
        options: ["60", "3", "30", "The list itself"],
        correctAnswerIndex: 1,
        explanation: "The built-in `len()` function returns the number of items in an object, whether it's a list, string, tuple, or dictionary. The list `[10, 20, 30]` contains 3 items.",
        example: `my_name = "David"\nprint(len(my_name)) # Output: 5`,
        coinReward: 0
    },
    {
        level: 27,
        title: "Finding in Strings",
        question: "What is the result of the expression `'fox' in 'the big dog'`?",
        options: ["True", "False", "1", "An error will occur"],
        correctAnswerIndex: 1,
        explanation: "The `in` operator checks for membership. It returns `True` if a sequence is found within another sequence, and `False` otherwise. The string 'fox' is not present in 'the big dog'.",
        example: `if "apple" in ["orange", "banana", "apple"]:\n    print("Found an apple!")`,
        coinReward: 0
    },
    {
        level: 28,
        title: "Replacing in Strings",
        question: "What will `\"Hello\".replace('l', 'p')` return?",
        options: ["'Heppo'", "'Heplo'", "'Helpo'", "'Heppo'"],
        correctAnswerIndex: 0,
        explanation: "The `.replace()` method returns a new string where all occurrences of a specified substring are replaced with another. In this case, both 'l's are replaced with 'p's.",
        example: `sentence = "I like cats."\nnew_sentence = sentence.replace("cats", "dogs")\nprint(new_sentence) # Output: I like dogs.`,
        coinReward: 0
    },
    {
        level: 29,
        title: "Splitting Strings",
        question: "What does `\"A-B-C\".split('-')` produce?",
        options: ["['A', 'B', 'C']", "('A', 'B', 'C')", "'ABC'", "['A-B-C']"],
        correctAnswerIndex: 0,
        explanation: "The `.split()` method breaks a string into a list of smaller strings, using the specified delimiter as the separator. Here, it splits the string at each hyphen `-`.",
        example: `csv_data = "John,Doe,30"\nfields = csv_data.split(',')\nprint(fields) # Output: ['John', 'Doe', '30']`,
        coinReward: 0
    },
    {
        level: 30,
        title: "Milestone: Function Virtuoso",
        question: "What is a key benefit of using functions in your code?",
        options: [
            "They make your code run faster.",
            "They are the only way to use loops.",
            "They allow you to reuse code instead of writing it multiple times.",
            "They automatically handle errors."
        ],
        correctAnswerIndex: 2,
        explanation: "Functions help you organize code into logical blocks. This makes your code more readable, easier to debug, and allows you to call the same block of code from multiple places without repeating yourself (the DRY principle: Don't Repeat Yourself).",
        // FIX: Escaped template literal placeholder to prevent TS interpolation.
        example: `# Without a function\nprint("Welcome, Alice!")\nprint("Have a great day!")\n\nprint("Welcome, Bob!")\nprint("Have a great day!")\n\n# With a function (reusable)\ndef greet(name):\n    print(f"Welcome, \${name}!")\n    print("Have a great day!")\n\ngreet("Alice")\ngreet("Bob")`,
        coinReward: 1,
        badge: { name: "Function Virtuoso", icon: 'LevelBadge30' }
    },
    // Levels 31-40
    {
        level: 31,
        title: "Tuples",
        question: "What is the main difference between a tuple and a list?",
        options: [
            "Tuples are mutable, lists are immutable.",
            "Tuples can store mixed data types, lists cannot.",
            "Tuples are immutable, lists are mutable.",
            "There is no difference."
        ],
        correctAnswerIndex: 2,
        explanation: "A key feature of tuples (defined with `()`) is that they are immutable, meaning their contents cannot be changed after creation. Lists (defined with `[]`) are mutable, so you can add, remove, or change items.",
        example: `point = (10, 20) # A tuple representing coordinates\nprint(point[0]) # Accessing elements\n# point[0] = 15 would cause an error!`,
        coinReward: 0
    },
    {
        level: 32,
        title: "Sets",
        question: "What will be the output of this code?",
        codeSnippet: "my_set = {1, 2, 3, 3, 2}\nprint(my_set)",
        options: ["{1, 2, 3, 3, 2}", "{1, 2, 3}", "[1, 2, 3]", "An error will occur"],
        correctAnswerIndex: 1,
        explanation: "Sets are unordered collections of unique items. When you create a set with duplicate values, the duplicates are automatically removed.",
        example: `unique_numbers = {10, 20, 30, 20, 10}\nprint(len(unique_numbers)) # Output: 3`,
        coinReward: 0
    },
    {
        level: 33,
        title: "Iterating Dictionaries",
        question: "What will `person.keys()` return?",
        codeSnippet: "person = {\"name\": \"John\", \"age\": 30}",
        options: ["dict_keys(['name', 'age'])", "dict_values(['John', 30])", "['name', 'age']", "('name', 'age')"],
        correctAnswerIndex: 0,
        explanation: "The `.keys()` method returns a view object that displays a list of all the keys in the dictionary. Similarly, `.values()` returns the values, and `.items()` returns key-value pairs.",
        example: `car = {"brand": "Ford", "model": "Mustang"}\nfor key in car.keys():\n    print(key)`,
        coinReward: 0
    },
    {
        level: 34,
        title: "Nested Lists",
        question: "How do you access the number 8 in the `matrix`?",
        codeSnippet: "matrix = [[1, 2], [3, 4], [7, 8]]",
        options: ["matrix[2][1]", "matrix[1][2]", "matrix[3][2]", "matrix[8]"],
        correctAnswerIndex: 0,
        explanation: "For nested lists (a list of lists), you use multiple indices. The first index selects the inner list (`matrix[2]` gets `[7, 8]`), and the second index selects the item within that inner list (`[1]` gets `8`).",
        example: `grid = [[ 'X', 'O', 'X' ], [ 'O', 'X', 'O' ]]\n# Change the center 'X' to 'O'\ngrid[1][1] = 'O'`,
        coinReward: 1
    },
    {
        level: 35,
        title: "List Comprehensions",
        question: "Which list comprehension will create a list of squares for numbers 0, 1, 2?",
        options: [
            "[x*x for x in [0, 1, 2]]",
            "(x*x for x in [0, 1, 2])",
            "[for x in [0, 1, 2] do x*x]",
            "{x*x for x in [0, 1, 2]}"
        ],
        correctAnswerIndex: 0,
        explanation: "List comprehensions provide a concise way to create lists. The syntax is `[expression for item in iterable]`. Here, `x*x` is the expression applied to each `x` in the list `[0, 1, 2]`.",
        example: `# Traditional for loop\neven_numbers = []\nfor i in range(10):\n    if i % 2 == 0:\n        even_numbers.append(i)\n\n# List comprehension (more concise)\neven_numbers_comp = [i for i in range(10) if i % 2 == 0]`,
        coinReward: 0
    },
    {
        level: 36,
        title: "Importing Modules",
        question: "How do you correctly import the `math` module?",
        options: ["using math;", "#include <math>", "import math;", "import math"],
        correctAnswerIndex: 3,
        explanation: "The `import` statement is used to bring modules or packages into the current scope, allowing you to use their functions and variables. For example, after `import math`, you can use `math.sqrt()`.",
        example: `import math\n\n# Calculate the square root of 16\nprint(math.sqrt(16)) # Output: 4.0`,
        coinReward: 0
    },
    {
        level: 37,
        title: "The `random` module",
        question: "Which function from the `random` module would you use to pick a random item from a list?",
        options: ["random.randint()", "random.choice()", "random.pick()", "random.select()"],
        correctAnswerIndex: 1,
        explanation: "`random.choice(sequence)` returns a randomly selected element from a non-empty sequence (like a list or a string). `random.randint(a, b)` is used for getting a random integer.",
        // FIX: Escaped template literal placeholder to prevent TS interpolation.
        example: `import random\n\noptions = ["rock", "paper", "scissors"]\ncomputer_choice = random.choice(options)\nprint(f"Computer chose: \${computer_choice}")`,
        coinReward: 0
    },
    {
        level: 38,
        title: "Error Handling (try/except)",
        question: "If an error occurs inside a `try` block, what happens next?",
        options: [
            "The program crashes immediately.",
            "The code inside the matching `except` block is executed.",
            "The `try` block is executed again.",
            "Nothing, the error is ignored."
        ],
        correctAnswerIndex: 1,
        explanation: "The `try...except` block is used for error handling. Python runs the code in the `try` block. If an error (exception) occurs, it stops and jumps to the `except` block, preventing the program from crashing.",
        example: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("You can't divide by zero!")`,
        coinReward: 1
    },
    {
        level: 39,
        title: "Comments",
        question: "Which symbol is used to start a single-line comment in Python?",
        options: ["//", "/*", "#", "--"],
        correctAnswerIndex: 2,
        explanation: "In Python, the hash symbol (`#`) is used to start a comment. The interpreter ignores everything from the `#` to the end of that line. This is useful for explaining code.",
        example: `# This is a comment to explain the next line\nuser_age = 25 # This is an inline comment`,
        coinReward: 0
    },
    {
        level: 40,
        title: "Milestone: Module Master",
        question: "Why are Python modules useful?",
        options: [
            "They change the color of your code editor.",
            "They provide pre-written code to add functionality, so you don't have to write it yourself.",
            "They are required for every Python script to run.",
            "They automatically fix bugs in your code."
        ],
        correctAnswerIndex: 1,
        explanation: "Modules are files containing Python definitions and statements. They allow you to logically organize your Python code. More importantly, you can import powerful, pre-built modules like `math`, `random`, or `datetime` to solve complex problems without reinventing the wheel.",
        // FIX: Escaped template literal placeholder to prevent TS interpolation.
        example: `import datetime\n\ncurrent_time = datetime.datetime.now()\nprint(f"The current date and time is: \${current_time}")`,
        coinReward: 1,
        badge: { name: "Module Master", icon: 'LevelBadge40' }
    },
    // Levels 41-50
    {
        level: 41,
        title: "Introduction to Classes",
        question: "What is a 'class' in object-oriented programming?",
        options: [
            "A specific instance of an object.",
            "A function that belongs to an object.",
            "A blueprint for creating objects.",
            "A variable that holds another variable."
        ],
        correctAnswerIndex: 2,
        explanation: "A class acts as a template or blueprint. It defines the properties (attributes) and behaviors (methods) that all objects created from that class will have.",
        example: `class Dog:\n    # This class is a blueprint for dogs.\n    # We can create many individual Dog objects from it.\n    pass`,
        coinReward: 0
    },
    {
        level: 42,
        title: "The __init__() method",
        question: "What is the special purpose of the `__init__()` method in a class?",
        options: [
            "It is the last method called when an object is destroyed.",
            "It is a special method for printing the object.",
            "It initializes a new object when it is created.",
            "It is used to define the class name."
        ],
        correctAnswerIndex: 2,
        explanation: "The `__init__()` method is a constructor. It's automatically called when you create a new instance of a class, and it's where you set up the initial state (attributes) of the object.",
        example: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("Alice", 30)`,
        coinReward: 0
    },
    {
        level: 43,
        title: "Creating Objects",
        question: "Given `class Car: ...`, how do you create an object (instance) of this class?",
        options: ["new Car()", "Car.create()", "Car()", "create(Car)"],
        correctAnswerIndex: 2,
        explanation: "To create an instance of a class, you call the class name as if it were a function. This process is called instantiation. For example, `my_car = Car()`.",
        example: `class Cat:\n    species = "Felis catus"\n\n# Create two different instances (objects) of the Cat class\ncat1 = Cat()\ncat2 = Cat()`,
        coinReward: 0
    },
    {
        level: 44,
        title: "Object Attributes",
        question: "How would you access the `color` attribute of an object named `my_car`?",
        codeSnippet: "class Car:\n    def __init__(self):\n        self.color = \"blue\"",
        options: ["my_car.get('color')", "my_car['color']", "my_car.color", "color(my_car)"],
        correctAnswerIndex: 2,
        explanation: "You use dot notation (`.`) to access the attributes (and methods) of an object. `my_car.color` will retrieve the value of the `color` attribute.",
        example: `class Book:\n    def __init__(self):\n        self.title = "1984"\n\nmy_book = Book()\nprint(my_book.title) # Access and print the title attribute`,
        coinReward: 1
    },
    {
        level: 45,
        title: "Class Methods",
        question: "What is the first argument that is automatically passed to any method of a class?",
        options: ["The class itself", "The object instance itself (usually called `self`)", "The first argument you provide", "Nothing"],
        correctAnswerIndex: 1,
        explanation: "By convention, the first parameter of any method in a class is `self`. It's a reference to the instance of the object itself, allowing you to access its attributes and other methods, like `self.color`.",
        example: `class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1 # 'self' is used to access the object's own 'count'`,
        coinReward: 0
    },
    {
        level: 46,
        title: "Lambda Functions",
        question: "What is a primary characteristic of a lambda function?",
        options: [
            "It must have a name.",
            "It can have multiple expressions.",
            "It is an anonymous function that can only have one expression.",
            "It is used exclusively for mathematical operations."
        ],
        correctAnswerIndex: 2,
        explanation: "A lambda function is a small, anonymous function defined with the `lambda` keyword. It can take any number of arguments but can only have one expression, whose value is returned.",
        example: `# A regular function\ndef double(x):\n    return x * 2\n\n# An equivalent lambda function\ndouble_lambda = lambda x: x * 2\n\nprint(double_lambda(5)) # Output: 10`,
        coinReward: 0
    },
    {
        level: 47,
        title: "The map() function",
        question: "What is the output of this code?",
        codeSnippet: "nums = [1, 2, 3]\nres = list(map(lambda x: x + 1, nums))\nprint(res)",
        options: ["[1, 2, 3]", "[2, 3, 4]", "[1, 3, 5]", "An error will occur"],
        correctAnswerIndex: 1,
        explanation: "The `map()` function applies a given function to every item of an iterable (like a list) and returns a map object. Here, it applies the lambda function `x + 1` to each number in `nums`.",
        example: `numbers_str = ["1", "2", "3"]\n# Convert all strings in the list to integers\nnumbers_int = list(map(int, numbers_str))\nprint(numbers_int) # Output: [1, 2, 3]`,
        coinReward: 0
    },
    {
        level: 48,
        title: "The filter() function",
        question: "What does the `filter()` function do?",
        options: [
            "It filters out duplicate items from a list.",
            "It filters an iterable, returning only items for which a function returns True.",
            "It filters out errors from a block of code.",
            "It changes each item in a list according to a function."
        ],
        correctAnswerIndex: 1,
        explanation: "The `filter()` function constructs an iterator from elements of an iterable for which a function returns `True`. It's used to selectively keep items that meet a certain condition.",
        example: `numbers = [-2, -1, 0, 1, 2]\n# Keep only the positive numbers\npositive_nums = list(filter(lambda x: x > 0, numbers))\nprint(positive_nums) # Output: [1, 2]`,
        coinReward: 0
    },
    {
        level: 49,
        title: "Inheritance",
        question: "In object-oriented programming, what is inheritance?",
        options: [
            "When an object has more than one class.",
            "When a class takes on the attributes and methods of another class.",
            "When a function belongs to a class.",
            "When a class has no methods."
        ],
        correctAnswerIndex: 1,
        explanation: "Inheritance is a powerful feature that allows one class (the child class) to inherit the properties and methods of another class (the parent class). This promotes code reuse and logical hierarchies.",
        example: `class Animal:\n    def speak(self):\n        return "Some animal sound"\n\nclass Dog(Animal): # Dog inherits from Animal\n    pass\n\nmy_dog = Dog()\nprint(my_dog.speak()) # Can use the parent's method`,
        coinReward: 0
    },
    {
        level: 50,
        title: "Final Challenge: The Calculator",
        question: "You have two functions, `add(x,y)` and `multiply(x,y)`. Which line correctly calculates `(5 + 3) * 2`?",
        options: [
            "multiply(add(5, 3), 2)",
            "add(multiply(5, 3), 2)",
            "add(5, 3) * 2",
            "multiply(5, 3) + 2"
        ],
        correctAnswerIndex: 0,
        explanation: "This demonstrates function composition. To follow the order of operations `(5 + 3) * 2`, you must first call the `add` function with 5 and 3. The result of that function call (which is 8) is then used as the first argument to the `multiply` function.",
        example: `def square(n):\n    return n * n\n\ndef increment(n):\n    return n + 1\n\n# Calculate (3^2) + 1\nresult = increment(square(3))\nprint(result) # Output: 10`,
        coinReward: 1,
        badge: { name: "Python Calculator Pro", icon: 'GrandMasterTrophy' }
    }
];
