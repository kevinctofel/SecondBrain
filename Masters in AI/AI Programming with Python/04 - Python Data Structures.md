---
course: AI Programming with Python
lesson: Python Control Flow and Loops
module: Python Basics
date: 2026-07-16

study_time: 1.5h
difficulty: 1
confidence: 5
review_due: 2026-07-23

status: in progress

concepts:
    - lists
    - modifying lists
    - managing lists
    - copying lists
    


skills:
  - Python
  - loops
  - loop comprehensions


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---

## Python Data Structures

### Key Data Collections
- Lists: Ideal for ordered and changeable data storage. Allows easy modification of data content.
- Tuples: Use for fixed data collections you don't want changed. Less flexible but faster than lists.
- Dictionaries: Perfect for pairing unique keys with values, simplifying the retrieval of interconnected data.
- Strings: Manage sequences of characters, from small snippets to large text blocks, efficiently.

### Lists (similar to dynamic arrays)

Lists are good for grouping related data or collections of similar items. Created by using square brackets. Order is maintained and they are mutable.

Example:
```python
fruits = ["cherry", "banana", "apple", "lemon"]
# Index of [0], [1], [2], [3]
```

### Slicing lists

Used to extract a subsection of a list by using a start and end index, returns the elements in between those indices.

Example:
```python
fruits = ["cherry", "banana", "apple", "lemon"]
print(fruits[0:2])
# Expect: "cherry", "banana"
```

- Lists with Indexes: Lists in Python enable access to elements via indexes, starting from zero. For instance, in a concert lineup, the first entrant's index is 0, the second one's is 1, and so on.
- Importance of Index Order: Knowing the correct index is crucial as it defines the position of items. Always remember that the first position starts at zero.
- Retrieving Elements: Access any item by its index. For example, in a list named fruits with ['apple', 'banana', 'cherry'], using fruits[0] retrieves 'apple'.
- Slicing Technique: Extract portions of a list with slicing syntax, start:end. This creates a sublist from the 'start' index up to, but not including, the 'end' index. From our fruits list, fruits[1:3] results in ['banana', 'cherry'].

### Managing Lists in Python

Some built-in list methods:

- Append:
    - Adds an item to the end of a list.
    - Example: Adding "grape" to a list of fruits.
- Insert:
    - Places an item at a specified index.
    - Useful for organizing items, e.g., placing "orange" at index 1 in the fruits list.
- Index:
    - Locates the index of a specific item within a list.
    - Example: Finding the index of "banana" after new additions to the list. NOTE: If there are duplicates of the same value in the list, index() will result in the first matching index.

### Using the len() and sorted() functions

_len()_ returns the total number of items in a list. 

Example:
```python
fruits = ['apple', 'banana', 'cherry']
print(len(fruits))  # Outputs 3
```

_sorted()_ returns a new list of the original list items but in sorted order.

- Example with numbers: When you print sorted([5, 2, 9, 1]), the result is a new sorted list [1, 2, 5, 9].
- Example with fruits: Sorting ["apple", "orange", "banana", "cherry", "grape"] returns ["apple", "banana", "cherry", "grape", "orange"], arranged alphabetically.

### Removing list items with the del statement

_del_ statement deletes a list item at a specific index. It does not create a new list; it modifies the original list.

Example:
``` python
fruits = ["apple", "banana", "cherry"]
del fruits[1]
print(fruits)
# Expect "apple", "cherry"
```

### Iterating over lists with a For loop

Use a for loop to retrive each value in a list. Although a standard loop structure works, you can also use _for item in list:_ to iterate through each list element.

Can be useful to create new lists when we don't know what the values should be, such as a list of squared numbers. The input will be the non-squared numbers, while the new list will contain the squares of those numbers.

Example:
```python
squares = []
for number in range(0:6)
    squares.append(number ** 2)
print(squares)
# Expect [1, 4, 9, 16, 25]
```

### List membership testing

The _in_ and _not in_ operators check if an item is or isn't in a list.

Example:
```python
fruits = ["apple", "banana", "cherry"].
if "apple" in fruits: 
    print("Apple is in the list!")
if "grape" not in fruits: 
    print("Grape is not in the list.")
```

### List comprehensions

These offer a more concise way to generate lists in Python compared to traditional loops. These are automatic list generators.

An example of list comprehension syntax: [expression for item in iterable], where expressions can include calculations.

Example:
```python
squares = [x ** 2 for x in range(5)]
# sqaures contains [0, 1, 4, 9, 16]
```

### Copying lists

We can't just assign a new list variable to an existing list to make a copy. Both list variables will point (or refer to) to the same original list in memory.

Instead, use the _copy()_ method to create a copy of the original list with a new variable in memory. Alternatively, we can use list slicing to clone a list.

Examples:
```python
veggies_clone = veggies.copy()
veggies_clone2 = veggies[:]
# Both approaches create a new list containing the items from the original list
```

### Nested lists

Since lists can contain lists, we can create two dimentional lists (matrices) or three dimensional lists (cubes).

Example:
```python
matrix = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]
]
```

By using loops, we can traverse a matrix or cube. Use the indices of each nested loop to access different elements.

```python
matrix_a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
matrix_b = [9, 8, 7, 6, 5, 4 ,3, 2, 1]

for row in range(len(matrix_a):
    new_row = []
        for col in range(len(matrix_a)[0]):
            sum = matrix_a[row][col} + matrix_b[row][col]               new_row.append(sum)
        result.append(new_row)
```

### Tuples

Tuples are used for storing indexed, immutable data; once a data element is created, it cannot be changed. Tuples are defined by using parenthesis around data elements.

You can access individual elements from tuples by using the element's index, just like with a list. The same approaches from lists to navigate or slice a tuple works.

Because data in a Tuple is immutable, trying to change the value of any Tuple element results in an error.

#### Tuples vs Lists

**Tuples**

- Immutable: Cannot be changed once created.
- Used when data should remain constant, like coordinates.
- Can contain lists as elements, allowing some modification.

**Lists**

- Mutable: Can be changed freely.
- Ideal for collections that require modification, like a shopping cart.
- Can include tuples, locking specific elements.

Combine tuples and lists to control which data remains static and which part can be dynamically modified. This enables optimal management of data integrity and flexibility.
