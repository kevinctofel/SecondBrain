## General programming data types

**Boolean** - Represents only true or false values. These are used in logic expressions and decisions.

**Integer** - Represents positive or negative whole numbers without a fractional part. Examples: -127, 8, 65535.

**Floating Point** - Represents positive or negative numbers with a fractional component. Examples: 3.1415, 2.0, -123.456.

**String** - Represents textual information as a sequence of encoded characters. Examples: "Hello!", "This is a String.".

## Java Primitive Data Types

| Type | Description |
| -------------------------- | ------------------------ |
| byte | Integers (whole numbers) in the range of -128 to +127 |
| short |	Integers in the range of -32,768 to +32,767 |
| int | Integers in the range of -2,147,483,648 to +2,147,483,647 |
| long | Integers in the range of -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 |
| float | Real numbers in the range of ±3.40282347 x 1038 to 1.40239846 x 10-45 |
| double | Real numbers in the range of ±1.7976931348623157 x 10308 to 4.9406564584124654 x 10-324 |
| char | Any single character |
| boolean | Only two values: true and false |

## Numerical Precision

A float value has a precision of about 9 significant digits, and a double value has a precision of about 17 significant digits. It is generally best to assume that the last digit of any float or double value is rounded and may not be exact.

## Floating point literals

A floating-point literal using scientific notation is written using an e preceding the power-of-10 exponent, as in 6.02e23 to represent 6.02 x 1023. The e stands for exponent. Likewise, 0.001 is 1 x 10-3 and can be written as 1.0e-3. For a floating-point literal, good practice is to make the leading digit non-zero.

## Generating a random number 

The Random class provides methods that return a random integer in the range to or a programmer-defined range. 
```java
import java.util.Random;

public class ThreeRandomValues {
   public static void main(String[] args) {
      Random randGen = new Random();  // New random number generator

      System.out.println(randGen.nextInt());
      System.out.println(randGen.nextInt());
      System.out.println(randGen.nextInt());
```
The statement import java.util.Random; enables use of the Random class. The statement Random randGen = new Random(); creates a new random number generator object named randGen. The method call randGen.nextInt() can then be used to get a random integer ranging from to .

A programmer can specify the seed when the Random object is created, as in Random randGen = new Random(5); or using the setSeed() method, as in randGen.setSeed(5); With a specific seed, each program run will yield the same sequence of pseudo-random numbers. 
