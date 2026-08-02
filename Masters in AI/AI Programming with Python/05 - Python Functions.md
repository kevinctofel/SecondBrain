---
course: AI Programming with Python
lesson: Python Functions
module: Python Basics
date: 2026-08-01

study_time: 1h
difficulty: 1.5
confidence: 4
review_due: 2026-08-08

status: in progress

concepts:
    - functions
    - generators
    
    


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



### Managing exceptions

Exceptions are used to handle unexpected errors in our code so that our program isn't disrupted.
