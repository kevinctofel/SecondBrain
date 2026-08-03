---
course: AI Programming with Python
lesson: Python Functions
module: Python Basics
date: 2026-08-03

study_time: 3h
difficulty: 1.5
confidence: 4
review_due: 2026-08-010

status: complete

concepts:
    - functions
    - generators
	- exceptions
    - recursion
	- arguments vs parameters
	- default parameters

skills:
  - Python


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---
## Python Functions

### Functions

Reusable blocks of code to divide complex tasks into manageable, simple steps. This brings re-usability, organization, and repeatable, standard processes into our programs.

#### User defined functions

Function definition syntax:
```python
def function_name (parameters):
    code block here
```

Example:
```python
# Your code here

# Step 1: Define the function
def greet():
    print("Hello, Python Coder!")
    
greet()

# Step 2: Add variables for names and times
def greet_personalized(name, time_of_day = "day"):
    print(f"Good {time_of_day.capitalize()}, {name}")

greet_personalized("Alice")

# Step 3: Loop through names and times & print the function output

names = ["Alice", "Bob", "Charlie"]
times = ["morning", "afternoon", "evening"]

for i in range(len(names)):
    # print(names[i])
    greet_personalized(names[i],times[i])

```

#### Generators

A special type of Python function that generates values one at a time, only when called, using the _yield_ keyword instead of the _return_ keyword. They're extremely memory efficient for handling large amounts of data in streams or chunks. 

A generator "yields" one item at a time and then pauses until the next item is requested. Generators keep their state in memory so it knows where it was in the generation process after the prior yield.

To get the next item from a generator, we use the _next(generator_object)_ function to create or retrieve it.

Example:
```python
# define function

def bake_cookies(batch_size, max_batches=None):
  batch_count = 0
  total_cookies = 0

# loop through batches

while max_batches is None or batch_count < max_batches:
  total_cookies += batch_size
  yield total_cookies
  batch_count += 1

# retrieve data from generator function\
# bake_cookies_generator_object = bake_cookies(100)

next(bake_cookies_generator_object)
```

### Returning values

The _return_ keyword in Python serves a crucial function, enabling a function to provide outputs after processing.

Note that the return values are literal. Using incompatible types, such as add(3, 'Python'), leads to a type error. To help mitigate this, you can define parameter types using colon notation (a: int, b: int) for clarity, readability and error reduction. 

### The _None_ keyword

Functions have an implicit return of None if no return statement is used.

Example: A function prints a message but doesn't return a value, hence returns None.

Functions can have parameters with a default value of None.

### Recursion in Python

Recursion is when a function calls itself, breaking down complex problems into smaller manageable parts.

Benefits:
- Compartmentalization: Divides problems into similar smaller parts.
- Simplification: Makes code cleaner by reducing redundancy.
- Mathematical Operations: Ideal for tasks like tree traversal, sequence generation, or by solving factorial operations.

Cautions:
- Memory Constraints: Each recursive call adds to the stack, potentially leading to stack overflow.
- Performance: Generally slower due to overhead from multiple function calls.
- Complexity: May complicate code if problems don't naturally break down into sub-problems.

NOTE: Always include a base case to avoid infinite recursion loops.

### Python Functions and Environment

Parameters:
- Defined in the function signature.
- Act as placeholders for data.
- Similar to empty plates waiting to be filled.

Arguments:
- Actual values passed to a function when called.
- Like the food served on plates at a dinner party.

Parameters vs. Arguments example:
```python
# Defining a function
def sum(a, b): # a and b are parameters
	return a + b

# Calling the sum() function
sum(10, 5) # 10 and 5 are arguments

# Calling the sum() function
sum(a=10, b=5) # 10 and 5 are arguments. 10 is specified for a and 5 is specified for b.
```

Types of Argument Passing:
- Positional Arguments:
		- Follow a specific order matching the function's parameters.
		- Order is critical for desired functionality.
- Keyword Arguments:
		- Specify parameter names and values explicitly.
		- Allows passing arguments in any order.
		- Preferred for clarity and reducing errors.
- Mixed Arguments:
		- Combine positional and keyword arguments.
		- Positional arguments must precede keyword ones.
		- Offers flexibility but requires careful ordering.

### Default parameter values

Default parameter values in functions serve as a fallback plan when no specific arguments are provided. They allow for flexibility and reduce the need for repetitive argument specification.

Practical Considerations:
- Always set parameters with defaults after non-default parameters in the function definition.
- Prevents errors such as "missing positional argument" when values are not provided.

### Name Scopes

A scope defines where a variable can be accessed.

Local Scope: 
- Refers to variables created within a function.
- They are accessible only inside that function.
  
Global Scope: 
- Refers to variables defined outside any function.
- These can be accessed throughout the entire code.

Name Hiding:

Variables of the same name in different scopes can cause one to "hide" the other. Avoid using the same name between scopes.

Using the _global_ Keyword:

The _global_ keyword allows functions to modify a global variable, making it accessible within that function's local scope.


### Managing exceptions

Exceptions are used to handle unexpected errors in our code so that our program isn't disrupted.

Example:
```python
# Step 1: Reuse the add function
def add(a, b):
    return a + b

# Step 2: Write the safe_add function with a try-except block
def safe_add(a, b):
    try:
        return add(a, b)
    except TypeError as e:
        return f"Error: Invalid input types for addition - {e}"

# Step 3: Create a list of inputs as tuples
inputs = [
    (5, "Python"),   # Invalid: int + str
    (3, 5.2),        # Valid: int + float
    (2, 5)           # Valid: int + int
]

# Step 4: Use a for loop to iterate through the inputs and call safe_add
for a, b in inputs:
    result = safe_add(a, b)
    print(f"safe_add({a}, {b}) = {result}")

# Expected output:
# safe_add(5, Python) = Error: Invalid input types for addition - unsupported operand type(s) for +: 'int' and 'str'
# safe_add(3, 5.2) = 8.2
# safe_add(2, 5) = 7
```
