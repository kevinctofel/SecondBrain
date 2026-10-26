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


