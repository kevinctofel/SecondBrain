---
course: AI Programming with Python
lesson: Python Control Flow and Loops
module: Python Basics
date: 2026-07-10

study_time: xh
difficulty: 1
confidence: 5
review_due: 2026-07-17

status: in progress

concepts:
  - variables


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

Infinite loops
Off by one errors
Ensuring termination

