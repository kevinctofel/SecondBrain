---
course: AI Programming with Python
lesson: Numpy, Pandas, Matlabplot
module: NumPy
date: 2026-11-16

study_time: 2h
difficulty: 3
confidence: 2
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

### Using built-in functions to create ndarrays

#### Create a Numpy array of zeros with a desired shape
```python
# We create a 3 x 4 ndarray full of zeros. 
X = np.zeros((3,4))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
```

#### Create a Numpy array of ones
```python
# We create a 3 x 2 ndarray full of ones. 
X = np.ones((3,2))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
```

#### Create a Numpy array of constants
```python
# We create a 2 x 3 ndarray full of fives. 
X = np.full((2,3), 5) 

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
```

#### Create a Numpy array of an Identity matrix

A fundamental array in Linear Algebra is the Identity Matrix. An Identity matrix is a square matrix that has only 1s in its main diagonal and zeros everywhere else. The function np.eye(N) creates a square N x N ndarray corresponding to the Identity matrix. Since all Identity Matrices are square, the np.eye() function only takes a single integer as an argument.

```python
# We create a 5 x 5 Identity matrix. 
X = np.eye(5)

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
```

#### Create a diagonal NumPy array

We can also create diagonal matrices by using the np.diag() function. A diagonal matrix is a square matrix that only has values in its main diagonal. The np.diag() function creates an ndarray corresponding to a diagonal matrix.

```python
# Create a 4 x 4 diagonal matrix that contains the numbers 10,20,30, and 50
# on its main diagonal
X = np.diag([10,20,30,50])

# We print X
print()
print('X
```

#### numpy.arange

NumPy also allows you to create ndarrays that have evenly spaced values within a given interval. NumPy's np.arange() function is very versatile and can be used with either one, two, or three arguments. 

Create a Numpy array of evenly spaced values in a given range, using arange(stop_val)
```python
# We create a rank 1 ndarray that has sequential integers from 0 to 9
x = np.arange(10)

# We print the ndarray
print()
print('x = ', x)
print()

# We print information about the ndarray
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# x = [0 1 2 3 4 5 6 7 8 9]
```

Create a Numpy array using arange(start_val, stop_val)
```python
# We create a rank 1 ndarray that has sequential integers from 4 to 9. 
x = np.arange(4,10)

# We print the ndarray
print()
print('x = ', x)
print()

# We print information about the ndarray
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# x = [4 5 6 7 8 9]
```

Create a Numpy array using arange(start_val, stop_val, step_size)
```python
# We create a rank 1 ndarray that has evenly spaced integers from 1 to 13 in steps of 3.
x = np.arange(1,14,3)

# We print the ndarray
print()
print('x = ', x)
print()

# We print information about the ndarray
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# x = [ 1 4 7 10 13]
```

Even though the np.arange() function allows for non-integer steps, such as 0.3, the output is usually inconsistent, due to the finite floating point precision. For this reason, in the cases where non-integer steps are required, it is usually better to use the function np.linspace(). The np.linspace(start, stop, N) function returns N evenly spaced numbers over the closed interval [start, stop]. This means that both the start and thestop values are included. We should also note the np.linspace() function needs to be called with at least two arguments in the form np.linspace(start,stop). In this case, the default number of elements in the specified interval will be N= 50. The reason np.linspace() works better than the np.arange() function, is that np.linspace() uses the number of elements we want in a particular interval, instead of the step between values.

Create a Numpy array using linspace(start, stop, n), with stop inclusive.
```python
# We create a rank 1 ndarray that has 10 integers evenly spaced between 0 and 25.
x = np.linspace(0,25,10)

# We print the ndarray
print()
print('x = \n', x)
print()

# We print information about the ndarray
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# x = [ 0. 2.77777778 5.55555556 8.33333333 11.11111111
13.88888889 16.66666667 19.44444444 22.22222222 25. ]
```

As we can see from the above example, the function np.linspace(0,25,10) returns an ndarray with 10 evenly spaced numbers in the closed interval [0, 25]. We can also see that both the start and end points, 0 and 25 in this case, are included. However, you can let the endpoint of the interval be excluded (just like in the np.arange() function) by setting the keyword endpoint = False in the np.linspace() function. Let's create the same x ndarray we created above but now with the endpoint excluded.

Create a Numpy array using linspace(start, stop, n), with stop excluded.
```python
# We create a rank 1 ndarray that has 10 integers evenly spaced between 0 and 25,
# with 25 excluded.
x = np.linspace(0,25,10, endpoint = False)

# We print the ndarray
print()
print('x = \n', x)
print()

# We print information about the ndarray
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# x = [ 0. 2.5 5. 7.5 10. 12.5 15. 17.5 20. 22.5]
```

#### numpy.reshape - This is a Function

So far, we have only used the built-in functions np.arange() and np.linspace() to create rank 1 ndarrays. However, we can use these functions to create rank 2 ndarrays of any shape by combining them with the np.reshape() function. The np.reshape(ndarray, new_shape) function converts the given ndarray into the specified new_shape. It is important to note that the new_shape should be compatible with the number of elements in the given ndarray. For example, you can convert a rank 1 ndarray with 6 elements, into a 3 x 2 rank 2 ndarray, or a 2 x 3 rank 2 ndarray, since both of these rank 2 arrays will have a total of 6 elements. However, you can't reshape the rank 1 ndarray with 6 elements into a 3 x 3 rank 2 ndarray, since this rank 2 array will have 9 elements, which is greater than the number of elements in the original ndarray.

