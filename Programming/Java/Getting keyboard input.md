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
