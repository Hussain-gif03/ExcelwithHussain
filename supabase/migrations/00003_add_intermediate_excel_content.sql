/*
# Add Intermediate Level Excel Content

## Plain English Explanation
This migration adds comprehensive content for Intermediate Level modules:
- Module 4: Advanced Formulas (VLOOKUP, IF, nested functions)
- Module 5: Data Analysis Tools (sorting, filtering, data validation)
- Module 6: Charts and Graphs (creating and customizing charts)

Each module includes 3-4 detailed lessons and a comprehensive quiz.
*/

-- Add lessons for Module 4: Advanced Formulas
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'IF Function and Logical Tests',
'# IF Function and Logical Tests

Master conditional logic to make decisions in your spreadsheets.

## The IF Function
Performs a logical test and returns one value if TRUE, another if FALSE.

**Syntax**: =IF(logical_test, value_if_true, value_if_false)

**Example**:
=IF(A1>90, "Pass", "Fail")
- If A1 is greater than 90, display "Pass"
- Otherwise, display "Fail"

## Comparison Operators
- **=** Equal to
- **>** Greater than
- **<** Less than
- **>=** Greater than or equal to
- **<=** Less than or equal to
- **<>** Not equal to

## Practical Examples

### Grade Calculator
=IF(A2>=90, "A", IF(A2>=80, "B", IF(A2>=70, "C", IF(A2>=60, "D", "F"))))

### Sales Commission
=IF(B2>10000, B2*0.15, B2*0.10)
- 15% commission if sales exceed $10,000
- Otherwise 10% commission

### Status Indicator
=IF(C2<=TODAY(), "Overdue", "On Time")

## Nested IF Functions
Use multiple IF functions for complex logic:

=IF(A1>=90, "Excellent", IF(A1>=75, "Good", IF(A1>=60, "Average", "Poor")))

**Tip**: Excel allows up to 64 nested IF functions, but consider using other functions for complex logic.

## Logical Functions

### AND Function
All conditions must be TRUE.
=IF(AND(A1>50, B1>50), "Both Pass", "At Least One Fail")

### OR Function
At least one condition must be TRUE.
=IF(OR(A1>90, B1>90), "Excellent", "Good")

### NOT Function
Reverses the logical value.
=IF(NOT(A1=""), "Has Value", "Empty")

## Common Errors
- **#VALUE!**: Wrong data type in logical test
- **#NAME?**: Misspelled function name
- **Circular Reference**: Formula refers to itself

## Best Practices
1. Keep logical tests simple and clear
2. Use parentheses for complex conditions
3. Test with various scenarios
4. Consider using IFS function (Excel 2016+) for multiple conditions
5. Document complex logic with comments

## Practice Exercise
Create a student grade system:
1. Column A: Student names
2. Column B: Test scores (0-100)
3. Column C: IF formula for Pass/Fail (>=60 is Pass)
4. Column D: Nested IF for letter grades (A/B/C/D/F)
5. Column E: IF with AND to check if score is between 70-80', 1
FROM modules WHERE title = 'Advanced Formulas';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'VLOOKUP and HLOOKUP Functions',
'# VLOOKUP and HLOOKUP Functions

Learn to search for data in tables and retrieve related information.

## VLOOKUP (Vertical Lookup)
Searches for a value in the first column of a table and returns a value in the same row from another column.

**Syntax**: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

**Parameters**:
- **lookup_value**: What you''re searching for
- **table_array**: Where to search (table range)
- **col_index_num**: Which column to return (1, 2, 3...)
- **range_lookup**: TRUE (approximate) or FALSE (exact match)

## VLOOKUP Example
Product price lookup:

| Product ID | Product Name | Price |
|------------|--------------|-------|
| 101        | Laptop       | $999  |
| 102        | Mouse        | $25   |
| 103        | Keyboard     | $75   |

Formula: =VLOOKUP(101, A2:C4, 3, FALSE)
Result: $999

## Step-by-Step VLOOKUP
1. **Lookup Value**: What you''re searching for (e.g., Product ID)
2. **Table Array**: Select entire lookup table including all columns
3. **Column Index**: Count from left (1=first column, 2=second, etc.)
4. **Range Lookup**: Use FALSE for exact match (recommended)

## Common VLOOKUP Errors

### #N/A Error
- Lookup value not found in first column
- Solution: Check spelling, ensure exact match

### #REF! Error
- Column index exceeds table columns
- Solution: Verify column index number

### #VALUE! Error
- Wrong data type
- Solution: Ensure lookup value matches table data type

## HLOOKUP (Horizontal Lookup)
Searches in the first row instead of first column.

**Syntax**: =HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])

**Example**:
| Month | Jan | Feb | Mar |
|-------|-----|-----|-----|
| Sales | 100 | 150 | 200 |

Formula: =HLOOKUP("Feb", A1:D2, 2, FALSE)
Result: 150

## Approximate vs Exact Match

### FALSE (Exact Match)
- Finds exact value only
- Use for: Product IDs, Employee IDs, specific names
- Most common usage

### TRUE (Approximate Match)
- Finds closest value less than or equal to lookup value
- Requires sorted data in ascending order
- Use for: Tax brackets, grade ranges, commission tiers

## VLOOKUP with Approximate Match
Tax bracket example:

| Income  | Tax Rate |
|---------|----------|
| 0       | 10%      |
| 10000   | 15%      |
| 50000   | 25%      |

Formula: =VLOOKUP(35000, A2:B4, 2, TRUE)
Result: 15% (closest value ≤ 35000 is 10000)

## Advanced Tips
1. **Use Absolute References**: Lock table array with $
   =VLOOKUP(A2, $D$2:$F$100, 3, FALSE)