```python
# We create a rank 1 ndarray with sequential integers from 0 to 19
x = np.arange(20)

# We print x
print()
print('Original x = ', x)
print()

# We reshape x into a 4 x 5 ndarray 
x = np.reshape(x, (4,5))

# We print the reshaped x
print()
print('Reshaped x = \n', x)
print()

# We print information about the reshaped x
print('x has dimensions:', x.shape)
print('x is an object of type:', type(x))
print('The elements in x are of type:', x.dtype) 
# Original x = [ 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19]

Reshaped x =
# [[ 0 1 2 3 4]
 [ 5 6 7 8 9]
 [10 11 12 13 14]
 [15 16 17 18 19]]
```

#### numpy.ndarray.reshape - This one is a Method

One great feature about NumPy, is that some functions can also be applied as methods. This allows us to apply different functions in sequence in just one line of code. ndarray methods are similar to ndarray attributes in that they are both applied using dot notation (.)

```python
# We create a a rank 1 ndarray with sequential integers from 0 to 19 and
# reshape it to a 4 x 5 array 
Y = np.arange(20).reshape(4, 5)

# We print Y
print()
print('Y = \n', Y)
print()

# We print information about Y
print('Y has dimensions:', Y.shape)
print('Y is an object of type:', type(Y))
print('The elements in Y are of type:', Y.dtype) 
# Y =
[[ 0 1 2 3 4]
 [ 5 6 7 8 9]
 [10 11 12 13 14]
 [15 16 17 18 19]]
```

As before, it is important to note that the new_shape should be compatible with the number of elements in ndarray. In the example above, the function np.arange(20) creates an ndarray and serves as the ndarray to be reshaped by the reshape() method. Therefore, when using reshape() as a method, we don't need to pass the ndarray as an argument to the reshape() function, instead we only need to pass the new_shape argument.

#### Create a rank 2 Numpy array by using the reshape() function.

```python
# We create a rank 1 ndarray with 10 integers evenly spaced between 0 and 50,
# with 50 excluded. We then reshape it to a 5 x 2 ndarray
X = np.linspace(0,50,10, endpoint=False).reshape(5,2)

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
# X =
 [[ 0. 5.]
 [ 10. 15.]
 [ 20. 25.]
 [ 30. 35.]
 [ 40. 45.]]
```

#### random arrays

The last type of ndarrays we are going to create are random ndarrays. Random ndarrays are arrays that contain random numbers. Often in Machine Learning, you need to create random matrices, for example, when initializing the weights of a Neural Network. NumPy offers a variety of random functions to help us create random ndarrays of any shape.

Create a Numpy array using the numpy.random.random() function
```python
# We create a 3 x 3 ndarray with random floats in the half-open interval [0.0, 1.0).
X = np.random.random((3,3))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in x are of type:', X.dtype)
# X =
[[ 0.12379926 0.52943854 0.3443525 ]
 [ 0.11169547 0.82123909 0.52864397]
 [ 0.58244133 0.21980803 0.69026858]]
```

NumPy also allows us to create ndarrays with random integers within a particular interval. The function np.random.randint(start, stop, size = shape) creates an ndarray of the given shape with random integers in the half-open interval [start, stop). 

Create a Numpy array using the numpy.random.randint() function.
```python
# We create a 3 x 2 ndarray with random integers in the half-open interval [4, 15).
X = np.random.randint(4,15,size=(3,2))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
# X =
[[ 7 11]
 [ 9 11]
 [ 6 7]]
```

In some cases, you may need to create ndarrays with random numbers that satisfy certain statistical properties. For example, you may want the random numbers in the ndarray to have an average of 0. NumPy allows you create random ndarrays with numbers drawn from various probability distributions. The function np.random.normal(mean, standard deviation, size=shape), for example, creates an ndarray with the given shape that contains random numbers picked from a normal (Gaussian) distribution with the given mean and standard deviation.

Create a Numpy array of "Normal" distributed random numbers, using the numpy.random.normal() function.
```python
# We create a 1000 x 1000 ndarray of random floats drawn from normal (Gaussian) distribution
# with a mean of zero and a standard deviation of 0.1.
X = np.random.normal(0, 0.1, size=(1000,1000))

# We print X
print()
print('X = \n', X)
print()

# We print information about X
print('X has dimensions:', X.shape)
print('X is an object of type:', type(X))
print('The elements in X are of type:', X.dtype)
print('The elements in X have a mean of:', X.mean())
print('The maximum value in X is:', X.max())
print('The minimum value in X is:', X.min())
print('X has', (X < 0).sum(), 'negative numbers')
print('X has', (X > 0).sum(), 'positive numbers')
# X =
[[ 0.04218614 0.03247225 -0.02936003 ..., 0.01586796 -0.05599115 -0.03630946]
 [ 0.13879995 -0.01583122 -0.16599967 ..., 0.01859617 -0.08241612 0.09684025]
 [ 0.14422252 -0.11635985 -0.04550231 ..., -0.09748604 -0.09350044 0.02514799]
 ...,
 [-0.10472516 -0.04643974 0.08856722 ..., -0.02096011 -0.02946155 0.12930844]
 [-0.26596955 0.0829783 0.11032549 ..., -0.14492074 -0.00113646 -0.03566034]
 [-0.12044482 0.20355356 0.13637195 ..., 0.06047196 -0.04170031 -0.04957684]]
```

