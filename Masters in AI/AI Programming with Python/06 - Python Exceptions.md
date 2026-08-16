---
course: AI Programming with Python
lesson: Python Exceptions
module: Python Basics
date: 2026-08-16

study_time: 3h
difficulty: 1
confidence: 4
review_due: 2026-08-23

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

KeyboardInterrupt is a built-in Python exception that is raised when a user interrupts a program, typically by pressing Ctrl+C. It provides control for users to pause or halt a process, vital for scenarios requiring immediate human intervention. Use the _raise_ keyword to trigger the exception.

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

Abstract exceptions or parent exceptions serve as fundamental guidelines for developing specific error types in Python coding.

- Purpose:
  - They provide a foundational framework for more detailed error classes.
- Usage:
  - Abstract exceptions aren't usually triggered by themselves. This can handle several related exceptions.
 
Some examples of abstract exceptions and related specific types:
- ArithmeticError:
  - Deals with numeric calculation issues.
- LookupError:
  - Occurs when accessing non-existent items such as indices or dictionary keys. LookupError is a common base class where the specific subclasses are IndexError and KeyError.
- IndexError:
  - Occurs when an index is not found in a sequence.
- KeyError:
  - Happens when accessing a missing key in a dictionary or mapping.

#### ArithmeticError Exception

ArithmeticError is a built-in Python base exception class. The specific subclasses for ArithmeticError include ZeroDivisionError, OverflowError and FloatingPointError.

Zero Division Error: Occurs when attempting to divide a number by zero.

```python
try:
result = 10 / 0
except ZeroDivisionError as e:
print(f"ZeroDivisionError: {e}")
```

Overflow Error: Happens when calculations exceed a system's storage limitation, causing an incorrect result.

```python
try:
result = math.exp(1000)
except OverflowError as e:
print(f"OverflowError: {e}")
```

Floating Point Error: Arises when Python performs a calculation using decimal (floating-point) numbers and the result is not mathematically possible or cannot be represented precisely in memory.

#### LookupError Exception

LookupError is a general base class error in Python indicating the inability to find an anticipated item. It triggers when accessing an index that does not exist inside a dictionary.

Exceptions Under LookupError:
- IndexError:
  - Raised when an attempt to access an index that doesn't exist in a list.
- KeyError:
  - Raised when trying to access a dictionary key that isn't present.
 
#### IndexError Exception

An IndexError is categorized as a Lookup Error in Python's exception hierarchy. These errors occur when trying to access an element at an index that doesn’t exist in ordered collections like lists.

Avoidance Tips
- Check Index Validity: Ensure the index is within the list’s range before accessing an element.
- Use Try-Except Blocks: Handle the potential error by surrounding the access code with try-except blocks to ensure the program continues running.
- Use a for-in Loop: When iterating over a list, use for item in my_list instead of manually tracking index numbers. This eliminates the risk of accessing an out-of-range position entirely.

#### KeyError Exception

KeyErrors occur when trying to access a dictionary key that doesn't exist. Consider using a conditional check to see if a key is in a dictionary. _if key in my_dict_

#### TypeError Exception

TypeError occurs when an operation is used on an object of the wrong type.

#### ValueError Exception

Raised when the correct type argument is passed to a function, but the value is deemed inappropriate.



