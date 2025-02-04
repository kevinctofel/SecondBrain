- Use the System.out.print function:
```java
System.out.print("desired text");
```

Note that multiple statements above print on the same line.

---

Text in double quotes " " is known as a string literal. 

---

System.out.println (note the ln at the end, short for "line"), starts a new output line after the outputted values, called a newline.

---

The syntax for outputting the double myFloat with two digits after the decimal point is
```java
System.out.printf("%.2f", myFloat);
```

## Format specifiers for the printf() and format() methods.

| Format specifier | Data type(s)|	Notes |
| ----- | ------ | -------|
| %c |	char	Prints a single Unicode character |
| %d |	int, long, short |	Prints a decimal integer value. |
| %o |	int, long, short |	Prints an octal integer value. |
| %h |	int, char, long, short |	Prints a hexadecimal integer value. |
| %f | 	float, double |	Prints a floating-point value. |
| %e |	float, double |	Prints a floating-point value in scientific notation. |
| %s |	String | Prints the characters in a String variable or literal. |
| %% | | Prints the "%" character. |
| %n | | Prints the platform-specific new-line character. |
