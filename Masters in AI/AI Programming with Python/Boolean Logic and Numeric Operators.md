---
course: AI Programming with Python
lesson: Fundamentals
module: Boolean Logic and Operators
date: 2026-07-07

study_time: 1h
difficulty: 2
confidence: 4
review_due: 2026-07-14

status: complete

concepts:
  - Boolean values
  - Boolean expressions
  - Nested Boolean expressions
  - Boolean operator precedence

skills:
  - Python
  - Boolean logic

projects: []

questions:
  - Is it generally a good idea to always use parentheses with Boolean expressions when there are 3 more conditions?

tags:
  - python
  - ai-programming
---

## Boolean Logic and Numeric Operators

Primary operators are Not, And and Or.

Not inverts a Boolean value.
And returns true if and only if all conditions are true, allowing you to check for multiple conditions. 
Or returns true if and only if at least one condition is true.

Using these operators, you can, for example:
- Combine multiple conditions
- Manage user access
- Enable or disable certain app features based on configuration.

Precedent order for Boolean functions is: Not, And, Or.

### Boolean expressions

Example:
```python
age = 25
has_id = True

# Both conditions must be True
can_enter = age >= 21 and has_id  # Evaluates to True

# Only one condition needs to be True
is_weekend = False
is_holiday = True
stay_home = is_weekend or is_holiday  # Evaluates to True

# Flips the result
print(not is_weekend)  # Evaluates to True
```

### Nested Boolean expressions

Example:
```python
# Variables representing a user's status
is_admin = False
has_premium_pass = True
is_vip = False
has_ticket = True

# Nested boolean expression
# The user can enter if they are an admin OR if they have a valid combination of VIP/Ticket features.
can_enter = is_admin or ((has_premium_pass or is_vip) and has_ticket)

print(can_enter)  # Output: True
```

Useful for checking multiple conditions.

### Relaional Operators

Compare values and return True or False

Equal to (==)
- Checks if two values are the same.
Example: a == b returns true if both hold similar values.
Do not confuse this with the assignment (=) operator. = is used to assign a value. == is used to check for equality.
- Not Equal to (!=)
Verifies if two values differ.
Example: a != b is true if a and b are distinct.
- Greater Than (>)
Determines if the value on the left is larger.
Example: a > b indicates true if a exceeds b.
- Greater Than or Equal to (>=)
Checks if the left side value is not less.
Example: a >= b is true if a is greater or equal to b.
- Less Than (<)
Evaluates if the left value is smaller.
Example: a < b gives true if a is less than b.
- Less Than or Equal to (<=)
Confirms if the left-side value is not greater.
Example: a <= b holds true if a is less than or equal to b.

### Floating Point Accuracy

Since Python stores numbers as representations of binary values, high precision can lead to small approxmiations. As a result, using numeric operators can return unxpected values. 

Example: 
0.1 + 0.2 != 0.3
It actually equals 0.3 with several zeros and a trailing number.

Mitigation techniques include using [Python's Decimal module](https://docs.python.org/3/library/decimal.html) or rounding techniques. Using the Decimal module with a custom level of precision.

Example: 
from decimal import Decimal
Decimal('0.1') + Decimal('0.2') = 0.3
OR
getcontext().prec = 1
Decimal(0.1) + Decimal(0.2) = 0.3
