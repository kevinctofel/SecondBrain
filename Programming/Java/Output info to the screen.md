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
| %c |	char	| Prints a single Unicode character |
| %d |	int, long, short |	Prints a decimal integer value. |
| %o |	int, long, short |	Prints an octal integer value. |
| %h |	int, char, long, short |	Prints a hexadecimal integer value. |
| %f | 	float, double |	Prints a floating-point value. |
| %e |	float, double |	Prints a floating-point value in scientific notation. |
| %s |	String | Prints the characters in a String variable or literal. |
| %% | | Prints the "%" character. |
| %n | | Prints the platform-specific new-line character. |

## Floating-point formatting

```java
%(flags)(width)(.precision)specifier
```
| Sub-specifier |	Description |	Example |
| --- | --- | --- |
| width |	Specifies the minimum number of characters to print. If the formatted value has more characters than the width, the value will not be truncated. If the formatted value has fewer characters than the width, the output will be padded with spaces (or 0's if the '0' flag is specified). |	printf("Value: %7.2f", myFloat); Value:   12.34 |
| .precision |	Specifies the number of digits to print following the decimal point. If the precision is not specified, a default precision of 6 is used. |	printf("%.4f", myFloat); 12.3400 printf("%3.4e", myFloat); 1.2340e+01 |
| flags |	-: Left aligns the output given the specified width, padding the output with spaces. +: Prints a preceding + sign for positive values. Negative numbers are always printed with the - sign. 0: Pads the output with 0's when the formatted value has fewer characters than the width. space: Prints a preceding space for positive value. | printf("%+f", myFloat); +12.340000 printf("%08.2f", myFloat); 00012.34 |

