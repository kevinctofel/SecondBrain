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


| Exception Class | Parent Class | Description |
| :--- | :--- | :--- |
| **BaseException** | *Root* | The base class for all built-in exceptions. Not meant to be directly inherited by user applications. |
| **SystemExit** | BaseException | Raised by the `sys.exit()` function to cleanly terminate the Python interpreter. |
| **KeyboardInterrupt** | BaseException | Raised when the user hits the interrupt key (usually `Ctrl+C` or `Delete`). |
| **GeneratorExit** | BaseException | Raised when a generator or coroutine is closed via the `close()` method. |
| **Exception** | BaseException | The base class for all built-in, non-system-exiting exceptions. All user-defined errors should inherit from this. |
| **ArithmeticError** | Exception | The base class for all arithmetic or mathematical calculation errors. |
| **FloatingPointError** | ArithmeticError | Raised when a floating-point operation fails (rarely used in standard Python). |
| **OverflowError** | ArithmeticError | Raised when the result of an arithmetic operation is too large to be represented. |
| **ZeroDivisionError** | ArithmeticError | Raised when the second argument of a division or modulo operation is zero. |
| **LookupError** | Exception | The base class for errors raised when a key or index used on a sequence or mapping is invalid. |
| **IndexError** | LookupError | Raised when a sequence subscript (like a list index) is out of range. |
| **KeyError** | LookupError | Raised when a mapping (dictionary) key is not found in the set of existing keys. |
| **NameError** | Exception | Raised when a local or global name (variable or function) is not found. |
| **UnboundLocalError** | NameError | Raised when a reference is made to a local variable in a function, but no value has been bound to it. |
| **AttributeError** | Exception | Raised when an attribute reference or assignment fails (e.g., trying to access a method that doesn't exist). |
| **TypeError** | Exception | Raised when an operation or function is applied to an object of an inappropriate data type. |
| **ValueError** | Exception | Raised when a function receives an argument of the correct type but an inappropriate value. |
| **UnicodeError** | ValueError | Raised when a Unicode-related encoding or decoding error occurs. |
| **OSError** | Exception | Raised when a system function returns a system-related error, such as an I/O failure. |
| **FileNotFoundError** | OSError | Raised when a file or directory is requested but cannot be found. |
| **PermissionError** | OSError | Raised when trying to run an operation without the required system permissions (e.g., Permission Denied). |
| **TimeoutError** | OSError | Raised when a system-level function times out or expires. |


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


