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