2. **Combine with IFERROR**: Handle errors gracefully
   =IFERROR(VLOOKUP(A2, D2:F100, 3, FALSE), "Not Found")

3. **Dynamic Column Index**: Use MATCH function
   =VLOOKUP(A2, D2:F100, MATCH("Price", D1:F1, 0), FALSE)

## Practice Exercise
Create an employee lookup system:
1. Create employee table: ID, Name, Department, Salary
2. Use VLOOKUP to find employee name by ID
3. Use VLOOKUP to find department by ID
4. Use VLOOKUP to find salary by ID
5. Add IFERROR to handle missing IDs', 2
FROM modules WHERE title = 'Advanced Formulas';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'TEXT Functions and String Manipulation',
'# TEXT Functions and String Manipulation

Master text manipulation to clean, combine, and format text data.

## Combining Text

### CONCATENATE / CONCAT
Joins text strings together.

**Old Syntax**: =CONCATENATE(text1, text2, ...)
**New Syntax**: =CONCAT(text1, text2, ...)

**Example**:
=CONCAT(A1, " ", B1)
- If A1="John" and B1="Smith"
- Result: "John Smith"

### Ampersand (&) Operator
Simpler way to combine text.

**Example**:
=A1&" "&B1
=A1&B1&C1

### TEXTJOIN Function (Excel 2016+)
Joins text with a delimiter, can ignore empty cells.

**Syntax**: =TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)

**Example**:
=TEXTJOIN(", ", TRUE, A1:A5)
Result: "Apple, Banana, Orange"

## Extracting Text

### LEFT Function
Extracts characters from the left side.

**Syntax**: =LEFT(text, [num_chars])

**Example**:
=LEFT("Excel2024", 5)
Result: "Excel"

### RIGHT Function
Extracts characters from the right side.

**Syntax**: =RIGHT(text, [num_chars])

**Example**:
=RIGHT("Excel2024", 4)
Result: "2024"

### MID Function
Extracts characters from the middle.

**Syntax**: =MID(text, start_num, num_chars)

**Example**:
=MID("Excel2024", 6, 4)
Result: "2024"

## Finding and Replacing

### FIND Function
Finds position of text (case-sensitive).

**Syntax**: =FIND(find_text, within_text, [start_num])

**Example**:
=FIND("@", "user@email.com")
Result: 5

### SEARCH Function
Finds position of text (case-insensitive).

**Syntax**: =SEARCH(find_text, within_text, [start_num])

### SUBSTITUTE Function
Replaces specific text.

**Syntax**: =SUBSTITUTE(text, old_text, new_text, [instance_num])

**Example**:
=SUBSTITUTE("Hello World", "World", "Excel")
Result: "Hello Excel"

## Changing Case

### UPPER Function
Converts to uppercase.
=UPPER("hello") → "HELLO"

### LOWER Function
Converts to lowercase.
=LOWER("HELLO") → "hello"

### PROPER Function
Capitalizes first letter of each word.
=PROPER("john smith") → "John Smith"

## Cleaning Text

### TRIM Function
Removes extra spaces.

**Example**:
=TRIM("  Hello   World  ")
Result: "Hello World"

### CLEAN Function
Removes non-printable characters.

### LEN Function
Returns length of text.

**Example**:
=LEN("Excel")
Result: 5

## Practical Examples

### Extract Email Username
=LEFT(A1, FIND("@", A1)-1)
- From "user@email.com"
- Result: "user"

### Extract Email Domain
=RIGHT(A1, LEN(A1)-FIND("@", A1))
- From "user@email.com"
- Result: "email.com"

### Format Phone Number
=TEXT(A1, "(000) 000-0000")
- From 1234567890
- Result: (123) 456-7890

### Create Full Name
=PROPER(A1&" "&B1)
- From "john" and "SMITH"
- Result: "John Smith"

### Extract First Name from Full Name
=LEFT(A1, FIND(" ", A1)-1)
- From "John Smith"
- Result: "John"

## Practice Exercise
Clean and format a contact list:
1. Column A: Full names in various cases
2. Column B: Use PROPER to standardize names
3. Column C: Email addresses
4. Column D: Extract username from email
5. Column E: Extract domain from email
6. Column F: Phone numbers (format with TEXT)
7. Column G: Combine formatted name and phone', 3
FROM modules WHERE title = 'Advanced Formulas';

-- Add quiz for Module 4
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Advanced Formulas Quiz', 70
FROM modules WHERE title = 'Advanced Formulas';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What does the IF function return if the logical test is FALSE?',
'["Error", "The value_if_false argument", "0", "Empty cell"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'In VLOOKUP, what does the fourth argument (range_lookup) control?',
'["Column to return", "Exact or approximate match", "Sort order", "Error handling"]'::jsonb,
1, 2
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which function combines multiple text strings with a delimiter?',
'["CONCAT", "TEXTJOIN", "MERGE", "COMBINE"]'::jsonb,
1, 3
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What does =LEFT("Excel", 3) return?',
'["Exc", "cel", "Exce", "xce"]'::jsonb,
0, 4
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which function would you use to remove extra spaces from text?',
'["CLEAN", "TRIM", "REMOVE", "STRIP"]'::jsonb,
1, 5
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What error does VLOOKUP return when the lookup value is not found?',
'["#VALUE!", "#N/A", "#REF!", "#NAME?"]'::jsonb,
1, 6
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which logical function requires ALL conditions to be TRUE?',
'["OR", "AND", "NOT", "XOR"]'::jsonb,
1, 7
FROM quizzes WHERE title = 'Advanced Formulas Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What does =PROPER("john SMITH") return?',
'["JOHN SMITH", "john smith", "John Smith", "John smith"]'::jsonb,
2, 8
FROM quizzes WHERE title = 'Advanced Formulas Quiz';