- Import the Scanner library
- Create a new Scanner object
- Use the new Scanner object to read keyboard input

```java
import  java.util.Scanner;
Scanner scnr = new Scanner(system.in);
input = scnr.nextInt();
```

---


## Getting a character from input

Java does not have a method for getting one character from input. Instead, the following sequence can be used:
```java
myChar = scnr.next().charAt(0);
```

---

## Getting a string without whitespaces from input

A whitespace character is a character used to represent horizontal and vertical spaces in text, and includes spaces, tabs, and newline characters. Ex: "Oh my goodness!" has two whitespace characters, one between h and m, the other between y and g.

Below shows the basic approach to get a string from input into variable userString. The approach automatically skips initial whitespace, then gets characters until the next whitespace is seen.
```java
userString = scnr.next();
```

---

## Getting a string with whitespace from input

Sometimes a programmer wishes to get whitespace characters into a string, such as getting a user's input of the name "Franklin D. Roosevelt" into a string variable presidentName.

For such cases, the language supports getting an entire line into a string. The method scnr.nextLine() gets all remaining text on the current input line, up to the next newline character (which is removed from input but not put in stringVar).

```java
firstString = scnr.nextLine();
```


