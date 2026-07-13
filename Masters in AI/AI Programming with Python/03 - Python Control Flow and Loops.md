---
course: AI Programming with Python
lesson: Python Control Flow and Loops
module: Python Basics
date: 2026-07-13

study_time: 2.5h
difficulty: 1
confidence: 5
review_due: 2026-07-20

status: completed

concepts:
  - control flow
  - loops
  - if
  - for
  - else
  - elif
  - while
  - break
  - continue
  - nested loops


skills:
  - Python
  - loops
  - control flow

projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---

## Python Control Flow and Loops

### Mastering Control Flow in Python

Control flow is generally managed with loops and conditional statements. Loops help us define code that can run many times withough actually repeating the code.

#### Conditional Statements

- If Statement: Checks if a condition is true and executes a specified block of code. For example, checking if a person's age is 18 or older to determine voting eligibility.
- If-Else Statement: Used to evaluate a condition and execute one of two code blocks; ideal for either-or scenarios, such as determining pass/fail status based on an exam score threshold.
- If-Elif-Else Statement: Evaluates multiple conditions in order, executing the block for the first true condition, with a default outcome set by the else. This is useful for assigning grades based on exam scores:
    - 90 or Above: Grade A
    - 80-89: Grade B
    - Below 80: Grade F
 
#### Multiple Conditional Statements

By using conditional operators (Not, And, Or) we can reduce redundancy when creating conditional statements.

Logical Operators:
- AND: Combines multiple conditions; both must be true.
- OR: One or more conditions must be true.
- NOT: Inverts the Boolean value.

Practical Example - Weather Check
- Temperature above 77°F:
    - If sunny: "Go to the beach."
    - Otherwise: "Stay inside."
- Temperature between 50°F and 77°F:
    - If sunny: "Go for a walk."
    - Otherwise: "Stay inside."
- Temperature 50°F or below:
    - "Stay inside."

#### Nesting Conditional Statements

Adds layers to decision making processes. Breaks down complex logic into manageable parts.

Creating structured code through logical operators and nested conditions simplifies complex decision trees and enhances human readability.

Example:
```python
temperature = 51
is_sunny = True

if temperature > 77:
    if is_sunny:
        print("Go to the Beach")
    else:
        print("Stay inside")
elif temperature > 50:
    if is_sunny:
        print("Go for a walk")
    else:
        print("Stay inside")
else:
    print("Stay inside")

#Output: Go for a walk
```
#### Loops in Python

Purpose of Loops:
Enable code to run multiple times seamlessly.
Avoid repetitive coding, enhancing efficiency and scalability.

Types of Loops:
While Loops: Continue executing as long as a specified condition is true.
For Loops: Iterate over items in a sequence such as lists or strings.

Benefits:
Useful when dealing with large datasets or numerous user interactions.
Saves time and reduces human error with scalable code.

While loops are good for situations with an unknown number of iterations.

#### While loops

While loops are essential for executing code repeatedly until a specific condition becomes false. They are part of control structures in programming and are commonly used when the number of iterations isn't known in advance.

NOTE: Video showed how to read each line in a file until the end by using a while loop. It did not cover the details of _read_line_. the _.strip_ method and _with open() as input_file_ 

While loops provide flexibility for scenarios where the loop run count isn't predetermined, such as waiting for user inputs or processing data until a file's end.

#### While loop pitfalls

- Infinite loops
- Off by one errors
- Ensuring termination

Infinite loop example:
```python
desired_temperature = 68
current_temperature = 66

while current_temperature < desired_temperature:
    print(f"Heating... Current temperature: {current_temperature}")
    current_temperature += 1  # Increase temperature by 1 degree each cycle

print("Desired temperature reached. Heating system turned off.")
```

Off by one example:
```python
# Incorrect version: counts 0 through 5 (6 numbers instead of 5)
count = 0
while count <= 5:
    print(f"Count: {count}")
    count += 1
```

To ensure a while loop termination, there has to be some variable updated correctly to have a false condition.

#### For Loops

Good for when you know the number of iterations, particularly over a data structure; for each item in a collection or sequence.

Where do for loops make sense?
  - Sequences or ranges of numbers
  - Strings
  - Collections (lists (or arrays), tuples, and sets)

