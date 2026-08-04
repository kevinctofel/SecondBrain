---
course: AI Programming with Python
lesson: Python Exceptions
module: Python Basics
date: 2026-08-04

study_time: 0h
difficulty: 1
confidence: 4
review_due: 2026-08-10

status: in progress

concepts:
  - functions

skills:
  - Python


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---
## Python Exceptions

### Built in Exception hierarchy

In Python, exceptions act as predefined responses to unforeseen errors during code execution. This enables graceful management: we can customize functions to automatically detect and respond to errors, enhancing code stability.

#### How to use the BaseException Function

The BaseException is a generic, catch-all error exception in Python, returning whatever error occurred.

Example:
```python
def division_function(a, b):
  try:
    value = int(a / b)
    return(value)
  except BaseException as e:
    return(f"The following error occurred: {e}")
```
This example will catch and report division by zero, invalid input, and other errors.

#### The Exception class in Python

While the BaseException is atop the Python Exception Hierarchy, the Exception class is typically used instead of it. That's because the BaseException interferes with system-exiting exceptions, such as SystemExit and KeyboardInterrupt.

From a coding standpoint use of the Exception class is the same.

#### SystemExit Exception

System Exit is a Python exception that signifies the interpreter should stop gracefully. It's usually left unhandled to let Python close smoothly. To use it, call the _sys.exit_ method, which triggers the SystemExit exception.

Example:
```python
import sys
import time

def run_theme_part():
  try:
    print("The theme park will close in 5 seconds....")
    time.sleep(5)
    sys.exit() # This triggers the system exit exception
  except SystemExit:
```

#### KeyboardInterrupt Exception

KeyboardInterrupt is a built-in Python exception that is raised when a user interrupts a program, typically by pressing Ctrl+C. It provides control for users to pause or halt a process, vital for scenarios requiring immediate human intervention. Use the _raise_ keyword to trigger the exeption.

Example:
```python
def run_theme_park_ride():
  try:
    while True:
      user_input = input("Type 'stop' to stop the ride: ")
      if user_input.lower() == "stop":
        raise KeyboardInterrupt
  except KeyboardInterrupt:
    print("You stopped the ride!")
```

#### Abstract Exceptions


