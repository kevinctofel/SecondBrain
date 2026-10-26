---
course: AI Programming with Python
lesson: Numpy, Pandas, Matlabplot
module: NumPy
date: 2026-10-26

study_time: 0h
difficulty: 1
confidence: 5
review_due: 2026-09-08

status: in progress

concepts:
  - NumPy

skills:
  - Python


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---
## NumPy

### NumPy Documentation:

- [NumPy Manual](https://docs.scipy.org/doc/numpy-1.13.0/contents.html) (opens in a new tab)
- [NumPy User Guide](https://numpy.org/devdocs/user/index.html) (opens in a new tab)
- [NumPy Reference](https://numpy.org/devdocs/reference/index.html) (opens in a new tab)
- [Scipy Lectures](http://scipy-lectures.org/intro/numpy/index.html)

### Benefits of using NumPy

- Speed: NumPy is typically several orders of magnitude faster than Python lists when performing operations on large arrays. Note that in NumPy, the data must all be of the same type.
- Support for multidimensional array data structures. These can represent matrices and vectors.
- Many optimized built-in mathematical functions.

### Basic NumPy usage

#### Creating a NumPy array
```python
## We import NumPy into Python
import numpy as np

## We create a 1D ndarray that contains only integers
x = np.array([1, 2, 3, 4, 5])

## Let's print the ndarray we just created using the print() command
print('x = ', x)

# x = [1 2 3 4 5]
```

#### Rank of an Array (numpy.ndarray.ndim)
```python
## 1-D array
x = np.array([1, 2, 3])
x.ndim

## 2-D array
Y = np.array([[1,2,3],[4,5,6],[7,8,9], [10,11,12]])
Y.ndim

## Here the`zeros()` is an inbuilt function that you'll study on the next page. 
## The tuple (2, 3, 4) passed as an argument represents the shape of the ndarray
y = np.zeros((2, 3, 4))
y.ndim

# 1 2 3
```

#### Shape of an Array (numpy.ndarray.shape)

_ndarray.shape_ returns a tuple representing the array dimensions, which is the size along each of its dimensions.

#### Data type of an Array's elements (numpy.dtype)

```python
## We create a 1D ndarray that contains only integers
x = np.array([1, 2, 3, 4, 5])

## We print information about x
print('x = ', x)
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype)

# x = [1 2 3 4 5]
# x has dimensions: (5,)
# x is an object of type: class 'numpy.ndarray'
# The elements in x are of type: int64
```

An example with strings instead of integers

```python
## We create a rank 1 ndarray that only contains strings
x = np.array(['Hello', 'World'])

## We print information about x
print('x = ', x)
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype)
x = ['Hello' 'World']

# x has dimensions: (2,)
# x is an object of type: class 'numpy.ndarray'
# The elements in x are of type: U5
```
One big difference between Python lists and ndarrays, is that unlike Python lists, all the elements of an ndarray must be of the same type. So, while we can create Python lists with both integers and strings, we can't mix types in ndarrays. If you provide the np.array() function with a Python list that has both integers and strings, NumPy will interpret all elements as strings. 

Example:
```python
## We create a rank 1 ndarray from a Python list that contains integers and strings
x = np.array([1, 2, 'World'])

## We print information about x
print('x = ', x)
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype)
x = ['1' '2' 'World']

# x has dimensions: (3,)
# x is an object of type: class 'numpy.ndarray'
# The elements in x are of type: U21

# NOTE: This U21 indicates a fixed-length string of 21 characters, as NumPy upcasts to accommodate the longest string in the array. 
```

Upcasting in Numeric datatype example:

In this case NumPy upcasts the integers in z to floats in order to avoid losing precision in numerical computations.

```python
## We create a rank 1 ndarray that contains integers
x = np.array([1,2,3])

## We create a rank 1 ndarray that contains floats
y = np.array([1.0,2.0,3.0])

## We create a rank 1 ndarray that contains integers and floats
z = np.array([1, 2.5, 4])

## We print the dtype of each ndarray
print('The elements in x are of type:', x.dtype)
print('The elements in y are of type:', y.dtype)
print('The elements in z are of type:', z.dtype)

# The elements in x are of type: int64
# The elements in y are of type: float64
# The elements in z are of type: float64
```

Even though NumPy automatically selects the dtype of the ndarray, NumPy also allows you to specify the particular dtype you want to assign to the elements of the ndarray. You can specify the dtype when you create the ndarray using the keyword dtype in the np.array() function. 

Example:
```python
## We create a rank 1 ndarray of floats but set the dtype to int64
x = np.array([1.5, 2.2, 3.7, 4.0, 5.9], dtype = np.int64)

## We print the dtype x
print('x = ', x)
print('The elements in x are of type:', x.dtype)

# x = [1 2 3 4 5]
# The elements in x are of type: int64
```

#### numpy.ndarray.size and creating a 2-D array

```python
## We create a rank 2 ndarray that only contains integers
Y = np.array([[1,2,3],[4,5,6],[7,8,9], [10,11,12]])

print('Y = \n', Y)

## We print information about Y
print('Y has dimensions:', Y.shape)
print('Y has a total of', Y.size, 'elements')
print('Y is an object of type:', type(Y))
print('The elements in Y are of type:', Y.dtype)
Y =
[[ 1 2 3]
[ 4 5 6]
[ 7 8 9]
[10 11 12]]

# Y has dimensions: (4, 3)
# Y has a total of 12 elements
# Y is an object of type: class 'numpy.ndarray'
# The elements in Y are of type: int64
```

#### Saving / loading a NumPy array in a file

```python
## We create a rank 1 ndarray
x = np.array([1, 2, 3, 4, 5])

## We save x into the current directory as 
np.save('my_array', x)

## We load the saved array from our current directory into variable y
y = np.load('my_array.npy')
```