Example:
```python
cart = ['apple', 'banana', 'cherry', 'grapefruit']
for item in cart: # Foe each item in the data structure
    print(item)
```

Tuples: data is stored with parenthesis and is immutible.

Sets: A collection of **unique**, unordered and unindexed mutaable items in curly braces. However, any items added to a set are immutable.

Dictionaries: Key / value pairs of data. The key is an identifier and the values are data of any type.

- For Loop with Range:
    - Creates a sequence of numbers, allowing iteration across a specified range.
    - Example: for i in range(5) prints numbers 0 through 4.
- For Loop with Strings:
    - Iterates over each character in a string.
    - Example: for letter in "Python" prints each character of the word.
- For Loop with Lists:
    - Iterates over items in a list.
    - Example: Lists of fruits allow each item to be printed: apple, banana, etc.
- For Loop with Tuples:
    - Fine for handling immutable sequences of data.
    - Example: Prints coordinates stored in a tuple.
- For Loop with Sets:
    - Iterates over unordered, unique items.
    - Ensures duplicates are ignored, printing only unique entries.
- For Loop with Dictionaries:
    - Iterates over key-value pairs.
    - Example: Retrieves each piece of data within a dictionary structured like a person's profile.

#### Common challenges with For Loops

- One by one errors where the loop runs one too many or one two few times
- Editing loop variables
- Modifying mutable sequences rather than iterating over a copy a of the sequence.

#### Range() function in Python

Useful to iterate over sequences of integer numbers but can be used for other iteratable data structures too.

- Basic Usage:
    - Use range(n) to generate numbers from 0 to n-1.
    - Example: for i in range(5): prints numbers 0 to 4.
- Custom Start and End:
    - Specify both starting and ending points with range(start, end).
    -Example: for i in range(2, 7): outputs numbers from 2 to 6.
- Incorporating Steps:
    - Include steps to skip numbers: range(start, end, step).
    - Example: for i in range(0, 10, 2): prints 0, 2, 4, 6, 8.
- List Index Access:
    - Apply range() with len(list) for accessing list elements.
    - Example: fruits = ['apple', 'banana', 'cherry']:

Example:
```python
for i in range(len(fruits)):
print(f"Index {i} contains {fruits[i]}")
```

The range() function is efficient when you know the number of iterations. For large sequences or non-integer values, look for alternatives

#### The Pass statement

_Pass_ does nothing. It's useful as a placeholder while defining or outlining code functions. It supports an incremental development approach.

#### Enhancing Python loops

Adding an _else_ clause at the end of a for loop can add some action or confirmation that the loop has completed.

Example:
```python
for i in range(5): 
	print(i) 
else: 
	print("loop just finished")
```

When to Use Else in Loops:
- Confirmation of Loop Completion: Useful in search algorithms to confirm the loop ran without a break.
- Searching Within Lists:
break if item is found, preventing else execution.
else executes if the item isn't found.
- Validating Inputs: Confirms conditions smoothly if not interruptions occur.
- While Loops: Apply with while loops for continuity checks.

#### Understanding nested loops

Nested loops allow incorporating a loop within another loop, enabling more complex data processing. The number of loops run (assuming all loops fully complete) is the product of the number of loop itereations for each loop.

Example:
- Outer Loop iterates over a sequence, such as a range of numbers.
    - for i in range(1, 5)
- Inner Loop runs for each iteration of the outer loop, further iterating over another dataset.
    - for fruit in ['apple', 'banana', 'cherry', 'grapefruit']
- Execution: The outer loop completes one cycle, and within each cycle, the inner loop completes its full cycle.

Iteration Example:
First, i = 1, inner loop iterates over all fruits.
Then, i = 2, inner loop reiterates over all fruits.

#### Loop control with break and continue

We don't want infinite loops. The _break_ statement can help avoid this when used with a condition.

Example of an endless loop and a fix:
```python
count = 0
while True:
    print("Running forever!")
    count += 1

count = 0
while True:
	count += 1
	if count > 10:
		break
```

The _continue_ statement skips certain loop iterations, typically when a specific condition is met.

Example to print odd numbers:
```python
for i in range(10):
   if i % 2 == 0:
       continue
   print(i)
```







