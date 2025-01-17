A single-line comment starts with // and includes all the following text on that line. Single-line comments commonly appear after a statement on the same line.

---

A multi-line comment starts with /* and ends with */, where all text between /* and */ is part of the comment. A multi-line comment is also known as a block comment.

---

Example:

```java

import java.util.Scanner;

/*
   This program calculates the amount of pasta to cook, given the
   number of people eating.

   Author: Andrea Giada
   Date:   May 30, 2017
*/

public class PastaCalculator {
   public static void main (String [] args) {
      Scanner scnr = new Scanner(System.in);
      int numPeople;         // Number of people that will be eating
      int totalOuncesPasta;  // Total ounces of pasta to serve numPeople

      // Get number of people
      System.out.println("Enter number of people: ");
      numPeople = scnr.nextInt();

      // Calculate and print total ounces of pasta
      totalOuncesPasta = numPeople * 3;  // Typical ounces per person
      System.out.println("Cook " + totalOuncesPasta + " ounces of pasta.");
   }
}
```
