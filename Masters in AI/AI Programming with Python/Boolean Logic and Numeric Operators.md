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
